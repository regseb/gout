/* @flow */
/* global setInterval, clearInterval, setTimeout, define, module */

/**
 * Bibliothèque JavaScript Scronpt implémentant un programme Unix cron.
 *
 * @module scronpt
 * @author Sébastien Règne
 * @version 0.2
 * @license Licence Public Rien À Branler.
 */

(function (root, factory) {
    "use strict";

    // Si la bibliothèque est chargée avec un AMD loader.
    if ("function" === typeof define && define.amd)
        define([], factory);
    // Si c'est un CommonJS-like qui charge la bibliothèque.
    else if ("object" === typeof exports)
        module.exports = factory();
    else // Sinon : un chargement classique est utilisé.
        root.Cron = factory();
}(this, function () {
    "use strict";

    /**
     * Les formes littérales des mois et des jours de la semaine. Les autres
     * champs (minute, heure, jour du mois) n'en ont pas. Ce sont les index des
     * éléments dans le tableau qui sont utilisés pour la correspondance. Pour
     * les mois : un élément est inséré au début du tableau pour que l'index du
     * mois de janvier soit 1.
     *
     * @type {!Object}
     * @const
     * @private
     */
    var NAMES = [
        [], [], [], // Minute, heure et jour du mois.
        ["", "jan", "feb", "mar", "apr", "may", "jun", "jul", "aug",
         "sep", "oct", "nov", "dec"], // Mois.
        ["sun", "mon", "tue", "wed", "thu", "fri", "sat"] // Jour de la semaine.
    ];

    /**
     * Les valeurs minimales et maximales pouvant être saisies dans les cinq
     * champs (pour des valeurs simples ou des intervalles).
     *
     * @type {!Object}
     * @const
     * @private
     */
    var LIMITS = [
        { "min": 0, "max": 59 }, // Minute.
        { "min": 0, "max": 23 }, // Heure.
        { "min": 1, "max": 31 }, // Jour du mois.
        { "min": 1, "max": 12 }, // Mois.
        { "min": 0, "max":  7 }  // Jour de la semaine (0 et 7 représentent le
    ];                           // dimanche).

    /**
     * Le message d'erreur (suivi de l'expression cron) renvoyé dans
     * l'exception.
     *
     * @type {!string}
     * @const
     * @private
     */
    var ERROR = "Syntax error, unrecognized expression: ";


    /**
     * La liste des tâches actives.
     *
     * @type {!Object}
     * @private
     */
    var jobs = [];

    /**
     * L'identifiant de l'intervalle qui vérifie toutes les minutes si des
     * tâches doivent-être exécutées.
     *
     * @type {?number}
     * @private
     */
    var intervalID = null;


    /**
     * Analyser une notation cron.
     *
     * @param {!string} input - la notation cron.
     * @return {!Object} Retourne les conditions pour exécuter la tâche.
     * @throws {Error} Si la notation cron n'est pas valide.
     * @throws {RangeError} Si une valeur de la notation est invalide.
     * @private
     */
    var parse = function (input) {
        // Remplacer les chaines spéciales.
        switch(input) {
            case "@yearly": case "@annually": input = "0 0 1 1 *"; break;
            case "@monthly":                  input = "0 0 1 * *"; break;
            case "@weekly":                   input = "0 0 * * 0"; break;
            case "@daily": case "@midnight":  input = "0 0 * * *"; break;
            case "@hourly":                   input = "0 * * * *";
        }

        // Séparer les cinq champs (minute, heure, jour du mois, mois et jour de
        // la semaine).
        var fields = input.split(/\s+/);
        if (5 !== fields.length)
            throw new Error(ERROR + input);

        // Parcourir les cinq champs.
        return fields.map(function (field, i) {
            // Gérer les notations avec un astérisque ("*" ou "*/x").
            var result = /^\*(?:\/(\d+))?$/.exec(field);
            if (null !== result) {
                if (undefined === result[1]) // "*".
                    return null;

                var step = parseInt(result[1], 10);
                if (0 === step)
                    throw new RangeError(ERROR + input);

                return [{
                    "min":  0,
                    "max":  Infinity,
                    "step": step
                }];
            }

            // Gérer le nom des mois ("jan", "feb", ...) et des jours de la
            // semaine ("sun", "mon", ...).
            var value = NAMES[i].indexOf(field.toLowerCase());
            if (-1 !== value)
                return [{
                    "min":  value,
                    "max":  value,
                    "step": 1
                }];

            // Gérer les listes.
            return field.split(",").map(function (range) {
                var result = /^(\d+)(?:-(\d+)(?:\/(\d+))?)?$/.exec(range);
                if (null === result)
                    throw new Error(ERROR + input);

                var min  = parseInt(result[1], 10);
                var max  = parseInt(result[2], 10);
                var step = parseInt(result[3], 10);

                // Vérifier que les valeurs sont dans les intervalles.
                if (min < LIMITS[i].min || LIMITS[i].max < min ||
                        max < LIMITS[i].min || LIMITS[i].max < max ||
                        max < min || 0 === step)
                    throw new RangeError(ERROR + input);

                return {
                    "min":  min,
                    "max":  isNaN(max) ? min : max,
                    "step": isNaN(step) ? 1 : step
                };
            });
        });
    }; // parse()

    /**
     * Vérifier qu'une tâche doit-être exécutée.
     *
     * @param {!Object} conds - les conditions pour exécuter la tâche.
     * @param {!number} value - la valeur qui sera testée.
     * @return {!boolean} Retourne <code>true</code> si la tâche doit-être
     *                    exécutée ; sinon <code>false</code>.
     * @private
     */
    var valide = function (conds, value) {
        return null === conds || conds.some(function (cond) {
            return cond.min <= value && value <= cond.max &&
                   0 === (value - cond.min) % cond.step;
        });
    }; // valide()

    /**
     * Exécuter une tâche.
     *
     * @param {!Object} job - la tâche contenant la méthode à appeler et les
     *                        paramètres à lui passer.
     * @private
     */
    var run = function (job) {
        job.func.apply(undefined, job.args);
    }; // run()

    /**
     * Exécuter les tâches.
     */
    var daemon = function () {
        var now = new Date();
        jobs.forEach(function (job) {
            // Vérifier que la minute, l'heure et le mois respectent les
            // conditions.
            if (!valide(job.conds[0], now.getMinutes()) ||
                    !valide(job.conds[1], now.getHours()) ||
                    !valide(job.conds[3], now.getMonth() + 1))
                return;

            // Quand le jour du mois et le jour de la semaine sont renseignés
            // (différent de l'astérisque), la tâche est exécutée si au moins
            // une des deux conditions est respectée.
            if (null !== job.conds[2] && null !== job.conds[4]) {
                if (!valide(job.conds[2], now.getDate()) &&
                        !(valide(job.conds[4], now.getDay()) ||
                                0 === now.getDay() &&     // Gérer la valeur 7
                                valide(job.conds[4], 7))) // pour le dimanche.
                    return;
            // Sinon : soit le jour du mois, soit le jour de la semaine ou aucun
            // des deux ne sont renseignés. Dans ce cas, vérifier classiquement
            // les deux conditions.
            } else if (!valide(job.conds[2], now.getDate()) ||
                    !(valide(job.conds[4], now.getDay()) ||
                            0 === now.getDay() &&     // Gérer la valeur 7 pour
                            valide(job.conds[4], 7))) // le dimanche.
                return;

            // Si toutes les conditions sont respectées : lancer la tâche en
            // parallèle.
            setTimeout(run, 0, job);
        });
    }; // daemon()


    /**
     * Créer une tâche.
     *
     * @example
     * var cron = new Cron("0,30 * * * *", alert, "Ding ! Dong !");
     *
     * @param {!string}     cron   - les horaires quand la tâche sera exécutée.
     * @param {!boolean=}   status - l'état de la tâche : <code>true</code> pour
     *                               active ; sinon <code>false</code>.
     * @param {!function()} func   - la fonction appelée quand la tâche est
     *                               exécutée.
     * @param {...*}        args   - les paramètres qui seront passés à la
                                     fonction.
     * @return {!Object} Retourne la tâche créée.
     * @throws {Error} Si la notation cron n'est pas valide.
     * @public
     * @constructor
     */
    var Cron = function (cron, status, func, args) {
        // Si le paramètre "status" n'est pas fourni : réorganiser les
        // paramètres.
        if ("function" === typeof status) {
            args   = Array.prototype.slice.call(arguments, 2);
            func   = status;
            status = true;
        } else
            args = Array.prototype.slice.call(arguments, 3);

        this.job = {
            "conds": parse(cron),
            "func":  func,
            "args":  args
        };

        // Activer éventuellement la tâche.
        if (status) this.start();
    }; // Cron()

    /**
     * Activer la tâche.
     *
     * @example
     * var cron = new Cron("0,30 * * * *", false, alert, "Ding ! Dong !");
     * // ...
     * cron.start();
     *
     * @public
     */
    Cron.prototype.start = function () {
        // Si la tâche est déjà active : ne rien faire.
        if (this.status()) return;

        // Ajouter la tâche à la liste de tâches actives.
        jobs.push(this.job);

        // Si c'est la première tâche à être activée : créer la boucle qui
        // vérifiera chaque minute si des tâches doivent-être exécutées.
        if (1 === jobs.length)
            intervalID = setInterval(daemon, 60000);
    }; // start()

    /**
     * Désactiver la tâche.
     *
     * @example
     * var cron = new Cron("0,30 * * * *", alert, "Ding ! Dong !");
     * // ...
     * cron.stop();
     *
     * @public
     */
    Cron.prototype.stop = function () {
        // Si la tâche est déjà inactive : ne rien faire.
        if (!this.status()) return;

        // Enlever la tâche de la liste des tâches actives.
        jobs.splice(jobs.indexOf(this.job), 1);

        // S'il n'y a plus de tâches actives : arrêter la boucle.
        if (!jobs.length)
            clearInterval(intervalID);
    }; // stop()

    /**
     * Récupérer l'état de la tâche (active ou non).
     *
     * @example
     * var cron = new Cron("0,30 * * * *", alert, "Ding ! Dong !");
     * console.log(cron.status()); // true.
     * // ...
     * cron.stop();
     * console.log(cron.status()); // false.
     *
     * @return {!boolean} Retourne <code>true</code> si la tâche est active ;
     *                    sinon <code>false</code>.
     * @public
     */
    Cron.prototype.status = function () {
        return -1 !== jobs.indexOf(this.job);
    }; // status()

    // Exposer la classe Cron.
    return Cron;

}));
