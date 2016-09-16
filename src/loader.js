define(["require", "jquery"], function (require, $) {
    "use strict";

    const load = function (key, gate, url) {
        // Si la propriété 'active' n'est pas définie : considérer que la
        // passerelle est active.
        if (false === gate.active) {
            return;
        }

        const id = key.replace(/\//g, "-");
        const clazz = gate.widget.replace(/\//g, "-");

        // Si le widget est utilisé pour la première fois.
        if (!$("body > template." + clazz).length) {
            // Charger la feuille de style.
            $("head").append($("<link />", {
                "rel":  "stylesheet",
                "href": "widget/" + gate.widget + "/style.css"
            }));
            // Passer en synchrone pour attendre que le HTML soit chargé avant
            // de l'utiliser.
            $.ajaxSetup({ "async": false });
            // Charger le HTML.
            $("body").append(
                $("<template>").load("widget/" + gate.widget + "/index.html")
                               .addClass(clazz));
            $.ajaxSetup({ "async": true });
        }

        $("body").append(
            $("<article>").attr("id", id)
                          .addClass(clazz)
                          .css({ "left": gate.coord.x * 1.4 + "em",
                                 "top":  gate.coord.y * 1.4 + "em" })
                          .width(gate.coord.w * 1.4 + "em")
                          .height(gate.coord.h * 1.4 + "em")
                          .html($("body > template." + clazz).html()));

        const promises = (gate.scrapers || []).map(function (scraper) {
            return new Promise(function (resolve) {
                require(["scraper/" + scraper.scraper + "/script"],
                        function (Construct) {
                    resolve(new Construct(scraper.config));
                });
            });
        });
        Promise.all(promises).then(function (scrapers) {
            require(["widget/" + gate.widget + "/script"], function (factory) {
                factory(id, url, gate.config, scrapers);
            });
        });
    }; // load()

    const init = function (user, config) {
        // Charger les passerelles contenues dans le fichier de configuration.
        $.getJSON("gate/" + user + "/" + config + ".json").then(
                                                              function (gates) {
            for (let key in gates) {
                load(key, gates[key], "gate/" + user + "/" + key);
            }
        }, (err) => console.log(err));
    }; // init()

    return init;
});
