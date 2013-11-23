var ajaxloader = {
    'create': function(id, args) {
        "use strict";
        $('#' + id).css('background-color', args.color);

        $(document).ajaxStart(function() {
            $('.ajaxloader').css('background-image',
                                 'url("mod/ajaxloader/loader.svg")');
        });
        $(document).ajaxStop(function() {
            $('.ajaxloader').css('background-image', 'none');
        });
    }, // create()
}; // ajaxloader

core.mod.ajaxloader = ajaxloader;
