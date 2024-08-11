# Module _single_

> Mots-clés : gout, gout-module, gout-module-single.

Ce module affiche un lien.

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
        <!-- Ne pas vérifier les espaces dans les éléments d'emphase car cette
             règle s'applique dans les éléments <code> et il y a des
             faux-positifs avec les expressions cron.
             https://github.com/DavidAnson/markdownlint/issues/427 -->
        <!-- markdownlint-disable-next-line no-space-in-emphasis -->
        Exemple : <code>"*/5 * * * *"</code>
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
recevra en paramètre le nombre `1` indiquant le nombre maximum d'éléments à
retourner. La méthode doit retourner une
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
        L'URL de l'icône affichée dans le cadre. Par défaut, aucune icône n'est
        affichée.
      </p>
      <p>
        Exemple : <code>"https://example.com/foo/bar.svg"</code>
      </p>
    </td>
  </tr>
  <tr>
    <td><code>link</code></td>
    <td><code>string</code></td>
    <td>
      <p>
        Le lien de l'élément. Par défaut, il n'y a pas de lien (mais le titre de
        l'élément est affiché).
      </p>
      <p>
        Exemple : <code>"https://example.com/foo/bar.html"</code>
      </p>
    </td>
  </tr>
  <tr>
    <td><code>target</code></td>
    <td><code>string</code></td>
    <td>
      <p>
        L'emplacement où sera ouvert le lien (cf. l'attribut
        <a href="https://developer.mozilla.org/HTML/Element/a#attr-target"><code>target</code></a>
        des liens HTML). Par défaut, les liens s'ouvrent dans un nouvel onglet.
      </p>
      <p>
        Exemple : <code>"_top"</code>
      </p>
    </td>
  </tr>
  <tr>
    <td><code>title</code></td>
    <td><code>string</code></td>
    <td>
      <p>
        Le texte affiché dans la ligne.
      </p>
      <p>
        Exemple : <code>"La 7e va vous étonner"</code>
      </p>
    </td>
  </tr>
</table>

## Exemple

Ce widget affiche un lien vers un article au hasard de
[Wikipédia](https://fr.wikipedia.org/).

```html
<script type="application/yaml">
  module:
    url: "https://cdn.jsdelivr.net/gh/regseb/gout@0/src/module/single/single.js"
    options:
      cron: "*/5 * * * *"
    scrapers:
      - url: "https://cdn.jsdelivr.net/gh/regseb/gout-regseb@0/src/scraper/single/articleauhasard/articleauhasard.js"
</script>
```
