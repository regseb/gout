# Module _text_

> Mots-clés :
> [_gout_](https://github.com/search?q=_gout_+language%3AMarkdown&type=Code&l=Markdown),
> [_gout-module_](https://github.com/search?q=_gout-module_+language%3AMarkdown&type=Code&l=Markdown),
> [_gout-module-text_](https://github.com/search?q=_gout-module-text_+language%3AMarkdown&type=Code&l=Markdown).

Ce module affiche un cadre avec du texte et dont la couleur de fond est
personnalisable.

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
        Exemple : <code>title: (aucun élément)</code>
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
recevra en paramètre le nombre `1` indiquant le nombre maximum d'éléments à
retourner. La méthode doit retourner une
[promesse](https://developer.mozilla.org/Web/JavaScript/Reference/Global_Objects/Promise)
contenant un tableau dont chaque élément est un objet ayant les propriétés
suivantes :

<!-- markdownlint-disable no-inline-html-->
<table>
  <tr>
    <th>Nom</th>
    <th>Type</th>
    <th>Description</th>
  </tr>
  <tr>
    <td><code>align</code></td>
    <td><code>string</code></td>
    <td>
      <p>
        L'<a href="https://developer.mozilla.org/CSS/text-align">alignement</a>
        du texte. Par défaut, le texte est aligné à gauche.
      </p>
      <p>
        Exemple : <code>"justify"</code>
      </p>
    </td>
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
        Cette valeur est utilisée pour garder seulement l'élément le plus
        récent. Par défaut, le nombre <code>0</code> est utilisé.
      </p>
      <p>
        Exemple : <code>900277200000</code>
      </p>
    </td>
  </tr>
  <tr>
    <td><code>desc</code></td>
    <td><code>string</code></td>
    <td>
      <p>
        La description de l'élément affichée dans l'infobulle. Par défaut,
        aucune infobulle n'est affichée.
      </p>
      <p>
        Exemple : <code>"Ce top10 des choses incroyables est incroyable"</code>
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
    <td><code>title</code></td>
    <td><code>string</code><br /><code>string[]</code></td>
    <td>
      <p>
        Le texte affiché dans le cadre. Si c'est un tableau, chaque élément sera
        concaténé et affiché dans le cadre.
      </p>
      <p>
        Exemple : <code>"La 7e va vous étonner"</code>
      </p>
    </td>
  </tr>
</table>

## Exemple

Ce widget affiche le texte _Carpe diem_.

```html
<script type="application/yaml">
  module:
    url: https://cdn.jsdelivr.net/gh/regseb/gout@0/src/module/text/text.js
    scrapers:
      - url: https://cdn.jsdelivr.net/gh/regseb/gout@0/src/scraper/tools/repeater/repeater.js
        options:
          extract:
            - title: Carpe diem
</script>
```
