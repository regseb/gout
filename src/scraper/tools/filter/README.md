# Scraper _tools/filter_

> Mots-clés : gout, gout-scraper, gout-scraper-tools-filter.

Ce scraper filtre les résultats d'un autre scraper. Il est rare d'utiliser ce
scraper directement dans un widget. Il peut être utiliser pour ajouer la
fonctionnalité dans un scraper :

```JavaScript
import chain from "https://cdn.jsdelivr.net/gh/regseb/gout-regseb@0/src/utils/scraper/chain.js";
import FilterScraper from "https://cdn.jsdelivr.net/gh/regseb/gout-regseb@0/src/scraper/tools/filter/filter.js";

const MyAwesomeScraper = class { /* ... */ };

export default chain(FilterScraper, MyAwesomeScraper, {
    dispatch: ({ filter, ...others }) => [{ filter }, others],
});
```

## Options

Les options sont dans un objet
[JSON](https://www.json.org/json-fr.html "JavaScript Object Notation") avec la
propriété suivante :

<table>
  <tr>
    <th>Nom</th>
    <th>Type</th>
    <th>Description</th>
  </tr>
  <tr>
    <td><code>"filter"</code></td>
    <td><code>string</code></td>
    <td>
      <p>
        Le filtre qui sera appliqué sur les éléments retournées. Par défaut
        aucun filtre n'est appliqué.
      </p>
      <p>
        Exemple : <code>"title != 'foo'"</code>.
      </p>
    </td>
  </tr>
</table>

## Filtre

Les filtres sont composés de trois éléments :

- la propriété récupérée dans un élément des résultats ;
- le type de comparaison :
  - générique :
    - `==`, `!=`, `<`, `<=`, `>`, `>=` ;
  - chaine de caractères :
    - `*=` : garder les éléments dont la propriété contient la valeur
      (`.includes()` sous le capot) ;
    - `^=` : garder les éléments dont la propriété commence par la valeur
      (`.startsWith()` sous le capot) ;
    - `^=` : garder les éléments dont la propriété finit par la valeur
      (`.endsWith()` sous le capot) ;
- la valeur comparée :
  - un nombre : `42` ;
  - une chaine de caractères (entourée par des apostrophes) : `'foo'`.

## Example

Ce widget affiche les dernières reportages de la chaine YouTube de
[Arte](https://www.youtube.com/@arte). L'option `"filter"` est passée au scraper
`list/rss` car ce scraper utilise `FilterScraper`.

```JSON
{
    "module": {
        "url": "https://cdn.jsdelivr.net/gh/regseb/gout@0/src/module/list/list.js",
        "options": {
            "color": "#757575",
            "cron": "*/10 * * * *",
            "max": 5
        }
    },
    "scrapers": [{
        "url": "https://cdn.jsdelivr.net/gh/regseb/gout@0/src/scraper/list/rss/rss.js",
        "options": {
            "url": "https://www.youtube.com/feeds/videos.xml?user=arte"
            "filter": "title $= 'ARTE Reportage'",
        }
    }]
}
```
