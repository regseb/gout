# Scraper _list/jsonfeed_

> Mots-clés :
> [_gout_](https://github.com/search?q=_gout_+language%3AMarkdown&type=Code&l=Markdown),
> [_gout-scraper_](https://github.com/search?q=_gout-scraper_+language%3AMarkdown&type=Code&l=Markdown),
> [_gout-scraper-list-jsonfeed_](https://github.com/search?q=_gout-scraper-list-jsonfeed_+language%3AMarkdown&type=Code&l=Markdown),
> [_gout-module-list_](https://github.com/search?q=_gout-module-list_+language%3AMarkdown&type=Code&l=Markdown).

Ce scraper récupère la liste des derniers éléments d'un flux
[**JSON Feed**](https://jsonfeed.org/).

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
    <td><code>url</code></td>
    <td><code>string</code></td>
    <td>
      <p>
        L'URL vers un JSON Feed.
      </p>
      <p>
        Exemple : <code>https://example.com/foo/bar.json</code>
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
        Exemple : <code>icon: https://example.com/foo/bar.svg</code>
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
        Exemple : <code>"title != 'foo'"</code>
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
        Exemple : <code>title: "title.replace('podcast', '')"</code>
      </p>
    </td>
  </tr>
</table>

## Exemple

Ce widget affiche les cinq dernières actualités scientifiques du site
[Refind](https://refind.com/).

```html
<script type="application/yaml">
  module:
    url: https://cdn.jsdelivr.net/gh/regseb/gout@0/src/module/list/list.js
    options:
      cron: "*/10 * * * *"
      max: 5
      color: "#2196f3"
    scrapers:
      - url: https://cdn.jsdelivr.net/gh/regseb/gout@0/src/scraper/list/jsonfeed/jsonfeed.js
        options:
          url: https://refind.com/science.json
</script>
```
