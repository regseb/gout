# Scraper _tools/repeater_

> Mots-clés :
> [_gout_](https://github.com/search?q=_gout_+language%3AMarkdown&type=Code&l=Markdown),
> [_gout-scraper_](https://github.com/search?q=_gout-scraper_+language%3AMarkdown&type=Code&l=Markdown),
> [_gout-scraper-tools-repeater_](https://github.com/search?q=_gout-scraper-tools-repeater_+language%3AMarkdown&type=Code&l=Markdown).

Ce scraper permet de simuler un scraper spécifique retournant des données
statiques pour un module.

Il peut être utilisé avec tous les modules.

## Options

Les options sont dans un objet
[YAML](https://yaml.org/ "YAML Ain't Markup Language") dont les clés
correspondent aux méthodes simulées et les valeurs aux données retournées.

## Exemple

Ce widget affiche une liste avec deux liens allant vers
[Facebook](https://www.facebook.com/) et
[Instagram](https://www.instagram.com/).

```html
<script type="application/yaml">
  module:
    url: "https://cdn.jsdelivr.net/gh/regseb/gout@0/src/module/list/list.js"
    options:
      color: "#f0a30a"
    scrapers:
      - url: "https://cdn.jsdelivr.net/gh/regseb/gout@0/src/scraper/tools/repeater/repeater.js"
        options:
          extract:
            - title: "Facebook"
              link: "https://www.facebook.com/"
            - title: "Instagram"
              link: "https://www.instagram.com/"
</script>
```
