var feed = {
    'apps': { },
    'last': null,

    'create': function(id, args) {
        "use strict";
        $('#' + id).css({ 'background-color': args.color,
                          'background-image': 'url("' + args.icon + '")' });
        feed.apps[id] = { 'urls': (Array.isArray(args.url) ? args.url
                                                           : [ args.url ]),
                          'size': args.size };

        if (null === feed.last) {
            // Mettre a jour toutes les cinq minutes (5 * 60 * 1000).
            feed.last = Date.now();
            setInterval(feed.update, 300000);
            document.addEventListener('visibilitychange', feed.update);
        }
        feed.load(id, feed.apps[id]);
    }, // create()

    'update': function() {
        "use strict";
        // Si la page est cachee ou si l'actualisation est recente, alors les
        // flux ne sont pas mis a jour.
        var now = Date.now();
        if (document.hidden || now - feed.last < 300000 - 1000)
            return;

        // Enregistrer l'heure de la derniere mise a jour.
        feed.last = now;

        for (var id in feed.apps)
            feed.load(id, feed.apps[id]);
    }, // update()

    'load': function(id, args) {
        "use strict";
        // Recuperer les actualites de chaque flux.
        for (var i in args.urls) { // FIXME Remplacer par un for...of.
            var url = args.urls[i];
            $.get('gout.php?url=' + encodeURIComponent(url), function(data) {
                feed.add(id, args, data);
            }, 'xml');
        }
    }, // load()

    'add': function(id, args, data) {
        "use strict";
        // Uniformiser les differents formats de flux.
        var items = [];
        if ($('rss', data).length) // RSS 2.0.
            $('item:lt(' + args.size + ')', data).each(function(i, item) {
                items.push({
                    'title': $('title', item).text(),
                    'desc':  $('description', item).text(),
                    'link':  $('link', item).text(),
                    'guid':  $('guid', item).text(),
                    'date':  new Date($('pubDate', item).text()).getTime()
                });
            });
        else if ($('feed', data).length) // Atom 1.0.
            $('entry:lt(' + args.size + ')', data).each(function(i, entry) {
                items.push({
                    'title': $('title', entry).text(),
                    'desc':  $('summary', entry).text(),
                    'link':  $('link', entry).attr('href'),
                    'guid':  $('id', entry).text(),
                    'date':  new Date($('updated', entry).text()).getTime()
                });
            });

        for (var i in items) { // FIXME Remplacer par un for...of.
            var item = items[i];
            if ('' === item.guid)
                item.guid = item.link;

            // Si l'actualite n'est pas affichee.
            if (!$('#' + id + ' li[data-guid="' + item.guid + '"]').length) {
                // Trouver la future position chronologique de l'actualite.
                var pos = 0;
                $('#' + id + ' > ul > li').each(function(i) {
                    if (item.date < Number($(this).attr('data-date')))
                        pos = i;
                    else
                        return false;
                });
                if (pos !== args.size) {
                    // Supprimer la plus ancienne actualite.
                    $('#' + id + ' > ul > li:gt(' + (args.size - 2) + ')')
                                                                      .remove();

                    // Creer la ligne de la nouvelle actualite.
                    var li = $('<li>');
                    $(li).attr({ 'data-guid': item.guid,
                                 'data-date': item.date });
                    $(li).append($('<a>').attr({ 'href':   item.link,
                                                 'target': '_blank' })
                                         .text(item.title));
                    if ('' !== item.desc)
                        $(li).append($('<span>').html(item.desc));

                    if (0 === pos)
                        $('#' + id + ' > ul').prepend(li).fadeIn('slow');
                    else
                        $('#' + id + ' > ul > li:eq(' + pos + ')').after(li)
                                                                .fadeIn('slow');
                }
            } else { // Si l'actualite est deja affichee.
                var li = $('#' + id + ' li[data-guid="' + item.guid + '"]');
                // Si des elements de l'actualite ont change, les mettre a jour.
                if ($('> a', li).attr('href') !== item.link)
                    $('> a', li).attr('href', item.link);
                if ($('> a', li).text() !== item.title)
                    $('> a', li).text(item.title);
                if ($('> span', li).html() !== item.desc)
                    $('> span', li).html(item.desc);
            }
        }
    }, // add()
}; // feed

core.mod.feed = feed;
