// TODO Agrandir le "cercle" du logo de la Ligue 1.
// TODO Ajouter le bonhomme en bas a droite du logo de la Coupe de la Ligue.
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

    'create': function(id, args) {
        "use strict";
        $('#' + id).css('background-color', args.color);

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
            var RE = /\/([0-9]+)\.png$/;

            var last = $('#calendar-last-match', data);
            var link = 'http://www.om.net' + $('a:first', last).attr('href');
            var tournament = $('.competition img:first', last).attr('src');
            tournament = om.TOURNAMENTS[RE.exec(tournament)[1]];
            var teams_score = $('.competition span', last).text();
            $('.om p:first img').attr({ 'src': om.IMG_DIR + tournament.img +
                                               '.svg',
                                        'alt': tournament.name,
                                        'title': tournament.name });
            $('.om p:first a').text(teams_score)
                              .attr('href', link);

            var next = $('#calendar-next-match', data);
            link = 'http://www.om.net' + $('a:first', next).attr('href');
            tournament = $('.competition img:first', next).attr('src');
            tournament = om.TOURNAMENTS[RE.exec(tournament)[1]];
            var teams = $('h2', next).text();
            var time = new Date($('time', next).attr('datetime'));
            var channel = $('.tv img', next).attr('src');
            channel = om.CHANNELS[RE.exec(channel)[1]];
            $('.om p:last img:first').attr({ 'src': om.IMG_DIR +
                                                    tournament.img + '.svg',
                                             'alt': tournament.name,
                                             'title': tournament.name });
            $('.om p:last a').text(teams)
                             .attr('href', link);
            $('.om p:last time').text(time.format('dd/MM HH:mm'))
                                .attr('title', time.format('EEEEE dd MMMMM' +
                                                           ' yyyy HH:mm'));
            $('.om p:last img:last').attr({ 'src': om.IMG_DIR + channel.img +
                                                   '.svg',
                                            'alt': channel.name,
                                            'title': channel.name });
        }, 'html');
    }, // load()
}; // om

core.mod.om = om;
