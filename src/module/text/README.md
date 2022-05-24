# Modume _text_

> Mots-clés : gout, gout-module, gout-module-list.

Ce module affiche un cadre avec du texte et dont la couleur de fond est
personnalisable.

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
recevra en paramètre le nombre `1` indiquant le nombre maximum d'éléments à
retourner. La méthode doit retourner une
[promesse](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/Promise)
contenant un tableau dont chaque élément est un objet ayant les propriétés :

<table>
  <tr>
    <th>Nom</th>
    <th>Type</th>
    <th>Description</th>
  </tr>
  <tr>
    <td><code>"align"</code></td>
    <td><code>string</code></td>
    <td>
      <p>
        L'<a href="https://developer.mozilla.org/fr/docs/Web/CSS/text-align">alignement</a>
        du texte. Par défaut, le texte est aligné à gauche.
      </p>
      <p>
        Exemple : <code>"hjustif"</code>.
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
        de fond du cadre. Par défaut la couleur grise (<code>"#757575"</code>)
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
        Cette valeur est utilisée pour garder seulement l'élément le plus
        récent. Par défaut, le nombre <code>0</code> est utilisé.
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
    <td><code>"icon"</code></td>
    <td><code>string</code></td>
    <td>
      <p>
        L'URL de l'icône affichée dans le cadre. Par défaut, aucune icône n'est
        affichée.
      </p>
      <p>
        Exemple : <code>"https://example.com/foo/bar.svg"</code>.
      </p>
    </td>
  </tr>
  <tr>
    <td><code>"title"</code></td>
    <td><code>string</code><br /><code>string[]</code></td>
    <td>
      <p>
        Le texte affiché dans le cadre. Si c'est un tableau, chaque élément sera
        concaténé et affiché dans le cadre.
      </p>
      <p>
        Exemple : <code>"La 7e va vous étonner"</code>.
      </p>
    </td>
  </tr>
</table>

## Exemple

Ce widget affiche le texte _Carpe diem_.

```JSON
{
    "module": {
        "url": "https://cdn.jsdelivr.net/gh/regseb/gout@0/src/module/text/text.js"
    },
    "scrapers": [{
        "url": "https://cdn.jsdelivr.net/gh/regseb/gout@0/src/scraper/repeater/repeater.js",
        "config": {
            "extract": [{
                "title": "Carpe diem"
            }]
        }
    }]
}
```
