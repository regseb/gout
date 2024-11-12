# Module _tools/findrss_

> Mots-clés :
> [_gout_](https://github.com/search?q=_gout_+language%3AMarkdown&type=Code&l=Markdown),
> [_gout-module_](https://github.com/search?q=_gout-module_+language%3AMarkdown&type=Code&l=Markdown),
> [_gout-module-tools-findrss_](https://github.com/search?q=_gout-module-tools-findrss_+language%3AMarkdown&type=Code&l=Markdown).

Ce module cherche les liens RSS / Atom dans une page Web.

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
    <td><code>color</code></td>
    <td><code>string</code></td>
    <td>
      <p>
        La
        <a href="https://developer.mozilla.org/CSS/color_value">couleur</a> de
        fond du cadre. Par défaut la couleur grise (<code>"#757575"</code>) est
        utilisée.
      </p>
      <p>
        Exemples : <code>"#673ab7"</code>, <code>"chocolate"</code>
      </p>
    </td>
  </tr>
  <tr>
    <td><code>icon</code></td>
    <td><code>string</code></td>
    <td>
      <p>
        L'URL de l'icône qui sera affichée en fond. Pour avoir une harmonie avec
        les autres widgets, il est conseillé d'utiliser une image carrée avec un
        dessin occupant toute l'image. Si le dessin n'est pas carré, il faut le
        centrer. Seule la couleur noire doit être utilisée et elle doit avoir
        une opacité de <code>0.2</code>. Par défaut, aucune icône n'est
        affichée.
      </p>
      <p>
        Exemple : <code>"https://example.com/foo/bar.svg"</code>
      </p>
    </td>
  </tr>
  <tr>
    <td><code>max</code></td>
    <td><code>number</code></td>
    <td>
      <p>
        Le nombre maximum de flux RSS affichés dans le module. Sans maximum,
        tous les flux extraits sont affichés.
      </p>
      <p>
        Exemple : <code>5</code>
      </p>
    </td>
  </tr>
</table>

## Scrapers

Ce module n'utilise pas de scraper.

## Exemple

Ce widget affiche un bloc avec un champ. En renseignant une URL dans ce champ,
la liste des flux RSS est affichée en dessous.

```html
<script type="application/yaml">
  module:
    url: "https://cdn.jsdelivr.net/gh/regseb/gout@0/src/module/tools/findrss/findrss.js"
</script>
```
