define(["require", "jquery"], function (require, $) {
    "use strict";

    const load = function (gate, url) {
        // Si la propriété 'active' n'est pas définie : considérer que la
        // passerelle est active.
        if (false === gate.active) {
            return;
        }

        const id = "gate" + $("article").length;
        const clazz = gate.module.replace(/\//g, "-");

        // Si le module est utilisé pour la première fois.
        if (!$("body > template." + clazz).length) {
            // Charger la feuille de style.
            $("head").append($("<link />", {
                "rel":  "stylesheet",
                "href": "mod/" + gate.module + "/style.css"
            }));
            // Passer en synchrone pour attendre que le HTML soit chargé avant
            // de l'utiliser.
            $.ajaxSetup({ "async": false });
            // Charger le HTML.
            $("body").append(
                $("<template>").load("mod/" + gate.module +
                                     "/index.html")
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

        require(["mod/" + gate.module + "/script"], function (factory) {
            factory(id, url);
        });
    }; // load()

    const init = function (user, config) {
        // Charger les passerelles contenues dans le fichier de configuration.
        $.getJSON("gate/" + user + "/" + config + ".json").then(
                                                              function (gates) {
            for (let url in gates) {
                load(gates[url], "gate/" + user + "/" + url);
            }
        });
    }; // init()

    return init;
});
