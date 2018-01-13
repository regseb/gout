# Scraper

Les scrapers sont des classes JavaScript extrayant des données de site Internet
pour le retourner à un module dans un format définit.

Ils sont organisés en deux groupes :

- `core` : les scrapers fournis par défaut avec Gout ;
- `community` : les scrapers développés par la communauté.

## Générique

Plusieurs modules partagent la même interface pour les scrapers. Un scraper, dit
*génériqe*, doit définir une méthode `extract()` qui prend en paramètre un
entier indiquant le nombre de résultats à retourner. Si aucun paramètre n'est
fourni : prendre `0` comme valeur par défaut. La fonction retourne un tableau
dont chaque élément est un objet JSON ayant les propriétés :

- `"color"` : la
  [couleur](https://developer.mozilla.org/fr/docs/Web/CSS/Type_color) ;
- `"date"` : la *date* de parution avec le nombre de millisecondes depuis le 1er
  janvier 1970 à 00:00:00 UTC ;
- `"desc"` : la description ;
- `"guid"` : un identifiant unique ;
- `"icon"` : l'URL d'une icône ;
- `"img"` : l'URL d'une image ;
- `"link"` : le lien pour consulter l'élément ;
- `"title"` : le titre.

L'icône (`"icon"`) doit être une image carrée SVG en blanc. L'image (`"img"`)
est une image classique (JPG, PNG, ...).
