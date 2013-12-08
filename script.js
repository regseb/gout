
// FIXME[NFF] Supprimer.
if (!String.prototype.endsWith) {
    Object.defineProperty(String.prototype, 'endsWith', {
        'enumerable': false,
        'configurable': false,
        'writable': false,
        'value': function (searchString, position) {
            position = position || this.length;
            position = position - searchString.length;
            var lastIndex = this.lastIndexOf(searchString);
            return lastIndex !== -1 && lastIndex === position;
        }
    });
}

function parseQuery(url) {
    "use strict";
    if (-1 === url.indexOf('?') || -1 !== url.indexOf('?#'))
        return { };

    var data = { };
    var fields = url.split('?').pop().split('#').shift().split('&');
    for (var i in fields) { // FIXME[NFF] Remplacer par un for...of.
        var field = fields[i];
        // FIXME[NFF] Remplacer par une assignation destructurante.
        // var [key, value] = field.split('=').map(decodeURIComponent);
        var parts = field.split('=').map(decodeURIComponent);
        var key = parts[0];
        var value = parts[1];
        if (!key.endsWith('[]'))
            data[key] = value.replace(/\+/g, ' ');
        else {
            if (undefined === data[key])
                data[key] = [];
            data[key].push(value.replace(/\+/g, ' '));
        }
    }
    return data;
} // parseQuery()

var core = {
    'mod': { },

    'init': function() {
        "use strict";
        // Recuperer les parametres.
        var opt = parseQuery(window.location.href);

        // Lancer les applications.
        $.getJSON(opt.config, function(apps) {
            console.log(apps);
            $.each(apps, function(url, args) {
                if (false === args.active) return true;

                // Si le module est utilise pour la premiere fois.
                if (undefined === core.mod[args.module]) {
                    // Charger la feuille de style.
                    $.get('mod/' + args.module + '/style.css', function(data) {
                        $('style').append(data);
                    });
                    // Charger le JavaScript.
                    $.ajax({
                        'url': 'mod/' + args.module + '/script.js',
                        'dataType': 'script',
                        'async': false
                    });
                }
                // Charger le HTML.
                $.get('mod/' + args.module + '/index.html', function(data) {
                    var id = 'app' + $('body > article').length;
                    $('body').append(
                            $('<article>').attr({ 'id': id,
                                                  'class': args.module })
                                          .css({ 'left':   args.coord.x * 10,
                                                 'top':    args.coord.y * 10,
                                                 'width':  args.coord.w * 10,
                                                 'height': args.coord.h * 10 })
                                          .html(data));
                    core.mod[args.module].create(id, 'app/' + url);
                });
            });
        });
    } // init()
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
