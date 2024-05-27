# Scraper _examples/days_

> Mots-clés : gout, gout-scraper, gout-scraper-examples-days.

Ce scraper d'exemple d'exemple retourne les noms des prochains jours de la
semaine. La langue des noms est paramétrable dans les options du scraper.

Il peut être utilisé avec les modules :

- [_list_](https://github.com/regseb/gout/tree/HEAD/src/module/list#readme) ;
- [_single_](https://github.com/regseb/gout/tree/HEAD/src/module/single#readme)
  pour afficher seulement le dernier élément.

## Options

Les options sont dans un objet
[YAML](https://yaml.org/ "YAML Ain't Markup Language") avec les propriétés
suivantes :

<table>
  <tr>
    <th>Nom</th>
    <th>Type</th>
    <th>Description</th>
  </tr>
  <tr>
    <td><code>lang</code></td>
    <td><code>string</code></td>
    <td>
      <p>
        Le code ISO 639-1 de la langue. Par défaut, c'est le français qui est
        utilisé.
      </p>
      <p>
        Exemple : <code>"en"</code>.
      </p>
    </td>
  </tr>
  <tr>
    TODO Ajouter les propriétés des scrapers FilterScraper et ComplementScraper.
  </tr>
</table>

## Exemples

Ce widget affiche le nom du lendemain en français.

```html
<script type="application/yaml">
  module:
    url: "https://cdn.jsdelivr.net/gh/regseb/gout@0/src/module/single/single.js"
    scrapers:
      - url: "https://cdn.jsdelivr.net/gh/regseb/gout@0/src/scraper/examples/days/days.js"
</script>
```

Ce widget affiche les noms des trois prochains jours (sauf le dimanche) en
anglais.

```html
<script type="application/yaml">
  module:
    url: "https://cdn.jsdelivr.net/gh/regseb/gout@0/src/module/list/list.js"
    options:
      max: 3
    scrapers:
      - url": "https://cdn.jsdelivr.net/gh/regseb/gout@0/src/scraper/examples/days/days.js"
        options:
          lang: "en",
          filter: "title != 'Sunday'"
</script>
```
