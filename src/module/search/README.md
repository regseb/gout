# Module _search_

> Mots-clés : gout, gout-module, gout-module-search.

Ce module affiche une zone de saisie pour faire une recherche.

## Options

Aucune option n'est nécessaire. Tout le paramétrage se fait avec les scrapers.

## Scrapers

> [!NOTE]
>
> Ce chapitre est utile principalement pour le développement de scrapers
> compatibles avec ce module.

Les scrapers associés à ce module doivent définir trois méthodes :

- `info()` qui retourne une promesse contenant les informations du moteur de
  recherche dans un objet JSON grâce aux propriétés :
  - `"title"` : le nom du moteur de recherche ;
  - `"color"` : la couleur du cadre ;
  - `"icon"` : l'URL de l'icône du moteur de recherche ;
  - `"desc"` (optionnel) : la description du moteur de recherche.
- `suggest()` qui prend en paramètre les mots cherchés et qui retourne une
  promesse avec la liste de propositions.
- `result()` qui prend en paramètre les mots cherchés et qui renvoi une promesse
  contenant l'URL de la page des résultats.

## Exemple

Ce widget fourni un champ pour faire une recherche avec
[DuckDuckGo](https://duckduckgo.com/).

```html
<script type="application/yaml">
  module:
    url: "https://cdn.jsdelivr.net/gh/regseb/gout@0/src/module/search/search.js"
    scrapers:
      - url: "https://cdn.jsdelivr.net/gh/regseb/gout@0/src/scraper/search/opensearch/opensearch.js"
        options:
          url: "https://duckduckgo.com/?q={searchTerms}"
          suggestions: "https://ac.duckduckgo.com/ac/?q={searchTerms}&type=list"
          complements:
            title: "DuckDuckGo"
            color: "#f44336"
</script>
```
