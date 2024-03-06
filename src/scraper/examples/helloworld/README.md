# Scraper _examples/helloworld_

> Mots-clés : gout, gout-scraper, gout-scraper-examples-helloworld.

Ce scraper d'exemple retourne un _Hello world!_. Le mot _world_ est paramétrable
dans les options du scraper.

Il peut être utilisé avec les modules :

- [_single_](https://github.com/regseb/gout/tree/HEAD/src/module/single#readme)
  ;
- [_list_](https://github.com/regseb/gout/tree/HEAD/src/module/list#readme)
  pour afficher un seul élément.

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
    <td><code>"who"</code></td>
    <td><code>string</code></td>
    <td>
      <p>
        Le nom de la personne à saluer. Par défaut, c'est le `"world"`.
      </p>
      <p>
        Exemple : <code>"there"</code>.
      </p>
    </td>
  </tr>
</table>

## Exemples

Ce widget affiche le texte `"Hello world!"`.

```JSON
{
  "module": {
    "url": "https://cdn.jsdelivr.net/gh/regseb/gout@0/src/module/single/single.js"
  },
  "scrapers": [{
    "url": "https://cdn.jsdelivr.net/gh/regseb/gout@0/src/scraper/examples/helloworld/helloworld.js"
  }]
}
```

Ce widget affiche le texte `"Hello Doctor!"`.

```JSON
{
  "module": {
    "url": "https://cdn.jsdelivr.net/gh/regseb/gout@0/src/module/single/single.js"
  },
  "scrapers": [{
    "url": "https://cdn.jsdelivr.net/gh/regseb/gout@0/src/scraper/examples/helloworld/helloworld.js",
    "options": {
      "who": "Doctor"
    }
  }]
}
```
