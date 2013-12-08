var kraland = {
    'apps': { },
    'last': null,

    'create': function(id, url) {
        "use strict";
        $.getJSON(url + '/config.json', function(args) {
            $('#' + id).css('background-color', args.color);
            kraland.apps[id] = { 'size': args.size,
                                 'selection': args.selection };

            $.ajax({
                'url': 'gout.php?url=' +
                       encodeURIComponent('http://www.kraland.org/main.php?p=4_4') +
                       '&id=' + id,
                'beforeSend': function(xhr) {
                    xhr.overrideMimeType('text/html; charset=ISO-8859-1');
                },
                'success': function(data) {
                    kraland.apps[id].t = $('#report-col3 input[name="t"]',
                                           data).val();

                    if (null === kraland.last) {
                        // Mettre a jour toutes les cinq minutes (5 * 60 * 1000).
                        kraland.last = Date.now();
                        setInterval(kraland.update, 300000);
                        document.addEventListener('visibilitychange',
                                                  kraland.update);
                    }
                    kraland.load(id, kraland.apps[id]);
                }
            });
        });
    }, // create()

    'update': function() {
        "use strict";
        // Si la page est cachee ou si l'actualisation est recente, alors les
        // evenements ne sont pas mis a jour.
        var now = Date.now();
        if (document.hidden || now - kraland.last < 300000 - 1000)
            return;

        // Enregistrer l'heure de la derniere mise a jour.
        kraland.last = now;

        $.each(kraland.apps, function(id, args) {
            kraland.load(id, args);
        });
    }, // update()

    'load': function(id, args) {
        "use strict";
        $.ajax({
            'url': 'gout.php?url=' +
                   encodeURIComponent('http://www.kraland.org/main.php?p=4_4') +
                   '&id=' + id,
            'type': 'POST',
            'data': { 'p': '4_4',
                      'a': '1',
                      'Submit': 'Actualiser',
                      't': kraland.apps[id].t,
                      'p3': '1',
                      'p2': 'on',
                      'p1': '25',
                      'p7': kraland.apps[id].selection },
            'beforeSend': function(xhr) {
                xhr.overrideMimeType('text/html; charset=ISO-8859-1');
            },
            'success': function(data) {
                kraland.apps[id].t = $('#report-col3 input[name="t"]',
                                       data).val();
                kraland.convert(data, args.size).forEach(function(event) {
                    if (!$('#' + id + ' a[data-checksum="' + event.checksum +
                                                                 '"]').length) {
                        $('#' + id + ' > ul > li:gt(3)').remove();
                        kraland.add(id, event);
                    }
                });
            }
        });
    }, // load()

    'convert': function(data, size) {
        "use strict";
        var json = [];
        $('.ev_loc:lt(' + size + ')', data).each(function (i, event) {
            var text = $(event).next().next().text();
            var checksum = 0;
            for (var j = text.length; --j >= 0; ) {
                checksum  = ((checksum << 5) - checksum) + text.charCodeAt(j);
                checksum |= 0; // Convertir en integer 32 bit.
            }
            json.push({ 'flag':     $('img', event),
                        'place':    $(event),
                        'time':     $(event).next(),
                        'title':    text,
                        'text':     text,
                        'checksum': $(event).next().text() + checksum });
        });
        return json.reverse();
    }, // convert()

    'add': function(id, event) {
        "use strict";
        $('#' + id + ' > ul').prepend(
                $('<li>').append($('<a>').attr({
            'href': 'http://www.kraland.org/main.php?p=4_4#' + event.checksum,
            'target': '_blank',
            'data-checksum': event.checksum
        })
                                         .html(event.title))
                         .append($('<span>').html(event.text))).fadeIn('slow');
    } // add()
}; // kraland

core.mod.kraland = kraland;
