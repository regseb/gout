# Gout

[![firefox][img-firefox]][link-firefox] [![build][img-build]][link-build]
[![coverage][img-coverage]][link-coverage]

> Agrégateur d'Internet (flux RSS et tout le reste).

## Description

Gout est une **extension** Firefox pour récupérer des informations sur Internet
(flux RSS, résultats d'API, parsing de sites Internet...) et les afficher dans
une page Web. Les [dashboards](#dashboard) sont ces pages Web avec du
[YAML](https://yaml.org/ "YAML Ain't Markup Language") pour configurer chaque
[widget](#widget). La configuration d'un widget comporte un [module](#module)
pour définir le format d'affichage ; et des [scrapers](#scraper) pour extraire
des données.

## Démarrage rapide

- Installez l'extension Gout depuis le [**Firefox Browser
  Add-ons**][link-firefox].
- Téléchargez et décompressez le zip
  [`gout-dashboard-example.zip`](examples/gout-dashboard-example.zip).
- Ouvrez le fichier `gout-dashboard-example/index.html` dans Firefox.
- Ouvrez la popup de l'extension Gout et activez Gout pour la page courant.
- Découvrez les widgets qui s'affichent.

## Composants

### Dashboard

Un dashboard est une page Web qui contient des widgets. Elle doit importer le
moteur de rendu de Gout :
`"https://cdn.jsdelivr.net/gh/regseb/gout@0/src/engine/script.js"`.

Voici un exemple de dashboard ayant quatre colonnes de widgets.

```html
<!doctype html>
<html lang="fr-FR">
  <head>
    <meta charset="utf-8" />
    <link
      href="https://cdn.jsdelivr.net/gh/regseb/gout@0/src/engine/img/icon.svg"
      rel="shortcut icon"
    />
    <title>Gout</title>
    <script
      src="https://cdn.jsdelivr.net/gh/regseb/gout@0/src/engine/script.js"
      type="module"
    ></script>
    <style>
      body {
        display: flex;
      }
      div {
        display: flex;
        flex-direction: column;
      }
    </style>
  </head>
  <body>
    <div style="width: 30%;">
      <script type="application/yaml">
        # ...
      </script>
      <script type="application/yaml">
        # ...
      </script>
      <!-- ... -->
    </div>
    <div style="width: 30%;">
      <script type="application/yaml">
        # ...
      </script>
    </div>
    <div style="width: 20%;">
      <script type="application/yaml">
        # ...
      </script>
    </div>
    <div style="width: 20%;">
      <script type="application/yaml">
        # ...
      </script>
      <script type="application/yaml">
        # ...
      </script>
    </div>
  </body>
</html>
```

### Widget

Un widget est un bloc du dashboard. C'est un élément `<script>` (avec le
`type="application/yaml"`). Le widget sera ajouté dans le DOM de la page au même
endroit que l'élément `<script>`. Le contenu du `<script>` est au format
[YAML](https://yaml.org/ "YAML Ain't Markup Language") avec les propriétés :

```yaml
module:
  url: # L'URL du fichier JavaScript du module.
  options: # Les options du module.
  scrapers:
    - url: # L'URL du fichier JavaScript du premier scraper.
      options: # Les options du premier scraper.
    - url: # L'URL du fichier JavaScript du deuxième scraper.
      options: # Les options du deuxième scraper.
    # ...
```

Cet exemple de widget récupère les dernières publications du flux RSS du site
[LinuxFr.org](https://linuxfr.org/) et il les affiche sous forme d'une liste de
liens.

```html
<script type="application/yaml">
  module:
    url: https://cdn.jsdelivr.net/gh/regseb/gout@0/src/module/list/list.js
    options:
      cron: "0 * * * *"
      max: 5
      color: "#ffc107"
    scrapers:
      - url: https://cdn.jsdelivr.net/gh/regseb/gout@0/src/scraper/list/rss/rss.js
        options:
          url: https://linuxfr.org/news.atom
</script>
```

Vous pouvez aussi importer des widgets directement dans votre dashboard. Il faut
ajouter un élément `<script>` avec l'attribut `src` (ainsi que le `type`). Dans
l'exemple ci-dessous, le widget permettant d'écouter la radio
[Fip](https://github.com/regseb/gout-regseb/tree/main/src/widget/radiofrance#readme)
est intégré dans le dashboard :

```html
<script
  type="application/yaml"
  src="https://cdn.jsdelivr.net/gh/regseb/gout-regseb@0/src/widget/radiofrance/fip.yaml"
></script>
```

Si vous voulez des widgets, vous pouvez chercher
[`_gout-widget_`](https://github.com/search?q=_gout-widget_+language%3AMarkdown&type=Code&l=Markdown)
dans GitHub.

### Module

Les modules sont les composants des widgets définissant comment les données sont
affichées (une liste de liens, une image...). La configuration d'un module a
trois propriétés :

- `url` : L'URL du fichier JavaScript du module (par exemple pour le module
  [_list_](src/module/list#readme) :
  `"https://cdn.jsdelivr.net/gh/regseb/gout@0/src/module/list/list.js"`).
- `options` : Les options du module (qui sont spécifiques pour chaque module).
- `scrapers` : La liste des [scrapers](#scraper) associés au module.

Dans cet exemple, le module est une liste (avec au maximum `5` éléments)
affichée dans un bloc bleu `#2196f3` et actualisée toutes les dix minutes
[`*/10 * * * *`](https://crontab.guru/#*/10_*_*_*_*).

```html
<script type="application/yaml">
  module:
    url: https://cdn.jsdelivr.net/gh/regseb/gout@0/src/module/list/list.js
    options:
      cron: "*/10 * * * *"
      max: 5
      color: "#2196f3"
    scrapers: # ...
</script>
```

Si vous voulez des modules, vous pouvez chercher
[`_gout-module_`](https://github.com/search?q=_gout-module_+language%3AMarkdown&type=Code&l=Markdown)
dans GitHub.

### Scraper

Les scrapers permettent d'extraire des données (flux RSS, parsing de page...) et
de les transmettre à un module dans un format spécifique. Plusieurs scrapers
peuvent être associés avec un module. Dans la configuration du widget, les
scrapers sont définis dans une liste ou chaque élément a deux propriétés :

- `url` : L'URL du fichier JavaScript du scraper (par exemple pour le scraper
  [_list/rss_](src/scraper/list/rss#readme) :
  `"https://cdn.jsdelivr.net/gh/regseb/gout@0/src/scraper/list/rss/rss.js"`).
- `options` : Les options du scraper (qui sont spécifiques pour chaque scraper).

Dans cet exemple, deux scrapers sont définis pour récupérer les dernières vidéos
des chaines YouTube [ARTE Cinema](https://www.youtube.com/@artecinemafr) et
[ARTE Séries](https://www.youtube.com/@arteseries).

```html
<script type="application/yaml">
  module:
    url: # ...
    options: # ...
    scrapers
      - url: https://cdn.jsdelivr.net/gh/regseb/gout@0/src/scraper/list/rss/rss.js
        options:
          url: https://www.youtube.com/feeds/videos.xml?channel_id=UClo03hULFynpoX3w1Jv7fhw
      - url: https://cdn.jsdelivr.net/gh/regseb/gout@0/src/scraper/list/rss/rss.js
        options:
          url: https://www.youtube.com/feeds/videos.xml?channel_id=UCzaf-8cAEiXfynukcmV5MXw
</script>
```

Si vous voulez des scrapers, vous pouvez chercher
[`_gout-scraper_`](https://github.com/search?q=_gout-scraper_+language%3AMarkdown&type=Code&l=Markdown)
dans GitHub.

[img-firefox]:
  https://img.shields.io/amo/v/gout.svg?label=add-on&logo=firefox-browser&logoColor=whitesmoke
[img-build]:
  https://img.shields.io/github/actions/workflow/status/regseb/gout/ci.yml?branch=main&logo=github&logoColor=whitesmoke
[img-coverage]:
  https://img.shields.io/endpoint?label=coverage&url=https%3A%2F%2Fbadge-api.stryker-mutator.io%2Fgithub.com%2Fregseb%2Fgout%2Fmain
[link-firefox]: https://addons.mozilla.org/addon/gout/
[link-build]:
  https://github.com/regseb/gout/actions/workflows/ci.yml?query=branch%3Amain
[link-coverage]:
  https://dashboard.stryker-mutator.io/reports/github.com/regseb/gout/main
