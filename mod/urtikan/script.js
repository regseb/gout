var urtikan = {
    'last': null,

    'create': function(id, url) {
        "use strict";

        if (null === urtikan.last) {
            // Mettre a jour toutes les trois heures (3 * 60 * 60 * 1000).
            urtikan.last = Date.now();
            setInterval(urtikan.update, 10800000);
            document.addEventListener('visibilitychange', urtikan.update);
        }
        urtikan.load();
    }, // create()

    'update': function() {
        "use strict";
        // Si la page est cachee ou si l'actualisation est recente, alors
        // l'image n'est pas mise a jour.
        var now = Date.now();
        if (document.hidden || now - urtikan.last < 10800000 - 1000)
            return;

        // Enregistrer l'heure de la derniere mise a jour.
        urtikan.last = now;

        urtikan.load();
    }, // update()

    'load': function() {
        "use strict";
        $.get('gout.php?url=' +
              encodeURIComponent('http://www.urtikan.net/dessin-du-jour/'),
              function(data) {
            $('.urtikan').html(
                    $('#posts-dessin img:first', data)
                            .removeAttr('class')
                            .parent().removeAttr('rel')
                                     .removeAttr('title')
                                     .attr('target', '_blank'));
        }, 'html');
    } // load()
}; // urtikan

core.mod.urtikan = urtikan;
