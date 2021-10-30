# Scraper _icon/ping_

> Mots-clés : gout, gout-scraper, gout-scraper-icon-ping, gout-module-icon.

Ce scraper vérifie si un serveur est toujours accessible.

Il peut être utilisé avec le module
[_icon_](https://github.com/regseb/gout/tree/HEAD/src/module/icon#readme).

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
        L'URL du serveur qui sera testé.
      </p>
      <p>
        Exemple : <code>"https://example.com/"</code>.
      </p>
    </td>
  </tr>
  <tr>
    <td><code>"colors"</code></td>
    <td><code>object</code></td>
    <td>
      <p>
        Les couleurs retournées en fonction du [statut
        HTTP](https://developer.mozilla.org/fr/docs/Web/HTTP/Status) reçu du
        serveur. Voici les couleurs par défaut :
      </p>
      <ul>
        <li><em>1XX</em> : bleu ;</li>
        <li><em>2XX</em> : vert ;</li>
        <li><em>3XX</em> : orange ;</li>
        <li><em>4XX</em> : rouge ;</li>
        <li><em>5XX</em> : violet ;</li>
        <li>autre : gris.</li>
      </ul>
      <p>
        Exemple :
        <code>{ 1: "blue", 200: "green", 2: "darkgreen", 0: "gray" }</code>.
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
        Exemple : <code>{ "target": "_top" }</code>.
      </p>
    </td>
  </tr>
</table>

## Exemple

Ce widget teste le site _localhost_ toutes les heures.

```JSON
{
    "module": {
        "url": "https://cdn.jsdelivr.net/gh/regseb/gout@0/src/module/icon/icon.js",
        "config": {
            "cron": "@hourly"
        }
    },
    "scrapers": [{
        "url": "https://cdn.jsdelivr.net/gh/regseb/gout@0/src/scraper/icon/ping/ping.js",
        "config": {
            "url": "http://localhost"
        }
    }]
}
```
