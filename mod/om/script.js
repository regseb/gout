var om = {
    'IMG_DIR': 'mod/om/img/',
    'TOURNAMENTS': { '11': { 'img': 'ligue1',
                             'name': 'Ligue 1' },
                     '12': { 'img': 'amical',
                             'name': 'Amical' },
                     '13': { 'img': 'coupedefrance',
                             'name': 'Coupe de France' },
                     '14': { 'img': 'coupedelaligue',
                             'name': 'Coupe de la Ligue' },
                     '15': { 'img': 'liguedeschampions',
                             'name': 'Ligue des Champions' },
                     '16': { 'img': 'ligueeuropa',
                             'name': 'Ligue Europa' },
                     '20': { 'img': 'tropheedeschampions',
                             'name': 'Troph\u00E9e des Champions' } },
    'CHANNELS': { '1': { 'img': 'canal',
                         'name': 'Canal+' },
                  '18': { 'img': 'bein1',
                          'name': 'Bein Sport 1' },
                  '19': { 'img': 'bein1_canal',
                          'name': 'Bein Sport 1 / Canal+' } },

    'last': null,

    'create': function(id, url) {
        "use strict";
        $.getJSON(url + '/config.json', function(args) {
            $('#' + id).css('background-color', args.color);
        });

        if (null === om.last) {
            // Mettre a jour toutes les 24 heures (24 * 60 * 60 * 1000).
            om.last = Date.now();
            setInterval(om.update, 86400000);
            document.addEventListener('visibilitychange', om.update);
        }
        om.load();
    }, // create()

    'update': function() {
        "use strict";
        // Si la page est cachee ou si l'actualisation est recente, alors
        // la liste des matchs n'est pas mise a jour.
        var now = Date.now();
        if (document.hidden || now - om.last < 10800000 - 1000)
            return;

        // Enregistrer l'heure de la derniere mise a jour.
        om.last = now;

        om.load();
    }, // update()

    'load': function() {
        "use strict";
        $.get('gout.php?url=' +
              encodeURIComponent('http://www.om.net/fr/Saison/102001/' +
                                 'Calendrier_Resultats'),
              function(data) {
            data = om.extract(data);

            // Afficher le dernier match joue.
            var tournament = om.TOURNAMENTS[data.last.tournament];
            $('.om p:first img').attr({ 'src': om.IMG_DIR + tournament.img +
                                               '.svg',
                                        'alt': tournament.name,
                                        'title': tournament.name });
            $('.om p:first a').text(data.last.teams_score)
                              .attr('href', data.last.link);

            // Afficher le prochain match.
            tournament = om.TOURNAMENTS[data.next.tournament];
            var channel = om.CHANNELS[data.next.channel];
            $('.om p:last img:first').attr({ 'src': om.IMG_DIR +
                                                    tournament.img + '.svg',
                                             'alt': tournament.name,
                                             'title': tournament.name });
            $('.om p:last a').text(data.next.teams)
                             .attr('href', data.next.link);
            $('.om p:last time').text(data.next.time.format('dd/MM HH:mm'))
                                .attr('title',
                                      data.next.time.format('EEEEE dd MMMMM' +
                                                            ' yyyy HH:mm'));
            $('.om p:last img:last').attr({ 'src': om.IMG_DIR + channel.img +
                                                   '.svg',
                                            'alt': channel.name,
                                            'title': channel.name });
        }, 'html');
    }, // load()

    'extract': function(data) {
        "use strict";
        var RE = /\/([0-9]+)\.png$/;
        var last = $('#calendar-last-match', data);
        var next = $('#calendar-next-match', data);
        return {
            'last': {
                'link': 'http://www.om.net' + $('a:first', last).attr('href'),
                'tournament': RE.exec($('.competition img:first',
                                        last).attr('src'))[1],
                'teams_score': $('.competition span', last).text()
            },
            'next': {
                'link': 'http://www.om.net' + $('a:first', next).attr('href'),
                'tournament': RE.exec($('.competition img:first',
                                        next).attr('src'))[1],
                'teams': $('h2', next).text(),
                'time': new Date($('time', next).attr('datetime')),
                'channel': RE.exec($('.tv img', next).attr('src'))[1]
            }
        };
    } // extract()
}; // om

core.mod.om = om;
