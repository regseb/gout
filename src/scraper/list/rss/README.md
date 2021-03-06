# Scraper *list/rss*

> Mots-clés : gout, gout-scraper, gout-scraper-list-rss, gout-module-list,
> gout-module-single, gout-module-podcast, gout-module-image.

Ce scraper récupère les derniers éléments d'un flux **RSS** / **Atom**.

Il peut être utilisé avec les modules :

- [*list*](https://github.com/regseb/gout/tree/master/src/module/list#readme) ;
- [*single*](https://github.com/regseb/gout/tree/master/src/module/single#readme)
  pour afficher seulement la dernier élément ;
- [*podcast*](https://github.com/regseb/gout/tree/master/src/module/podcast#readme)
  pour un flux avec des `enclosure` de type `audio` ;
- [*image*](https://github.com/regseb/gout/tree/master/src/module/image#readme)
  pour un flux avec des `enclosure` de type `image`.
.

## Configuration

La configuration doit avoir les propriétés suivantes :

<table>
  <tr>
    <th>Nom</th>
    <th>Type</th>
    <th>Description</th>
  </tr>
  <tr>
    <td><code>"url"</code></td>
    <td><code>string</code></td>
    <td>
      <p>
        L'URL vers un flux RSS.
      </p>
      <p>
        Example : <code>"https://example.com/foo/bar.rss"</code>.
      </p>
    </td>
  </tr>
  <tr>
    <td><code>"complements"</code></td>
    <td><code>object</code></td>
    <td>
      <p>
        Des propriétés qui seront ajoutées dans les éléments retournés.
      </p>
      <p>
        Example : <code>{ "icon": "https://example.com/foo/bar.svg" }</code>.
      </p>
    </td>
  </tr>
</table>

## Exemple

Cet exemple affiche les cinq dernières actualités du site
[Le Monde.fr](https://www.lemonde.fr/).

```JSON
{
    "module": {
        "url": "https://cdn.jsdelivr.net/gh/regseb/gout@0/src/module/list/list.js",
        "config": {
            "color": "#9e9e9e",
            "cron": "*/10 * * * *",
            "max": 5
        }
    },
    "scrapers": [{
        "url": "https://cdn.jsdelivr.net/gh/regseb/gout@0/src/scraper/list/rss/rss.js",
        "config": {
            "url": "https://www.lemonde.fr/rss/une.xml"
        }
    }]
}
```
