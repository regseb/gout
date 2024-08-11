# Scraper _tools/filter_

> Mots-clés : gout, gout-scraper, gout-scraper-tools-filter.

Ce scraper filtre les résultats d'un autre scraper. Il est rare d'utiliser ce
scraper directement dans un widget. Il peut être utilisé pour ajouter la
fonctionnalité dans un autre scraper :

```javascript
import chain from "https://cdn.jsdelivr.net/gh/regseb/gout@0/src/utils/scraper/chain.js";
import FilterScraper from "https://cdn.jsdelivr.net/gh/regseb/gout@0/src/scraper/tools/filter/filter.js";

const MyAwesomeScraper = class {
  /* ... */
};

export default chain(FilterScraper, MyAwesomeScraper, {
  dispatch: ({ filter, ...others }) => [{ filter }, others],
});
```

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
    <td><code>filter</code></td>
    <td><code>string</code></td>
    <td>
      <p>
        Le filtre qui sera appliqué sur les éléments retournés. Par défaut aucun
        filtre n'est appliqué.
      </p>
      <p>
        Exemple : <code>"title != 'foo'"</code>
      </p>
    </td>
  </tr>
</table>

### Filtre

Les filtres sont composés de trois éléments :

- la propriété récupérée dans un élément des résultats ;
- le type de comparaison :
  - générique :
    - [`==`](https://developer.mozilla.org/Web/JavaScript/Reference/Operators/Strict_equality),
      [`!=`](https://developer.mozilla.org/Web/JavaScript/Reference/Operators/Strict_inequality),
      [`<`](https://developer.mozilla.org/Web/JavaScript/Reference/Operators/Less_than),
      [`<=`](https://developer.mozilla.org/Web/JavaScript/Reference/Operators/Less_than_or_equal),
      [`>`](https://developer.mozilla.org/Web/JavaScript/Reference/Operators/Greater_than),
      [`>=`](https://developer.mozilla.org/Web/JavaScript/Reference/Operators/Greater_than_or_equal)
      ;
  - chaine de caractères :
    - `*=` : garder les éléments dont la propriété contient la valeur
      ([`.includes()`](https://developer.mozilla.org/Web/JavaScript/Reference/Global_Objects/String/includes)
      sous le capot) ;
    - `^=` : garder les éléments dont la propriété commence par la valeur
      ([`.startsWith()`](https://developer.mozilla.org/Web/JavaScript/Reference/Global_Objects/String/startsWith)
      sous le capot) ;
    - `$=` : garder les éléments dont la propriété finit par la valeur
      ([`.endsWith()`](https://developer.mozilla.org/Web/JavaScript/Reference/Global_Objects/String/endsWith)
      sous le capot) ;
- la valeur comparée :
  - un nombre : `42` ;
  - une chaine de caractères (entourée par des apostrophes) : `'foo'`.

## Scrapers

Ce scraper accepte un seul sous-scraper. Le sous-scraper doit définir une
méthode `extract()` qui prend en paramètre un entier indiquant le nombre maximum
d'éléments à retourner. La méthode doit retourner une
[promesse](https://developer.mozilla.org/Web/JavaScript/Reference/Global_Objects/Promise)
contenant un tableau d'objet. Le filtre sera appliqué sur chaque élément du
tableau.

## Exemple

Ce widget affiche les derniers reportages de la chaine YouTube de
[Arte](https://www.youtube.com/@arte). L'option `filter` est passée au scraper
[_list/rss_](https://github.com/regseb/gout/tree/HEAD/src/scraper/list/rss#readme)
car ce scraper utilise _tools/filter_.

```html
<script type="application/yaml">
  module:
    url: "https://cdn.jsdelivr.net/gh/regseb/gout@0/src/module/list/list.js"
    options:
      cron: "*/10 * * * *"
      max: 5
      color: "#757575"
    scrapers:
      - url: "https://cdn.jsdelivr.net/gh/regseb/gout@0/src/scraper/list/rss/rss.js"
        options:
          url: "https://www.youtube.com/feeds/videos.xml?user=arte"
          filter: "title $= 'ARTE Reportage'"
</script>
```
