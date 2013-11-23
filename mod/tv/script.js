// TODO Dessiner les symboles des categories :
//        - unknown : rien,
//        - magazine : livre,
//        - jeunesse : .
var tv = {
    'IMG_DIR': 'mod/tv/img/',
    'CHANNELS': [ 'Mosa\u00EFque', 'TF1', 'France 2', 'France 3', 'Canal+',
                  'France 5', 'M6', 'Arte', 'D8', 'W9', 'TMC', 'NT1', 'NRJ 12',
                  'LCP-AN / Public S\u00E9nat', 'France 4', 'BFM TV',
                  'i>T\u00E9l\u00E9', 'D17', 'Gulli', 'France \u00D4', 'HD1',
                  'L\'Equipe 21', '6ter', 'Num\u00E9ro 23',
                  'RMC D\u00E9couverte', 'Ch\u00E9rie 25' ],

    'create': function(id, args) {
        "use strict";
        $('#' + id).css('background-color', args.color);

        $.get('gout.php?url=' +
              encodeURIComponent('http://www.programme-television.org/'),
              function(data) {
            $.each(tv.convert(data), function(i, channel) {
                if (undefined !== args.channels) {
                    var include = args.channels.include;
                    var exclude = args.channels.exclude;
                    if (undefined !== include &&
                            -1 === include.indexOf(Number(i)) ||
                            undefined !== exclude &&
                            -1 !== exclude.indexOf(Number(i)))
                        return true;
                }

                var mark = $('<span>');
                for (var j = 0; j < channel.mark; ++j)
                    $(mark).append($('<img>').attr({
                                        'src': tv.IMG_DIR + 'star.svg',
                                        'alt': '*' }));

                $('#' + id + ' ul').append(
                    $('<li>').append($('<img>').attr({
                                        'src': tv.IMG_DIR + i + '.svg',
                                        'alt': tv.CHANNELS[i],
                                        'title': tv.CHANNELS[i] }))
                             .append($('<img>').attr({
                                       'src': tv.IMG_DIR + channel.type + '.svg',
                                       'alt': channel.type,
                                       'title': channel.category })
                           //  .append($('<span>').text(channel.category)
                                                .addClass(channel.type))
                             .append(mark)
                             .append($('<a>').text(channel.title)
                                             .attr({ 'href': channel.link,
                                                     'target': '_blank' })));
            });
        });
    }, // create()

    'convert': function(data) {
        "use strict";
        var progs = { };
        $('#prime-broadcasts li', data).each(function() {
            var channel = $('.logo a', this).attr('href').substr(12);
            var index;
            switch (channel) {
                case 'tf1':                     index =  1; break;
                case 'france-2':                index =  2; break;
                case 'france-3':                index =  3; break;
                case 'canal':                   index =  4; break;
                case 'france-5':                index =  5; break;
                case 'm6':                      index =  6; break;
                case 'arte':                    index =  7; break;
                case 'd8':                      index =  8; break;
                case 'w9':                      index =  9; break;
                case 'tmc':                     index = 10; break;
                case 'nt-1':                    index = 11; break;
                case 'nrj-12':                  index = 12; break;
                case 'la-chaine-parlementaire': index = 13; break;
                case 'france-4':                index = 14; break;
                case 'bfm-tv':                  index = 15; break;
                case 'i-tele':                  index = 16; break;
                case 'd17':                     index = 17; break;
                case 'gulli':                   index = 18; break;
                case 'france-o':                index = 19; break;
                case 'hd1':                     index = 20; break;
                case 'l-equipe-21':             index = 21; break;
                case '6ter':                    index = 22; break;
                case 'numero-23':               index = 23; break;
                case 'rmc-decouverte':          index = 24; break;
                case 'cherie-25':               index = 25; break;
                default:                        index = -1;
            }
            if (-1 === index)
                return true;

            var mark = $('.texte_infos:first .picto7', this).text().length;

            var title = $.trim($('.texte_titre:first', this).text());
            var link = $('.texte_titre:first a', this).attr('href');
            if (undefined === link)
                link = 'http://www.programme-television.org/';

            var category;
            var type;
            if ($('.texte_cat:first a', this).length) {
                var RE = /genres\/([^\/]+)\//;
                category = $.trim($('.texte_cat:first a', this).text());
                type = RE.exec($('.texte_cat:first a', this).attr('href'))[1];
            } else {
                category = 'Non-d\u00E9fini';
                type = 'unknown';
            }
            if ('films-telefilms' === type) {
                if (-1 !== category.indexOf('T\u00E9l\u00E9film'))
                    type = 'telefilms';
                else
                    type = 'films';
            }

            progs[index] = { 'category': category,
                             'type': type,
                             'title': title,
                             'link': link,
                             'mark': mark };
        });
        return progs;
    }, // convert()
}; // tv

core.mod.tv = tv;
