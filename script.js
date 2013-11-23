var core = {
    'mod': { },

    'init': function() {
        "use strict";
        // Charger le fichier de configuration.
        var fields = window.location.href.slice(
                              window.location.href.indexOf('?') + 1).split('&');
        for (var i = 0; i < fields.length; ++i) {
            var field = fields[i].split('=');
            var key = decodeURIComponent(field[0]);
            var value = decodeURIComponent(field[1]).replace(/\+/g, ' ');
            if ('conf' === key)
                $.ajax({
                    'url': value,
                    'dataType': 'script',
                    'async': false
                });
        }

        // Lancer les applications.
        $.each(apps, function(i, app) {
            // Si le module n'est utilise pour la premiere fois.
            if (undefined === core.mod[app.type]) {
                // Charger la feuille de style.
                $.get('mod/' + app.type + '/style.css', function(data) {
                    $('style').append(data);
                });
                // Charger le JavaScript.
                $.ajax({
                    'url': 'mod/' + app.type + '/script.js',
                    'dataType': 'script',
                    'async': false
                });
            }
            // Ajouter le bloc pour l'application.
            var id = 'app' + $('body > article').length;
            $('body').append(
                    $('<article>').attr({ 'id': id,
                                          'class': app.type })
                                  .css({ 'left':   app.coord.x * 10,
                                         'top':    app.coord.y * 10,
                                         'width':  app.coord.w * 10,
                                         'height': app.coord.h * 10 }));
            // Charger le HTML.
            $.get('mod/' + app.type + '/index.html', function(data) {
                $('#' + id).html(data);
                console.log(app.type);
                core.mod[app.type].create(id, app);
            });
        });
    }, // init()
}; // core

Date.prototype.format = function(pattern) {
    "use strict";
    var MONTHS = [ 'janvier', 'f\u00E9vrier', 'mars', 'avril', 'mai', 'juin',
                   'juillet', 'aout', 'septembre', 'octobre', 'novembre',
                   'd\u00E9cembre' ];
    var DAYS = [ 'dimanche', 'lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi',
                 'samedi' ];

    var year    = this.getFullYear();
    var month   = this.getMonth() + 1;
    var date    = this.getDate();
    var day     = this.getDay();
    var hours   = this.getHours();
    var minutes = this.getMinutes();

    return pattern.replace('yyyy',  ('0000' + year).slice(-4))
                  .replace('MMMMM', MONTHS[month - 1])
                  .replace('MM',    ('00' + month).slice(-2))
                  .replace('EEEEE', DAYS[day])
                  .replace('dd',    ('00' + date).slice(-2))
                  .replace('HH',    ('00' + hours).slice(-2))
                  .replace('mm',    ('00' + minutes).slice(-2));
}; // Date.format()
