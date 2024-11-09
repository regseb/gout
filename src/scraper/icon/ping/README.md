# Scraper _icon/ping_

> Mots-clés : gout, gout-scraper, gout-scraper-icon-ping, gout-module-icon.

Ce scraper vérifie si un serveur est toujours accessible.

Il peut être utilisé avec le module [_icon_](../../../module/icon#readme).

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
        L'URL du serveur qui sera testé.
      </p>
      <p>
        Exemple : <code>"https://example.com/"</code>
      </p>
    </td>
  </tr>
  <tr>
    <td><code>colors</code></td>
    <td><code>object</code></td>
    <td>
      <p>
        Les couleurs retournées en fonction du
        <a href="https://developer.mozilla.org/Web/HTTP/Status">statut HTTP</a>
        reçu du serveur. Voici les couleurs par défaut :
      </p>
      <ul>
        <li><code>1xx</code> : bleu ;</li>
        <li><code>2xx</code> : vert ;</li>
        <li><code>3xx</code> : orange ;</li>
        <li><code>4xx</code> : rouge ;</li>
        <li><code>5xx</code> : violet ;</li>
        <li>autre : gris.</li>
      </ul>
      <p>
        Exemple : <pre><code>
1xx: blue
200: green
2xx: darkgreen
xxx: gray
        </code></pre>
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
        Exemple : <code>target: "_top"</code>
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
        Exemple : <code>"color != 'green'"</code>
      </p>
    </td>
  </tr>
</table>

## Exemple

Ce widget teste le site _localhost_ toutes les heures.

```html
<script type="application/yaml">
  module:
    url: "https://cdn.jsdelivr.net/gh/regseb/gout@0/src/module/icon/icon.js"
    options:
      cron: "@hourly"
    scrapers:
      - url: "https://cdn.jsdelivr.net/gh/regseb/gout@0/src/scraper/icon/ping/ping.js"
        options:
          url: "http://localhost"
</script>
```
