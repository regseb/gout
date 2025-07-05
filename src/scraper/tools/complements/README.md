# Scraper _tools/complements_

> Mots-clés :
> [_gout_](https://github.com/search?q=_gout_+language%3AMarkdown&type=Code&l=Markdown),
> [_gout-scraper_](https://github.com/search?q=_gout-scraper_+language%3AMarkdown&type=Code&l=Markdown),
> [_gout-scraper-tools-complements_](https://github.com/search?q=_gout-scraper-tools-complements_+language%3AMarkdown&type=Code&l=Markdown).

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

<!-- markdownlint-disable no-inline-html-->
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
        Exemple : <code>icon: https://example.com/foo/bar.svg</code>
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

Ce widget affiche les dernièrs articles des sites [Slate](https://www.slate.fr/)
et [korii](https://korii.slate.fr/) en ajoutant les logos des icônes à chaque
élément. L'option `complements` est passée aux scrapers
[_list/rss_](../../list/rss#readme) car ce scraper utilise _tools/complements_.

```html
<script type="application/yaml">
  module:
    url: https://cdn.jsdelivr.net/gh/regseb/gout@0/src/module/list/list.js
    options:
      cron: "@hourly"
      max: 4
      color: "#b95270"
    scrapers:
      - url: https://cdn.jsdelivr.net/gh/regseb/gout@0/src/scraper/list/rss/rss.js
        options:
          url: https://www.slate.fr/rss.xml
          complements:
            icon: https://cdn.jsdelivr.net/gh/regseb/gout-regseb@0/src/widget/slate/slate_fff.svg
      - url: https://cdn.jsdelivr.net/gh/regseb/gout@0/src/scraper/list/rss/rss.js
        options:
          url: https://korii.slate.fr/rss.xml
          complements:
            icon: https://cdn.jsdelivr.net/gh/regseb/gout-regseb@0/src/widget/slate/korii_fff.svg
</script>
```
