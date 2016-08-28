define(["jquery"], function ($) {
    "use strict";

    const gates = {};

    const search = function () {
        const $root = $(this).closest("article");

        // Ouvrir le résultat de la recherche dans un nouvel onglet.
        window.open($("form", $root).attr("action")
                                    .replace("{searchTerms}",
                                             $("input", $root).val()));
        return false;
    }; // search()

    const propose = function () {
        const $root = $(this).closest("article");

        // Afficher la liste des moteurs de recherche.
        $("ul", $root).show();
    }; // propose()

    const change = function () {
        const $root = $(this).closest("article");

        // Cacher la liste des moteurs de recherche.
        $("ul", $root).hide();

        // Mettre à jour le formulaire.
        const engine = gates[$root.attr("id")][$(this).data("index")];
        $("form",  $root).attr("action", engine.url);
        $root.css("background-color", engine.color);
        $("form img", $root).attr("src", engine.icon);
        $("input", $root).attr({ "name":        engine.terms,
                                 "placeholder": engine.title });
    }; // change()

    const display = function ($root, data, i, url) {
        data.icon = url + "/" + data.icon;
        $("ul", $root).append(
            $("<li>").data("index", i)
                     .append($("<img>").attr("src", data.icon))
                     .append(data.title)
                     .click(change));
    }; // display()

    const create = function (id, url, config) {
        const $root = $("#" + id);
        const height = $root.height();
        const width = $root.width();
        $("form", $root).submit(search);
        $("img", $root).width(height)
                       .height(height)
                       .click(propose);
        $("input", $root).width(width - height - 17)
                         .height(height - 5);

        config.forEach(function (engine, i) {
            display($root, engine, i, url);
        });

        gates[id] = config;

        // Sélectionner le premier élément.
        $("li:first", $root).click();
    }; // create()

    return create;
});