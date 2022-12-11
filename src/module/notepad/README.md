# Module _notepad_

> Mots-clés : gout, gout-module, gout-module-notepad.

Ce module affiche un bloc-notes.

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
    <td><code>"color"</code></td>
    <td><code>string</code></td>
    <td>
      <p>
        La
        <a href="https://developer.mozilla.org/CSS/color_value">couleur</a> de
        fond du cadre. Par défaut la couleur grise (<code>"#757575"</code>) est
        utilisée.
      </p>
      <p>
        Exemples : <code>"#673ab7"</code>, <code>"chocolate"</code>.
      </p>
    </td>
  </tr>
  <tr>
    <td><code>"icon"</code></td>
    <td><code>string</code></td>
    <td>
      <p>
        L'URL de l'icône qui sera affichée en fond. Il est conseillé que l'image
        soit carrée et que le dessin occupe toute la zone de l'image. Si le
        dessin n'est pas carré, il faut le centrer verticalement et l'aligner à
        droite. Seule la couleur noire doit être utilisée et elle doit avoir une
        opacité de <code>0.2</code>. Par défaut, aucune icône n'est affichée.
      </p>
      <p>
        Exemple : <code>"https://example.com/foo/bar.svg"</code>.
      </p>
    </td>
  </tr>
  <tr>
    <td><code>"desc"</code></td>
    <td><code>string</code></td>
    <td>
      <p>
        La description du bloc-notes affichée dans l'info-bulle. Par défaut,
        aucune info-bulle n'est affichée.
      </p>
      <p>
        Exemple : <code>"Ce top10 des choses incroyables est incroyable"</code>.
      </p>
    </td>
  </tr>
  <tr>
    <td><code>"guid"</code></td>
    <td><code>string</code></td>
    <td>
      <p>
        Un identifiant de l'élément (<em>globally unique identifier</em>) qui
        sera utilisé pour savoir s'il faut mettre à jour un élément ou en
        insérer un nouveau. Par défaut, il est calculé à partir des autres
        propriétés.
      </p>
      <p>
        Exemple : <code>"example.com:12345"</code>.
      </p>
    </td>
  </tr>
  <tr>
    <td><code>"title"</code></td>
    <td><code>string</code></td>
    <td>
      <p>
        L'indication affichée dans le bloc-notes quand celui-ci est vide.
      </p>
      <p>
        Exemple : <code>"La 7e va vous étonner"</code>.
      </p>
    </td>
  </tr>
</table>

## Scrapers

Ce module n'utilise pas de scraper.

## Exemple

Ce widget affiche un bloc-notes pour une liste de courses.

```JSON
{
    "module": {
        "url": "https://cdn.jsdelivr.net/gh/regseb/gout@0/src/module/notepad/notepad.js",
        "config": {
            "color": "#607d8b",
            "desc": "Liste de courses",
            "title": "..."
        }
    }
}
```
