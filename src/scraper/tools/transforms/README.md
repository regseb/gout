# Scraper _tools/transforms_

> Mots-clés :
> [_gout_](https://github.com/search?q=_gout_+language%3AMarkdown&type=Code&l=Markdown),
> [_gout-scraper_](https://github.com/search?q=_gout-scraper_+language%3AMarkdown&type=Code&l=Markdown),
> [_gout-scraper-tools-transforms_](https://github.com/search?q=_gout-scraper-tools-transforms_+language%3AMarkdown&type=Code&l=Markdown).

Ce scraper transforme les résultats d'un autre scraper. Il est rare d'utiliser
ce scraper directement dans un widget. Il peut être utilisé pour ajouter la
fonctionnalité dans un autre scraper :

```javascript
import chain from "https://cdn.jsdelivr.net/gh/regseb/gout@0/src/utils/scraper/chain.js";
import TransformsScraper from "https://cdn.jsdelivr.net/gh/regseb/gout@0/src/scraper/tools/transforms/transforms.js";

const MyAwesomeScraper = class {
  /* ... */
};

export default chain(TransformsScraper, MyAwesomeScraper, {
  dispatch: ({ transforms, ...others }) => [{ transforms }, others],
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
    <td><code>transforms</code></td>
    <td><code>object</code></td>
    <td>
      <p>
        Les transformations appliquées sur les éléments retournés. Par défaut
        aucune transformation n'est appliquée.
      </p>
      <p>
        Exemple : <code>title: "title.replace('podcast', '')"</code>
      </p>
    </td>
  </tr>
</table>

### Transformations

Les transformations sont un objet dont les clés indiquent la propriété à
modifier et les valeurs sont le code à exécuter.

Par exemple, pour enlever le mot _podcast_ des propriétés `title` et mettre les
valeurs des propriétés `desc` en minuscule (sauf la première lettre) :

```yaml
transforms:
  title: "title.replace('podcast', '')"
  desc: "desc[0].toUpperCase() + desc.slice(1).toLowerCase()"
```

Si votre transformation est complexe, vous pouvez utiliser des accolades pour
votre code.

```yaml
transforms:
  title: "{
    const response = await fetch(`https://example.com/api/${title}`);
    const json = await response.json();
    return json.data.title;
  }"
```

## Scrapers

Ce scraper accepte un seul sous-scraper. Le sous-scraper doit définir une
méthode `extract()` qui prend en paramètre un entier indiquant le nombre maximum
d'éléments à retourner. La méthode doit retourner une
[promesse](https://developer.mozilla.org/Web/JavaScript/Reference/Global_Objects/Promise)
contenant un tableau d'objet. Les transformations seront appliquées sur chaque
élément du tableau.

## Exemple

Ce widget affiche les derniers reportages de la chaine YouTube de
[Arte](https://www.youtube.com/@arte). L'option `transforms` est passée au
scraper [_list/rss_](../../list/rss#readme) car ce scraper utilise
_tools/transforms_. La transformation enlève le suffixe `"ARTE Reportage"` du
titre de chaque vidéo.

```html
<script type="application/yaml">
  module:
    url: https://cdn.jsdelivr.net/gh/regseb/gout@0/src/module/list/list.js
    options:
      cron: "*/10 * * * *"
      max: 5
      color: "#757575"
    scrapers:
      - url: https://cdn.jsdelivr.net/gh/regseb/gout@0/src/scraper/list/rss/rss.js
        options:
          url: https://www.youtube.com/feeds/videos.xml?user=arte
          filter: "title $= 'ARTE Reportage'"
          transforms:
            title: "title.replace(/ARTE Reportage$/, '')"
</script>
```
