# Module _list_

> Mots-clés : gout, gout-module, gout-module-list.

Ce module affiche une liste d'éléments avec un lien éventuellement préfixé par
une icône.

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
        <a href="https://developer.mozilla.org/fr/docs/Web/CSS/color_value">couleur</a>
        de fond du cadre. Par défaut la couleur grise (<code>"#757575"</code>)
        est utilisée.
      </p>
      <p>
        Exemples : <code>"#673ab7"</code>, <code>"chocolate"</code>.
      </p>
    </td>
  </tr>
  <tr>
    <td><code>"cron"</code></td>
    <td><code>string</code><br /><code>string[]</code></td>
    <td>
      <p>
        La ou les
        <a href="https://www.npmjs.com/package/cronnor#expression-cron">expressions
        <em>cron</em></a> indiquant la fréquence de mise à jour. Sans cette
        propriété, les données ne sont jamais mises à jour.
      </p>
      <p>
        Exemple : <code>"*/5 * * * *"</code>.
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
    <td><code>"max"</code></td>
    <td><code>number</code></td>
    <td>
      <p>
        Le nombre maximum d'éléments affichés dans le module. Sans maximum, tous
        les éléments retournés par les scrapers sont affichés.
      </p>
      <p>
        Exemple : <code>5</code>.
      </p>
    </td>
  </tr>
</table>

## Scrapers

Les scrapers associés à ce module doivent définir une méthode `extract()` qui
prend en paramètre un entier indiquant le nombre maximum d'éléments à retourner.
La méthode doit retourner une
[promesse](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/Promise)
contenant un tableau dont chaque élément est un objet ayant les propriétés :

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
        <a href="https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/Date/getTime"><code>Date.prototype.getTime()</code></a>).
        Cette valeur est utilisée pour trier les éléments du plus récent au plus
        ancien. Par défaut, le nombre <code>0</code> est utilisé.
      </p>
      <p>
        Exemple : <code>900277200000</code>.
      </p>
    </td>
  </tr>
  <tr>
    <td><code>"desc"</code></td>
    <td><code>string</code></td>
    <td>
      <p>
        La description de l'élément qui sera affichée dans l'info-bulle. Par
        défaut, aucune info-bulle n'est affichée.
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
    <td><code>"icon"</code></td>
    <td><code>string</code></td>
    <td>
      <p>
        L'URL de l'icône qui préfixera le titre. Par défaut, aucune icône n'est
        affichée.
      </p>
      <p>
        Exemple : <code>"https://example.com/foo/bar.svg"</code>.
      </p>
    </td>
  </tr>
  <tr>
    <td><code>"link"</code></td>
    <td><code>string</code></td>
    <td>
      <p>
        Le lien de l'élément. Par défaut, il n'y a pas de lien (mais le titre de
        l'élément est affiché).
      </p>
      <p>
        Exemple : <code>"https://example.com/foo/bar.html"</code>.
      </p>
    </td>
  </tr>
  <tr>
    <td><code>"target"</code></td>
    <td><code>string</code></td>
    <td>
      <p>
        L'emplacement où sera ouvert le lien (cf. l'attribut
        <a href="https://developer.mozilla.org/fr/docs/Web/HTML/Element/a#attr-target"><code>target</code></a>
        des liens HTML). Par défaut, les liens s'ouvrent dans un nouvel onglet.
      </p>
      <p>
        Exemple : <code>"_top"</code>.
      </p>
    </td>
  </tr>
  <tr>
    <td><code>"title"</code></td>
    <td><code>string</code></td>
    <td>
      <p>
        Le texte affiché dans la ligne.
      </p>
      <p>
        Exemple : <code>"La 7e va vous étonner"</code>.
      </p>
    </td>
  </tr>
</table>

## Exemple

Ce widget affiche les cinq dernières actualités du site
[LinuxFr.org](https://linuxfr.org/) avec une mise à jour toutes les dix minutes.

```JSON
{
    "module": {
        "url": "https://cdn.jsdelivr.net/gh/regseb/gout@0/src/module/list/list.js",
        "config": {
            "color": "#ffc107",
            "cron": "*/10 * * * *",
            "max": 5
        }
    },
    "scrapers": [{
        "url": "https://cdn.jsdelivr.net/gh/regseb/gout@0/src/scraper/list/rss/rss.js",
        "config": {
            "url": "https://linuxfr.org/news.atom"
        }
    }]
}
```
