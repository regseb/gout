// TODO Afficher une fleche pour indiquer l'orientation du vent.
// TODO Afficher un thermometre pour les temperatures.
// TODO Dessiner un symbol pour les alertes : vent, froid, orages, canicule,
//      pluie, avalanche, inondation, neige-verglas, vagues-submersion.
// TODO Afficher le meteo du jour sur la meme ligne que le nom de la ville.
var weather = {
    'apps': { },
    'last': null,

    'create': function(id, url) {
        "use strict";
        $.getJSON(url + '/config.json', function(args) {
            $('#' + id).css('background-color', args.color);
            weather.apps[id] = { 'appid': args.appid,
                                 'city': args.city,
                                 'departement': args.departement };

            if (null === weather.last) {
                // Mettre a jour toutes les trois heures (3 * 60 * 60 * 1000).
                weather.last = Date.now();
                setInterval(weather.update, 10800000);
                document.addEventListener('visibilitychange', weather.update);
            }
            weather.load(id, weather.apps[id]);
        });
    }, // create()

    'update': function() {
        "use strict";
        // Si la page est cachee ou si l'actualisation est recente, alors les
        // meteos ne sont pas mise a jour.
        var now = Date.now();
        if (document.hidden || now - weather.last < 10800000 - 1000)
            return;

        // Enregistrer l'heure de la derniere mise a jour.
        weather.last = now;

        $.each(weather.apps, function(id, args) {
            weather.load(id, args);
        });
    }, // update()

    'load': function(id, args) {
        "use strict";
        // Afficher l'enventuelle alerte vigilance.
        if (undefined !== args.departement) {
            var url = 'http://france.meteofrance.com/vigilance/Bulletin?' +
                      'ZONE=DEPT' + args.departement;
            $.get('gout.php?url=' + encodeURIComponent(url), function(data) {
                var vigi = $('span:contains("D\u00E9partement en vigilance ")',
                             data);
                if (-1 !== $(vigi).text().indexOf('orange') ||
                        -1 !== $(vigi).text().indexOf('rouge')) {
                    $('#' + id + ' > p a')
                            .addClass($(vigi).text().substr(25)
                                                   .replace('orange.', 'orange')
                                                   .replace('rouge.',  'red'))
                            .attr('href', url);
                    $('#' + id + ' > p span').html(
                                              $(vigi).parent().parent().html());
                } else {
                    $('#' + id + ' > p a').removeClass('orange')
                                          .removeClass('red')
                                          .attr('href', '#');
                    $('#' + id + ' > p span').empty();
                }
            }, 'html');
        }

        $('#' + id + ' ul').empty();
        // Recuperer la meteo du jour.
        $.getJSON('http://api.openweathermap.org/data/2.5/weather?q=' +
                  args.city + '&units=metrics&lang=fr&APPID=' +
                  args.appid + '&callback=?',
                  function(data) {
            $('#' + id + ' h1').text(data.name);
            weather.add(id, weather.convert(data));
        });

        // Recuperer les previsions.
        $.getJSON('http://api.openweathermap.org/data/2.5/forecast/daily?q=' +
                  args.city + '&units=metrics&lang=fr&cnt=2&APPID=' +
                  args.appid + '&callback=?',
                  function(data) {
            $.each(data.list, function(i, day) {
                weather.add(id, weather.convert(day));
            });
        });
    }, // load()

    'convert': function(data) {
        "use strict";
        if (undefined !== data.name) // Meteo du jour.
            return { 'icon': data.weather[0].icon,
                     'desc': data.weather[0].description,
                     'help': data.weather[0].main,
                     'temp': { 'min': data.main.temp_min,
                               'max': data.main.temp_max },
                     'wind': { 'speed': data.wind.speed,
                               'deg':   data.wind.deg } };
        else // Previsions.
            return { 'icon': data.weather[0].icon,
                     'desc': data.weather[0].description,
                     'help': data.weather[0].main,
                     'temp': { 'min': data.temp.min,
                               'max': data.temp.max },
                     'wind': { 'speed': data.speed,
                               'deg':   data.deg } };
    }, // convert()

    'add': function(id, data) {
        "use strict";
        var li = $('<li>');
        var p = $('<p>');

        var date = new Date();
        date.setDate(date.getDate() +  $('#' + id + ' li').length);
        $(p).append($('<strong>').text(date.format('EEEEE')));

        $(p).append($('<img>').attr({ 'src': 'mod/weather/icons/' + data.icon +
                                             '.svg',
                                      'alt': data.desc,
                                      'title': data.help,
                                      'width': 32,
                                      'height': 32 }));

        $(li).append(p);

        p = $('<p>');

        $(p).append($('<span>').addClass('temp')
                               .text(
                Math.round(data.temp.min - 273.15) + ' / ' +
                Math.round(data.temp.max - 273.15) + ' \u00b0C'));

        var deg = data.wind.deg + 360 % 360;
        var dir = '';
        if      (deg <  22.5) dir = 'nord';
        else if (deg <  67.5) dir = 'nord-est';
        else if (deg < 112.5) dir = 'est';
        else if (deg < 157.5) dir = 'sud-est';
        else if (deg < 202.5) dir = 'sud';
        else if (deg < 247.5) dir = 'sud-ouest';
        else if (deg < 292.5) dir = 'ouest';
        else if (deg < 337.5) dir = 'nord-est';
        else                  dir = 'nord';
        $(p).append($('<span>').addClass('wind')
                               .text(Math.round(data.wind.speed * 3.6) +
                                     ' km/h ' + dir));

        $(li).append(p);

        $('#' + id + ' ul').append(li);
    } // add()
}; // weather

core.mod.weather = weather;
