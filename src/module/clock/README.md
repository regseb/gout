# Module _clock_

> Mots-clés :
> [_gout_](https://github.com/search?q=_gout_+language%3AMarkdown&type=Code&l=Markdown),
> [_gout-module_](https://github.com/search?q=_gout-module_+language%3AMarkdown&type=Code&l=Markdown),
> [_gout-module-clock_](https://github.com/search?q=_gout-module-clock_+language%3AMarkdown&type=Code&l=Markdown).

Ce module affiche une horloge.

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
    <td><code>cron</code></td>
    <td><code>string</code><br /><code>string[]</code></td>
    <td>
      <p>
        La ou les
        <a href="https://www.npmjs.com/package/cronnor#expression-cron">expressions
        <em>cron</em></a> indiquant la fréquence de mise à jour. Sans cette
        propriété, les données ne sont jamais mises à jour.
      </p>
      <p>
        Exemple : <code>"@daily"</code>
      </p>
    </td>
  </tr>
  <tr>
    <td><code>empty</code></td>
    <td><code>object</code></td>
    <td>
      <p>
        Les données affichées quand les scrapers n'ont retourné aucune donnée.
        Ce doit être un objet avec les mêmes propriétés qu'un élément retourné
        par les scrapers. Si cette propriété n'est pas renseignée, le module est
        laissé vide.
      </p>
      <p>
        Exemple : <code>title: "(aucun élément)"</code>
      </p>
    </td>
  </tr>
</table>

## Scrapers

> [!NOTE]
>
> Ce chapitre est utile principalement pour le développement de scrapers
> compatibles avec ce module.

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
    <td><code>date</code></td>
    <td><code>number</code></td>
    <td>
      <p>
        Le nombre de millisecondes depuis le 1<sup>er</sup> janvier 1970 à
        00:00:00 UTC (cf.
        <a href="https://developer.mozilla.org/JavaScript/Reference/Global_Objects/Date/getTime"><code>Date.prototype.getTime()</code></a>).
        Cette valeur est utilisée comme heure de l'horloge. Par défaut, l'heure
        courante est utilisée.
      </p>
      <p>
        Exemple : <code>900277200000</code>
      </p>
    </td>
  </tr>
  <tr>
    <td><code>icon</code></td>
    <td><code>string</code></td>
    <td>
      <p>
        L'URL de l'image qui sera utilisée comme horloge. Pour avoir une
        harmonie avec les autres widgets, il est conseillé d'utiliser une image
        carrée avec un dessin occupant toute l'image. Le document
        <a href="https://www.w3.org/Graphics/SVG/">SVG</a> doit avoir trois
        enfants avec les identifiants <code>hour</code>, <code>minute</code> et
        <code>second</code>. Tous ces sous-éléments tourneront avec comme axe le
        centre de l'image. Par défaut, l'image d'une simple horloge est
        affichée.
      </p>
      <p>
        Exemple : <code>"https://example.com/foo/bar.svg"</code>
      </p>
    </td>
  </tr>
</table>

## Exemple

Ce widget affiche une horloge avec l'heure courante.

```html
<script type="application/yaml">
  module:
    url: "https://cdn.jsdelivr.net/gh/regseb/gout@0/src/module/clock/clock.js"
    scrapers:
      - url: "https://cdn.jsdelivr.net/gh/regseb/gout@0/src/scraper/tools/repeater/repeater.js"
        options:
          extract:
            - color: "#795548"
</script>
```
