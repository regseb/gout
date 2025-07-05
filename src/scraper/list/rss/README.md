# Scraper _list/rss_

> Mots-clés :
> [_gout_](https://github.com/search?q=_gout_+language%3AMarkdown&type=Code&l=Markdown),
> [_gout-scraper_](https://github.com/search?q=_gout-scraper_+language%3AMarkdown&type=Code&l=Markdown),
> [_gout-scraper-list-rss_](https://github.com/search?q=_gout-scraper-list-rss_+language%3AMarkdown&type=Code&l=Markdown),
> [_gout-module-list_](https://github.com/search?q=_gout-module-list_+language%3AMarkdown&type=Code&l=Markdown),
> [_gout-module-single_](https://github.com/search?q=_gout-module-single_+language%3AMarkdown&type=Code&l=Markdown),
> [_gout-module-podcast_](https://github.com/search?q=_gout-module-podcast+language%3AMarkdown&type=Code&l=Markdown),
> [_gout-module-image_](https://github.com/search?q=_gout-module-image_+language%3AMarkdown&type=Code&l=Markdown).

Ce scraper récupère les derniers éléments d'un flux **RSS** / **Atom**.

Il peut être utilisé avec les modules :

- [_list_](../../../module/list#readme) ;
- [_single_](../../../module/single#readme) pour afficher seulement le dernier
  élément ;
- [_podcast_](../../../module/podcast#readme) pour un flux RSS avec des
  [`enclosure`](https://www.rssboard.org/rss-specification#ltenclosuregtSubelementOfLtitemgt)
  de type `audio` ;
- [_image_](../../../module/image#readme) pour un flux RSS avec des `enclosure`
  de type `image`.

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
    <td><code>url</code></td>
    <td><code>string</code></td>
    <td>
      <p>
        L'URL vers un flux RSS ou Atom.
      </p>
      <p>
        Exemple : <code>https://example.com/foo/bar.rss</code>
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
        Exemple : <code>icon: https://example.com/foo/bar.svg</code>
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
  <tr>
    <td><code>transforms</code></td>
    <td><code>object</code></td>
    <td>
      <p>
        Les transformations qui seront appliquées sur les éléments retournés.
        Par défaut aucune transformation n'est appliqué. Pour plus de détails,
        voir le scraper
        <a href="../../tools/transforms#readme"><em>tools/transforms</em></a>.
      </p>
      <p>
        Exemple : <code>title: "title.replace('podcast', '')"</code>
      </p>
    </td>
  </tr>
</table>

## Exemple

Ce widget affiche les cinq dernières actualités du site
[Le Monde.fr](https://www.lemonde.fr/).

```html
<script type="application/yaml">
  module:
    url: https://cdn.jsdelivr.net/gh/regseb/gout@0/src/module/list/list.js
    options:
      cron: "*/10 * * * *"
      max: 5
    scrapers:
      - url: https://cdn.jsdelivr.net/gh/regseb/gout@0/src/scraper/list/rss/rss.js
        options:
          url: https://www.lemonde.fr/rss/une.xml
</script>
```
