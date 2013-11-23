// TODO Proposer une liste de moteurs de recherche.
var search = {
    'apps': { },

    'create': function(id, args) {
        "use strict";
        $('#' + id + ' img')
            .attr({ 'height': args.coord.h * 10 - 2,
                    'width': args.coord.h * 10 - 2 });
        $('#' + id + ' input')
            .css({ 'height': args.coord.h * 10 - 2,
                   'width': args.coord.w * 10 - args.coord.h * 10 - 6 });
        search.apps[id] = args.engines;

        $('#' + id + ' p img').click(search.propose);
        for (var i = 0; i < search.apps[id].length; ++i) {
            var engine = search.apps[id][i];
            $('#' + id + ' ul').append(
                    $('<li>').append($('<img>')
                            .attr({ 'src': engine.icon,
                                    'alt': '',
                                    'data-index': i }))
                             .append(engine.title)
                            .click(search.change));
        }
        $('#' + id + ' ul li:first img').click();
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
