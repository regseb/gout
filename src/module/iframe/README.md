# Module _iframe_

> Mots-clés : gout, gout-module, gout-module-iframe.

Ce module affiche un `iframe`.

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
    <td><code>"cron"</code></td>
    <td><code>string</code><br /><code>string[]</code></td>
    <td>
      <p>
        La ou les
        <a href="https://www.npmjs.com/package/cronnor#expression-cron">expressions
        <em>cron</em></a> indiquant la fréquence de mise à jour. Sans cette
        propriété, l'`iframe` n'est jamais rechargé.
      </p>
      <p>
        Exemple : <code>"@daily"</code>.
      </p>
    </td>
  </tr>
  <tr>
    <td><code>"empty"</code></td>
    <td><code>object</code></td>
    <td>
      <p>
        Les données affichées quand les scrapers n'ont retourné aucune donnée.
        Ce doit être un objet avec les mêmes propriétés qu'un élément retourné
        par les scrapers. Si cette propriété n'est pas renseignée, le module est
        laissé vide.
      </p>
      <p>
        Exemple : <code>{ "title": "(aucun élément)" }</code>.
      </p>
    </td>
  </tr>
  <tr>
    <td><code>"height"</code></td>
    <td><code>number</code></td>
    <td>
      <p>
        La hauteur en pixel de l'<code>iframe</code>. Par défaut, la hauteur est
        fixée à <code>150</code>.
      </p>
      <p>
        Exemple : <code>200</code>.
      </p>
    </td>
  </tr>
</table>

## Scrapers

Les scrapers associés à ce module doivent définir une méthode `extract()` qui
prend en paramètre un entier indiquant le nombre maximum d'éléments à retourner
(pour ce module la valeur passée sera toujours `1`). La méthode doit retourner
une
[promesse](https://developer.mozilla.org/Web/JavaScript/Reference/Global_Objects/Promise)
contenant un tableau dont chaque élément est un objet ayant les propriétés
suivantes :

<table>
  <tr>
    <th>Nom</th>
    <th>Type</th>
    <th>Description</th>
  </tr>
  <tr>
    <td><code>"date"</code></td>
    <td><code>number</code></td>
    <td>
      <p>
        Le nombre de millisecondes depuis le 1er janvier 1970 à 00:00:00 UTC
        (cf.
        <a href="https://developer.mozilla.org/JavaScript/Reference/Global_Objects/Date/getTime"><code>Date.prototype.getTime()</code></a>).
        Cette valeur est utilisée pour trier les éléments du plus récent au plus
        ancien. Par défaut, le nombre <code>0</code> est utilisé.
      </p>
      <p>
        Exemple : <code>900277200000</code>.
      </p>
    </td>
  </tr>
  <tr>
    <td><code>"link"</code></td>
    <td><code>string</code></td>
    <td>
      <p>
        Le lien de la page Internet qui sera affiché dans l'<code>iframe</code>.
      </p>
      <p>
        Exemple : <code>"https://example.com/foo/bar.html"</code>.
      </p>
    </td>
  </tr>
</table>

## Exemple

Ce widget affiche [Wikipédia](https://fr.wikipedia.org/) dans un `iframe`.

```JSON
{
    "module": {
        "url": "https://cdn.jsdelivr.net/gh/regseb/gout@0/src/module/iframe/iframe.js"
    },
    "scrapers": [{
        "url": "https://cdn.jsdelivr.net/gh/regseb/gout@0/src/scraper/repeater/repeater.js",
        "config": {
            "extract": [{
                "link": "https://fr.wikipedia.org/wiki/Wikipédia:Accueil_principal"
            }]
        }
    }]
}
```
