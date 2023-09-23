# Gout

[![firefox][img-firefox]][link-firefox]
[![build][img-build]][link-build]
[![coverage][img-coverage]][link-coverage]

> Agrégateur d'Internet (flux RSS et tout le reste).

## Description

Gout est une **extension** Firefox pour récupérer des informations sur Internet
(flux RSS, résultats d'API, parsing de sites Internet...) et les afficher dans
une page Web. Les [dashboards](#dashboard) sont ces pages Web avec du JSON pour
configurer chaque [widget](#widget). La configuration d'un widget comporte un
[module](#module) pour définir le format d'affichage ; et des
[scrapers](#scraper) pour extraire des données.

### Dashboard

Un dashboard est une page Web qui contient des widgets. Elle doit importer le
moteur de rendu de Gout :
`"https://cdn.jsdelivr.net/gh/regseb/gout@0/src/engine/script.js"`.

Voici un exemple de dashboard ayant quatre colonnes de widgets.

```HTML
<!DOCTYPE html>
<html lang="fr-FR">
  <head>
    <meta charset="utf-8">
    <link href="https://cdn.jsdelivr.net/gh/regseb/gout@0/src/engine/img/icon.svg"
          rel="shortcut icon">
    <title>Gout</title>
    <script src="https://cdn.jsdelivr.net/gh/regseb/gout@0/src/engine/script.js"
            type="module"></script>
    <style>
        body { display: flex; }
        div  { display: flex; flex-direction: column; }
    </style>
  </head>
  <body>
    <div style="width: 25%;">
      <script type="application/json">{ "...": "..." }</script>
      <script type="application/json">{ "...": "..." }</script>
      <!-- ... -->
    </div>
    <div style="width: 25%;">
      <script type="application/json">{ "...": "..." }</script>
    </div>
    <div style="width: 25%;">
      <script type="application/json">{ "...": "..." }</script>
    </div>
    <div style="width: 25%;">
      <script type="application/json">{ "...": "..." }</script>
      <script type="application/json">{ "...": "..." }</script>
    </div>
  </body>
</html>
```

### Widget

Un widget est un bloc du dashboard. C'est un élément `<script>` (avec le
`type="application/json"`) qui contient un objet
[JSON](https://www.json.org/json-fr.html "JavaScript Object Notation") ayant
deux propriétés :

- `"module"` : Un objet JSON contenant la configuration du [module](#module).
- `"scrapers"` : Un tableau d'objets JSON pour les configurations de chaque
  [scraper](#scraper).

Cet exemple de widget récupère les dernières publications du flux RSS du site
[LinuxFr.org](https://linuxfr.org/) et il les affiche sous forme d'une liste de
liens.

```HTML
<script type="application/json">
    {
        "module": {
            "url": "https://cdn.jsdelivr.net/gh/regseb/gout@0/src/module/list/list.js",
            "options": {
                "color": "#ffc107",
                "cron": "*/10 * * * *",
                "max": 5
            }
        },
        "scrapers": [{
            "url": "https://cdn.jsdelivr.net/gh/regseb/gout@0/src/scraper/list/rss/rss.js",
            "options": {
                "url": "https://linuxfr.org/news.atom"
            }
        }]
    }
</script>
```

<!-- Une description détaillée des widgets est disponible sur le site de
     Gout. -->

Si vous voulez des widgets, vous pouvez chercher
[_gout-widget_](https://github.com/search?q=%22gout-widget%22&type=Code&l=Markdown)
dans GitHub.

### Module

Les modules sont les composants du widget définissant comment les données sont
affichées (une liste de liens, une image...). La configuration d'un module est
un objet JSON composé de deux propriétés :

- `"url"` : L'URL du fichier JavaScript du module (par exemple pour le module
  [_list_](https://github.com/regseb/gout/tree/HEAD/src/module/list#readme) :
  `"https://cdn.jsdelivr.net/gh/regseb/gout@0/src/module/list/list.js"`).
- `"options"` : Un objet JSON contenant les options du module (qui sont
  spécifiques pour chaque module).

Dans cet exemple, le module est une liste (avec au maximum `5` éléments)
affichée dans un bloc bleu `#2196f3` et actualisée toutes les dix minutes
[`*/10 * * * *`](https://crontab.guru/#*/10_*_*_*_*).

```HTML
<script type="application/json">
    {
        "module": {
            "url": "https://cdn.jsdelivr.net/gh/regseb/gout@0/src/module/list/list.js",
            "options": {
                "color": "#2196f3",
                "cron": "*/10 * * * *",
                "max": 5
            }
        },
        "scrapers": [{ "...": "..." }]
    }
</script>
```

<!-- Une description détaillée des modules est disponible sur le site de
     Gout. -->

Si vous voulez des modules, vous pouvez chercher
[_gout-module_](https://github.com/search?q=%22gout-module%22&type=Code&l=Markdown)
dans GitHub.

### Scraper

Les scrapers permettent d'extraire des données (flux RSS, parsing de page...) et
de les transmettre à un module dans un format spécifique. Plusieurs scrapers
peuvent être associés avec un module. Dans la configuration du widget, les
scrapers sont définis dans un tableau d'objets JSON composés de deux
propriétés :

- `"url"` : L'URL du fichier JavaScript du scraper (par exemple pour le scraper
  [_list/rss_](https://github.com/regseb/gout/tree/HEAD/src/scraper/list/rss#readme)
  : `"https://cdn.jsdelivr.net/gh/regseb/gout@0/src/scraper/list/rss/rss.js"`).
- `"options"` : un objet JSON contenant les options du scraper (qui sont
  spécifiques pour chaque scraper).

Dans cet exemple, deux scrapers sont définis pour récupérer les dernières vidéos
des chaines YouTube [ARTE Cinema](https://www.youtube.com/c/ARTECinemafrance) et
[ARTE Séries](https://www.youtube.com/c/ARTES%C3%A9ries).

```HTML
<script type="application/json">
    {
        "module": { "...": "..." },
        "scrapers": [{
            "url": "https://cdn.jsdelivr.net/gh/regseb/gout@0/src/scraper/list/rss/rss.js",
            "options": {
                "url": "https://www.youtube.com/feeds/videos.xml?channel_id=UClo03hULFynpoX3w1Jv7fhw",
            }
        }, {
            "url": "https://cdn.jsdelivr.net/gh/regseb/gout@0/src/scraper/list/rss/rss.js",
            "options": {
                "url": "https://www.youtube.com/feeds/videos.xml?channel_id=UCzaf-8cAEiXfynukcmV5MXw"
            }
        }]
    }
</script>
```

<!-- Une description détaillée des scrapers est disponible sur le site de
     Gout. -->

Si vous voulez des scrapers, vous pouvez chercher
[_gout-scraper_](https://github.com/search?q=%22gout-scraper%22&type=Code&l=Markdown)
dans GitHub.

## Installation

L'extension est disponible sur [**Firefox Browser Add-ons**][link-firefox].
Après l'avoir installée, téléchargez un [template d'un
dashboard](https://github.com/regseb/gout/tree/HEAD/template/dashboard).
Ouvrez le fichier avec un éditeur de texte. Ajoutez les widgets que vous
souhaitez dans le code HTML. Ouvrez le fichier avec votre navigateur et ajoutez
la page dans l'extension (en cliquant sur l'icône de l'extension dans la barre
d'outils du navigateur). Actualisez la page pour voir apparaitre les widgets.

[img-firefox]: https://img.shields.io/amo/v/gout.svg?label=add-on&logo=firefox-browser&logoColor=whitesmoke
[img-build]: https://img.shields.io/github/actions/workflow/status/regseb/gout/ci.yml?branch=main&logo=github&logoColor=whitesmoke
[img-coverage]: https://img.shields.io/endpoint?label=coverage&url=https%3A%2F%2Fbadge-api.stryker-mutator.io%2Fgithub.com%2Fregseb%2Fgout%2Fmain&logo=stryker&logoColor=whitesmoke
[link-firefox]: https://addons.mozilla.org/addon/gout/
[link-build]: https://github.com/regseb/gout/actions/workflows/ci.yml?query=branch%3Amain
[link-coverage]: https://dashboard.stryker-mutator.io/reports/github.com/regseb/gout/main
