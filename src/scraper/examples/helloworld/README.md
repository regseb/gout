# Scraper _examples/helloworld_

> Mots-clés :
> [_gout_](https://github.com/search?q=_gout_+language%3AMarkdown&type=Code&l=Markdown),
> [_gout-scraper_](https://github.com/search?q=_gout-scraper_+language%3AMarkdown&type=Code&l=Markdown),
> [_gout-scraper-examples_](https://github.com/search?q=_gout-scraper-examples_+language%3AMarkdown&type=Code&l=Markdown),
> [_gout-scraper-examples-helloworld_](https://github.com/search?q=_gout-scraper-examples-helloworld_+language%3AMarkdown&type=Code&l=Markdown).

Ce scraper d'exemple retourne un _Hello world!_. Le mot _world_ est paramétrable
dans les options du scraper.

Il peut être utilisé avec les modules :

- [_single_](../../../module/single#readme) ;
- [_list_](../../../module/list#readme) pour afficher un seul élément.

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
    <td><code>who</code></td>
    <td><code>string</code></td>
    <td>
      <p>
        Le nom de la personne à saluer. Par défaut, c'est le <code>world</code>.
      </p>
      <p>
        Exemple : <code>there</code>
      </p>
    </td>
  </tr>
</table>

## Exemples

Ce widget affiche le texte _Hello world!_

```html
<script type="application/yaml">
  module:
    url: https://cdn.jsdelivr.net/gh/regseb/gout@0/src/module/single/single.js
    scrapers:
      - url: https://cdn.jsdelivr.net/gh/regseb/gout@0/src/scraper/examples/helloworld/helloworld.js
</script>
```

Ce widget affiche le texte _Hello Doctor!_

```html
<script type="application/yaml">
  module:
    url: https://cdn.jsdelivr.net/gh/regseb/gout@0/src/module/single/single.js
    scrapers:
      - url: https://cdn.jsdelivr.net/gh/regseb/gout@0/src/scraper/examples/helloworld/helloworld.js
        options:
          who: Doctor
</script>
```
