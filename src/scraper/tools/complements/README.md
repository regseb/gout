# Scraper _tools/complements_

> Mots-clés : gout, gout-scraper, gout-scraper-tools-complements.

Ce scraper ajoute des propriétés dans les résultats d'un autre scraper. Il est
rare d'utiliser ce scraper directement dans un widget. Il peut être utilisé pour
ajouter la fonctionnalité dans un autre scraper :

```javascript
import chain from "https://cdn.jsdelivr.net/gh/regseb/gout@0/src/utils/scraper/chain.js";
import ComplementsScraper from "https://cdn.jsdelivr.net/gh/regseb/gout@0/src/scraper/tools/complements/complements.js";

const MyAwesomeScraper = class {
  /* ... */
};

export default chain(ComplementsScraper, MyAwesomeScraper, {
  dispatch: ({ complements, ...others }) => [{ complements }, others],
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
    <td><code>complements</code></td>
    <td><code>object</code></td>
    <td>
      <p>
        Des propriétés qui seront ajoutées dans les éléments retournés. Par
        défaut aucune propriété n'est ajoutée.
      </p>
      <p>
        Exemple : <code>icon: "https://example.com/foo/bar.svg"</code>
      </p>
    </td>
  </tr>
</table>

## Scrapers

Ce scraper accepte un seul sous-scraper. Le sous-scraper doit définir une
méthode `extract()` qui prend en paramètre un entier indiquant le nombre maximum
d'éléments à retourner. La méthode doit retourner une
[promesse](https://developer.mozilla.org/Web/JavaScript/Reference/Global_Objects/Promise)
contenant un tableau d'objet. Les propriétés seront ajoutées dans chaque élément
du tableau.

## Exemple

Ce widget affiche les dernières vidéos de la chaine YouTube de
[Arte](https://www.youtube.com/@arte) en ajoutant le logo de Arte à chaque
élément. L'option `complements` est passée au scraper
[_list/rss_](https://github.com/regseb/gout/tree/HEAD/src/scraper/list/rss#readme)
car ce scraper utilise _tools/complements_.

```html
<script type="application/yaml">
  module:
    url: "https://cdn.jsdelivr.net/gh/regseb/gout@0/src/module/list/list.js"
    options:
      cron: "@hourly"
      max: 5
      color: "#e23014"
    scrapers:
      - url: "https://cdn.jsdelivr.net/gh/regseb/gout@0/src/scraper/list/rss/rss.js"
        options:
          url: "https://www.youtube.com/feeds/videos.xml?user=arte"
          complements:
            icon: "https://cdn.jsdelivr.net/gh/regseb/gout-regseb@0/src/widget/arte/arte_white.svg"
</script>
```
