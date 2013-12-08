var ajaxloader = {
    'create': function(id, url) {
        "use strict";
        $.getJSON(url + '/config.json', function(args) {
            $('#' + id).css('background-color', args.color);
        });

        $(document).ajaxStart(function() {
            $('.ajaxloader').css('background-image',
                                 'url("mod/ajaxloader/img/loader.svg")');
        });
        $(document).ajaxStop(function() {
            $('.ajaxloader').css('background-image', 'none');
        });
    } // create()
}; // ajaxloader

core.mod.ajaxloader = ajaxloader;
