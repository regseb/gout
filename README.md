# Gout

[![firefox][img-firefox]][link-firefox]
[![build][img-build]][link-build]
[![coverage][img-coverage]][link-coverage]

> Agrégateur d'Internet (flux RSS et tout le reste).

## Description

Gout est une **extension** Firefox pour récupérer des informations sur Internet
(flux RSS, résultats d'API, parsing de sites Internet...) et les afficher dans
une page Web. Les [dashboards](#dashboard) sont ces pages Web avec du
[JSON](https://www.json.org/json-fr.html "JavaScript Object Notation") pour les
[widgets](#widget). Et il est aussi possible de développer des
[modules](#module) et des [scrapers](#scraper) pour agréger de nouveaux sites
Internet.

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

Un widget est bloc du dashboard. C'est un élément `<script>` qui contient un
objet JSON définissant son module et ses scrapers :

- `"module"` : Un objet JSON contenant le règlage du module.
- `"scrapers"` : Un tableau d'objet JSON pour les règlages de chaque scraper.

Cet exemple de widget récupère les dernières publications du flux RSS du site
[LinuxFr.org](https://linuxfr.org/) et il les affiche sous forme d'une liste de
liens.

```HTML
<script type="application/json">
    {
        "module": {
            "url": "https://cdn.jsdelivr.net/gh/regseb/gout@0/src/module/list/list.js",
            "config": {
                "color": "#ffc107",
                "cron": "*/10 * * * *",
                "max": 5
            }
        },
        "scrapers": [{
            "url": "https://cdn.jsdelivr.net/gh/regseb/gout@0/src/scraper/list/rss/rss.js",
            "config": {
                "url": "https://linuxfr.org/news.atom"
            }
        }]
    }
</script>
```

### Module

Les modules sont les composants du widget définissant comment les données sont
affichées (une liste de liens, une image...). Dans la configuration du widget,
l'objet JSON du module est composé de deux propriétés :

- `"url"` : L'URL du fichier JavaScript du module (par exemple pour le module
  [_list_](https://github.com/regseb/gout/tree/HEAD/src/module/list#readme) :
  `"https://cdn.jsdelivr.net/gh/regseb/gout@0/src/module/list/list.js"`).
- `"config"` : Un objet JSON contenant la configuration du module (qui est
  spécifique pour chaque module). Selon les modules, cette propriété est
  optionnelle.

Dans cet exemple, le module est une liste (avec au maximum `5` éléments)
affichée dans un bloc bleu `#2196f3` et actualisée toutes les dix minutes
[`*/10 * * * *`](https://crontab.guru/#*/10_*_*_*_*).

```HTML
<script type="application/json">
    {
        "module": {
            "url": "https://cdn.jsdelivr.net/gh/regseb/gout@0/src/module/list/list.js",
            "config": {
                "color": "#2196f3",
                "cron": "*/10 * * * *",
                "max": 5
            }
        },
        "scrapers": [{ "...": "..." }]
    }
</script>
```

### Scraper

Les scrapers permettent d'extraire des données (flux RSS, parsing de page...) et
de les transmettre à un module dans un format spécifique. Plusieurs scrapers
peuvent être utilisés avec un module. Dans la configuration du widget, les
scrapers sont définis dans un tableau d'objets JSON composés de deux
propriétés :

- `"url"` : L'URL du fichier JavaScript du scraper (par exemple pour le scraper
  [_list/rss_](https://github.com/regseb/gout/tree/HEAD/src/scraper/list/rss#readme)
  : `"https://cdn.jsdelivr.net/gh/regseb/gout@0/src/scraper/list/rss/rss.js"`).
- `"config"` : un objet JSON contenant la configuration du scraper (qui est
  spécifique pour chaque scraper). Selon les scrapers, cette propriété est
  optionnelle.

Dans cet exemple, deux scrapers sont définis pour récupérer les dernières vidéos
des chaines YouTube [ARTE Cinema](https://www.youtube.com/c/ARTECinemafrance) et
[ARTE Séries](https://www.youtube.com/c/ARTES%C3%A9ries).

```HTML
<script type="application/json">
    {
        "module": { "...": "..." },
        "scrapers": [{
            "url": "https://cdn.jsdelivr.net/gh/regseb/gout@0/src/scraper/list/rss/rss.js",
            "config": {
                "url": "https://www.youtube.com/feeds/videos.xml?channel_id=UClo03hULFynpoX3w1Jv7fhw",
            }
        }, {
            "url": "https://cdn.jsdelivr.net/gh/regseb/gout@0/src/scraper/list/rss/rss.js",
            "config": {
                "url": "https://www.youtube.com/feeds/videos.xml?channel_id=UCzaf-8cAEiXfynukcmV5MXw"
            }
        }]
    }
</script>
```

## Installation

L'extension est disponible sur [**Firefox Browser Add-ons**][link-firefox].
Après l'avoir installée, téléchargez un [template d'un
dashboard](https://github.com/regseb/gout/tree/HEAD/template/dashboard).
Ouvrez le fichier avec un éditeur de texte. Ajoutez les widgets que vous
souhaitez dans le code HTML. Ouvrez le fichier avec votre navigateur et ajoutez
la page dans l'extension (en cliquant sur l'icône de l'extension dans la barre
d'outils du navigateur). Actualisez la page pour voir apparaitre les widgets.

[img-firefox]:https://img.shields.io/amo/v/gout.svg?label=add-on&logo=firefox-browser&logoColor=white
[img-build]:https://img.shields.io/github/workflow/status/regseb/gout/CI?logo=github&logoColor=white
[img-coverage]:https://img.shields.io/endpoint?label=coverage&url=https%3A%2F%2Fbadge-api.stryker-mutator.io%2Fgithub.com%2Fregseb%2Fgout%2Fmain

[link-firefox]:https://addons.mozilla.org/addon/gout/
[link-build]:https://github.com/regseb/gout/actions/workflows/ci.yml?query=branch%3Amain
[link-coverage]:https://dashboard.stryker-mutator.io/reports/github.com/regseb/gout/main
