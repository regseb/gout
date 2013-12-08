var cdanslair = {
    'last': null,

    'create': function(id, url) {
        "use strict";
        $.getJSON(url + '/config.json', function(args) {
            $('#' + id).css('background-color', args.color);

            if (null === cdanslair.last) {
                // Mettre a jour toutes les trois heures (3 * 60 * 60 * 1000).
                cdanslair.last = Date.now();
                setInterval(cdanslair.update, 10800000);
                document.addEventListener('visibilitychange', cdanslair.update);
            }
            cdanslair.load();
        });
    }, // create()

    'update': function() {
        "use strict";
        // Si la page est cachee ou si l'actualisation est recente, alors
        // le sujet de l'emission n'est pas mis a jour.
        var now = Date.now();
        if (document.hidden || now - cdanslair.last < 10800000 - 1000)
            return;

        // Enregistrer l'heure de la derniere mise a jour.
        cdanslair.last = now;

        cdanslair.load();
    }, // update()

    'load': function() {
        "use strict";
        // Si c'est le week-end (dimanche ou samedi).
        var now = new Date();
        if (0 === now.getDay() || 6 === now.getDay()) {
            $('.cdanslair a').text('(Pas d\'\u00E9mission le week-end)');
            $('.cdanslair span').text(
                    '<em>C dans l\'air</em> est diffus\u00E9e du lundi au' +
                    ' vendredi.');
            return;
        }

        $.get('gout.php?url=' +
              encodeURIComponent('http://www.france5.fr/c-dans-l-air/'),
              function(data) {
            data = cdanslair.extract(data);

            // Si le sujet du jour n'est pas encore indique.
            if (-1 === data.date.indexOf(now.format('EEEEE'))) {
                $('.cdanslair a').text('(Sujet de l\'\u00E9mission' +
                                       ' non-d\u00E9fini)');
                $('.cdanslair span').text(
                        'Le sujet de l\'\u00E9mission est' +
                        ' g\u00E9n\u00E9ralement d\u00E9fini en d\u00E9but' +
                        ' d\'apr\u00E8s-midi.');
            } else {
                $('.cdanslair a').text(data.title);
                $('.cdanslair span').html(data.description);
            }
        }, 'html');
    }, // load()

    'extract': function(data) {
        "use strict";
        data = $('#fragment-0', data);

        // Si le sujet du jour n'est pas encore indique.
        return { 'date': $('.date-front', data).text(),
                 'title': $('h4.title', data).text(),
                 'description': $('.field-field-resume-emission > div > div',
                                  data).html() };
    } // extract()
}; // cdanslair

core.mod.cdanslair = cdanslair;
