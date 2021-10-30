# Scraper _list/jsonfeed_

> Mots-clés : gout, gout-scraper, gout-scraper-list-jsonfeed, gout-module-list,
> gout-module-single.

Ce scraper récupère la liste des dernières éléments d'un flux [**JSON
Feed**](https://jsonfeed.org/).

Il peut être utilisé avec les modules :

- [_list_](https://github.com/regseb/gout/tree/HEAD/src/module/list#readme) ;
- [_single_](https://github.com/regseb/gout/tree/HEAD/src/module/single#readme)
  pour afficher seulement le dernier élément.

## Configuration

La configuration contient un objet
[JSON](https://www.json.org/json-fr.html "JavaScript Object Notation") avec les
propriétés suivantes :

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
        L'URL vers un JSON Feed.
      </p>
      <p>
        Exemple : <code>"https://example.com/foo/bar.json"</code>.
      </p>
    </td>
  </tr>
  <tr>
    <td><code>"complements"</code></td>
    <td><code>object</code></td>
    <td>
      <p>
        Des propriétés qui seront ajoutées dans les éléments retournés. Par
        défaut aucune propriété est ajoutée.
      </p>
      <p>
        Exemple : <code>{ "icon": "https://example.com/foo/bar.svg" }</code>.
      </p>
    </td>
  </tr>
</table>

## Exemple

Ce widget affiche les cinq dernières actualités scientifiques du site
[Refind](https://refind.com/).

```JSON
{
    "module": {
        "url": "https://cdn.jsdelivr.net/gh/regseb/gout@0/src/module/list/list.js",
        "config": {
            "color": "#2196f3",
            "cron": "*/10 * * * *",
            "max": 5
        }
    },
    "scrapers": [{
        "url": "https://cdn.jsdelivr.net/gh/regseb/gout@0/src/scraper/list/jsonfeed/jsonfeed.js",
        "config": {
            "url": "https://refind.com/science.json"
        }
    }]
}
```
