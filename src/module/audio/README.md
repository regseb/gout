# Module _audio_

> Mots-clés : gout, gout-module, gout-module-audio.

Ce module permet d'écouter un flux audio.

## Configuration

La configuration est un objet
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
        propriété, les données ne sont jamais mises à jour.
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
</table>

## Scrapers

Les scrapers associés à ce module doivent définir une méthode `extract()` qui
prend en paramètre un entier indiquant le nombre maximum d'éléments à retourner
(pour ce module la valeur passée sera toujours `1`). La méthode doit retourner
une
[promesse](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/Promise)
contenant un tableau dont chaque élément est un objet ayant les propriétés :

<table>
  <tr>
    <th>Nom</th>
    <th>Type</th>
    <th>Description</th>
  </tr>
  <tr>
    <td><code>"audio"</code></td>
    <td><code>string</code></td>
    <td>
      <p>
        Le lien vers le flux audio. Par défaut, il n'y a pas de flux (mais
        l'icône est affichée).
      </p>
      <p>
        Exemple : <code>"https://example.com/foo/bar.mp3"</code>.
      </p>
    </td>
  </tr>
  <tr>
    <td><code>"color"</code></td>
    <td><code>string</code></td>
    <td>
      <p>
        La
        <a href="https://developer.mozilla.org/fr/docs/Web/CSS/color_value">couleur</a>
        de fond du cadre. Par défaut la couleur grise (<code>"#9e9e9e"</code>)
        est utilisée.
      </p>
      <p>
        Exemples : <code>"#673ab7"</code>, <code>"chocolate"</code>.
      </p>
    </td>
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
    <td><code>"icon"</code></td>
    <td><code>string</code></td>
    <td>
      <p>
        L'URL de l'icône qui sera affichée en fond. Il est conseillé que l'image
        soit carrée et que le dessin occupe toute la zone de l'image. Si le
        dessin n'est pas carré, il faut le centrer horizontalement et
        verticalement. Seule la couleur blanche doit être utilisée. Par défaut,
        l'image d'une note de musique est affichée.
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
        Le lien quand l'utilisateur clique sur l'icône. Par défaut, il n'y a pas
        de lien.
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
        Le texte affiché dans l'info-bulle. Par défaut, aucune info-bulle n'est
        affichée.
      </p>
      <p>
        Exemple : <code>"La meilleur radio !"</code>.
      </p>
    </td>
  </tr>
</table>

## Exemple

Ce widget affiche un cadre pour écouter la radio [Fip](https://www.fip.fr/).

```JSON
{
    "module": {
        "url": "https://cdn.jsdelivr.net/gh/regseb/gout@0/src/module/audio/audio.js"
    },
    "scrapers": [{
        "url": "https://cdn.jsdelivr.net/gh/regseb/gout@0/src/scraper/repeater/repeater.js",
        "config": {
            "extract": [{
                "audio": "https://direct.fipradio.fr/live/fip-midfi.mp3",
                "color": "#e91e63",
                "link": "https://www.fip.fr/",
                "title": "Fip"
            }]
        }
    }]
}
```
