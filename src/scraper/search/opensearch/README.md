# Scraper _search/opensearch_

> Mots-clés : gout, gout-scraper, gout-scraper-search-opensearch,
> gout-module-search.

Ce scraper extrait les données au format
[**OpenSearch**](https://github.com/dewitt/opensearch) d'un moteur de recherche.

Il peut être utilisé avec le module [_search_](../../../module/search#readme).

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
    <td><code>url</code></td>
    <td><code>string</code></td>
    <td>
      <p>
        L'URL du moteur de recherche avec la balise <code>{searchTerms}</code>
        qui sera remplacée par les termes recherchés.
      </p>
      <p>
        Exemple : <code>"https://example.com/foo.html?q={searchTerms}"</code>
      </p>
    </td>
  </tr>
  <tr>
    <td><code>suggestions</code></td>
    <td><code>string</code></td>
    <td>
      <p>
        L'URL pour récupérer les suggestions avec la balise
        <code>{searchTerms}</code> qui sera remplacée par les termes recherchés.
        Si cette propriété n'est pas renseignée : aucune suggestion n'est
        remontée.
      </p>
      <p>
        Exemple : <code>"https://example.com/foo.html?q={searchTerms}"</code>
      </p>
    </td>
  </tr>
  <tr>
    <td><code>complements</code></td>
    <td><code>object</code></td>
    <td>
      <p>
        Des propriétés qui seront retournées par la méthode
        <a href="../../../module/search#scrapers"><code>info()</code></a>.
      </p>
      <p>
        Exemple : <pre><code>
title: "Google"
color: "#2196f3"
        </code></pre>
      </p>
    </td>
  </tr>
</table>

## Exemple

Ce widget fourni un champ pour faire une recherche avec
[Google](https://www.google.com/) ou [Bing](https://www.bing.com/).

```html
<script type="application/yaml">
  module:
    url: "https://cdn.jsdelivr.net/gh/regseb/gout@0/src/module/search/search.js"
    scrapers:
      - url: "https://cdn.jsdelivr.net/gh/regseb/gout@0/src/scraper/search/opensearch/opensearch.js"
        options:
          url: "https://www.google.com/search?q={searchTerms}"
          suggestions: "https://www.google.com/complete/search?client=firefox&q={searchTerms}"
          complements:
            title: "Google"
            color: "#2196f3"
      - url: "https://cdn.jsdelivr.net/gh/regseb/gout@0/src/scraper/search/opensearch/opensearch.js"
        options:
          url: "https://www.bing.com/search?q={searchTerms}"
          suggestions: "https://www.bing.com/osjson.aspx?query={searchTerms}"
          complements:
            title: "Bing"
            color: "#ffc107"
</script>
```
