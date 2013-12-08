var hello = {
    'create': function(id, url) {
        "use strict";
        $.getJSON(url + '/config.json', function(args) {
            $('#' + id).css('background-color', args.color);
            $('#' + id + ' span').text(args.who);
        });
    } // create()
}; // hello

core.mod.hello = hello;
