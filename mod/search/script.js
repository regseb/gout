var search = {
    'apps': { },

    'create': function(id, url) {
        "use strict";
        $.getJSON(url + '/config.json', function(args) {
            var height = parseInt($('#' + id).css('height'), 10);
            var width = parseInt($('#' + id).css('width'), 10);
            $('#' + id + ' img').attr({ 'height': height - 2,
                                        'width': height - 2 });
            $('#' + id + ' input').css({ 'height': height - 2,
                                         'width': width - height - 6 });
            search.apps[id] = args.engines;

            $('#' + id + ' p img').click(search.propose);
            for (var i = 0; i < search.apps[id].length; ++i) {
                var engine = search.apps[id][i];
                engine.icon = url + '/' + engine.icon;
                $('#' + id + ' ul').append(
                        $('<li>').append($('<img>')
                                .attr({ 'src': engine.icon,
                                        'alt': '',
                                        'data-index': i }))
                                 .append(engine.title)
                                 .click(search.change));
            }
            $('#' + id + ' ul li:first img').click();
        });
    }, // create()

    'propose': function(event) {
        "use strict";
        var id = $(event.target).parent().parent().parent().attr('id');
        $('#' + id + ' ul').show();
    }, // propose()

    'change': function(event) {
        "use strict";
        var id = $(event.target).parent().parent().parent().attr('id');
        $('#' + id + ' ul').hide();

        var i = $(event.target).attr('data-index');
        var engine = search.apps[id][i];
        $('#' + id + ' form').attr('action', engine.url);
        $('#' + id + ' p').css('border-color', engine.color);
        $('#' + id + ' p img').attr('src', engine.icon);
        $('#' + id + ' input').attr('name', engine.terms)
                              .attr('placeholder', engine.title)
                              .css('color', engine.color);
    }, // change()
}; // search

core.mod.search = search;
