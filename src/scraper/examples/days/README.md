# Scraper _examples/days_

> Mots-clés :
> [_gout_](https://github.com/search?q=_gout_+language%3AMarkdown&type=Code&l=Markdown),
> [_gout-scraper_](https://github.com/search?q=_gout-scraper_+language%3AMarkdown&type=Code&l=Markdown),
> [_gout-scraper-examples_](https://github.com/search?q=_gout-scraper-examples_+language%3AMarkdown&type=Code&l=Markdown),
> [_gout-scraper-examples-days_](https://github.com/search?q=_gout-scraper-examples-days_+language%3AMarkdown&type=Code&l=Markdown).

Ce scraper d'exemple retourne les noms des prochains jours de la semaine. La
langue des noms est paramétrable dans les options du scraper.

Il peut être utilisé avec les modules :

- [_list_](../../../module/list#readme) ;
- [_single_](../../../module/single#readme) pour afficher seulement le dernier
  élément.

## Options

Les options sont dans un objet
[YAML](https://yaml.org/ "YAML Ain't Markup Language") avec les propriétés
suivantes :

<!-- markdownlint-disable no-inline-html-->
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
        Le code
        <a href="https://fr.wikipedia.org/wiki/Liste_des_codes_ISO_639-1">ISO 639-1</a>
        de la langue. Par défaut, c'est le français qui est utilisé.
      </p>
      <p>
        Exemple : <code>en</code>
      </p>
    </td>
  </tr>
  <tr>
    <td><code>complements</code></td>
    <td><code>object</code></td>
    <td>
      <p>
        Des propriétés qui seront ajoutées dans les éléments retournés. Par
        défaut aucune propriété n'est ajoutée. Pour plus de détails, voir le
        scraper
        <a href="../../tools/complements#readme"><em>tools/complements</em></a>.
      </p>
      <p>
        Exemple : <code>target: _top</code>
      </p>
    </td>
  </tr>
  <tr>
    <td><code>filter</code></td>
    <td><code>string</code></td>
    <td>
      <p>
        Le filtre qui sera appliqué sur les éléments retournés. Par défaut aucun
        filtre n'est appliqué. Pour plus de détails, voir le scraper
        <a href="../../tools/filter#readme"><em>tools/filter</em></a>.
      </p>
      <p>
        Exemple : <code>"title != 'Lundi'"</code>
      </p>
    </td>
  </tr>
  <tr>
    <td><code>transforms</code></td>
    <td><code>object</code></td>
    <td>
      <p>
        Les transformations qui seront appliquées sur les éléments retournés.
        Par défaut aucune transformation n'est appliqué. Pour plus de détails,
        voir le scraper
        <a href="../../tools/transforms#readme"><em>tools/transforms</em></a>.
      </p>
      <p>
        Exemple : <code>title: "title.toUpperCase()"</code>
      </p>
    </td>
  </tr>
</table>

## Exemples

Ce widget affiche le nom du lendemain en français.

```html
<script type="application/yaml">
  module:
    url: https://cdn.jsdelivr.net/gh/regseb/gout@0/src/module/single/single.js
    scrapers:
      - url: https://cdn.jsdelivr.net/gh/regseb/gout@0/src/scraper/examples/days/days.js
</script>
```

Ce widget affiche les noms des trois prochains jours (sauf le dimanche) en
anglais.

```html
<script type="application/yaml">
  module:
    url: https://cdn.jsdelivr.net/gh/regseb/gout@0/src/module/list/list.js
    options:
      max: 3
    scrapers:
      - url: https://cdn.jsdelivr.net/gh/regseb/gout@0/src/scraper/examples/days/days.js
        options:
          lang: en
          filter: "title != 'Sunday'"
</script>
```
