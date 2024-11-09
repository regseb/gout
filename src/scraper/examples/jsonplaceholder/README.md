# Scraper _examples/jsonplaceholder_

> Mots-clés : gout, gout-scraper, gout-scraper-examples-jsonplaceholder.

Ce scraper d'exemple appelle l'API
**[JSONPlaceholder](https://jsonplaceholder.typicode.com/)** et retourne les
photos d'un album. L'identifiant de l'album est à renseigner dans les options du
scraper.

Il peut être utilisé avec les modules :

- [_image_](../../../module/image#readme) ;
- [_single_](../../../module/single#readme) pour afficher seulement le nom de la
  dernière image (avec un lien vers l'image) ;
- [_list_](../../../module/list#readme) pour afficher seulement le nom des
  images (avec un lien pour voir chaque image).

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
    <td><code>album</code></td>
    <td><code>number</code></td>
    <td>
      <p>
        L'identifiant de l'album. Un nombre en <code>1</code> et
        <code>100</code>.
      </p>
      <p>
        Exemple : <code>42</code>
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
        Exemple : <code>icon: "https://example.com/foo/bar.svg"</code>
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
        Exemple : <code>"title != 'foo'"</code>
      </p>
    </td>
  </tr>
</table>

## Exemple

Ce widget affiche 5 images de l'album ayant l'identifiant `13`.

```html
<script type="application/yaml">
  module:
    url: "https://cdn.jsdelivr.net/gh/regseb/gout@0/src/module/image/image.js"
    options:
      max: 5
    scrapers:
      - url: "https://cdn.jsdelivr.net/gh/regseb/gout@0/src/scraper/examples/jsonplaceholder/jsonplaceholder.js"
        options:
          album: 13
</script>
```
