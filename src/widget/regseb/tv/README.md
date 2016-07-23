# /regseb/tv

Ce widget donne le **programme télévisé** du soir.

## Configuration

**25** est une taille raisonnable pour la largeur du cadre. La hauteur dépend
du nombre de chaines qu'il faut afficher dans le cadre. Si vous souhaitez avoir
*N* chaines de télévision : il faut fixer la hauteur à *N + 1*.

Le répertoire de la passerelle doit avoir un fichier ***config.json***
contenant un objet [JSON](http://www.json.org "JavaScript Object Notation")
avec les propriétés suivantes :

- `"channels"` : un objet JSON dont les nom de propriétés sont les bouquets
  (`"tnt"`, `"tnt-local"`, `"generaliste"`, `"canal-tps"`, `"ciname"`,
  `"sport"`, `"information"`, `"belgique-suisse"`, `"jeunesse"`, `"musique"`,
  `"documentaire"` et `"serie"`), les valeurs contiennent la liste des chaines
  (voir en(dessous pour les codes) ;
- `"color"` (optionnel - valeur par défaut : `"#9e9e9e"`) : la couleur de fond
  du cadre (au format hexadécimale, régulier RGB ou avec des mots-clefs
  prédéfinis) ;

Voici la liste des codes des chaines (regroupés par bouquet) :

- **`"tnt"` :**
  - *TF1* : `"tf1"` ;
  - *France 2* : `"france-2"` ;
  - *France 3* : `"france-3"` ;
  - *Canal+* : `"canalplus"` ;
  - *France 5* : `"france-5"` ;
  - *M6* : `"m6"` ;
  - *Arte* : `"arte"` ;
  - *D8* : `"d8"` ;
  - *W9* : `"w9"` ;
  - *TMC* : `"tmc"` ;
  - *NT1* : `"nt1"` ;
  - *NRJ 12* : `"nrj-12"` ;
  - *LCP - Public Senat* : `"la-chaine-parlementaire-public-senat"` ;
  - *France 4* : `"france-4"` ;
  - *BFM TV* : `"bfm-tv"` ;
  - *itele* : `"i-tele"` ;
  - *D17* : `"d17"` ;
  - *Gulli* : `"gulli"` ;
  - *France Ô* : `"france-o"` ;
  - *HD1* : `"hd1"` ;
  - *L'Equipe 21* : `"l-equipe-21"` ;
  - *6ter* : `"6ter"` ;
  - *Numéro 23* : `"numero-23"` ;
  - *RMC Découverte* : `"rmc-decouverte"` ;
  - *Chérie 25* : `"cherie-25"` ;
- **`"tnt-local"` :**
  - *Demain TV BDM TV Cinaps Tv Télé bocal* :
    `"bdm-television-tele-bocal-cinaps-demain-tv"` ;
  - *IDF1* : `"idf1"` ;
- `"generaliste"` :
  - *13ème Rue* : `"13e-rue"` ;
  - *AB1* : `"ab-1"` ;
  - *AB3* : `"ab-3"` ;
  - *AB4* : `"ab-4"` ;
  - *Comédie +* : `"comedie-plus"` ;
  - *Game One* : `"game-one"` ;
  - *June* : `"june"` ;
  - *KTO* : `"kto"` ;
  - *Paris Première* : `"paris-premiere"` ;
  - *Pink TV* : `"pink-tv"` ;
  - *RTL 9* : `"rtl-9"` ;
  - *Syfy* : `"syfy"` ;
  - *Téva* : `"teva"` ;
  - *TV5MONDE* : `"tv5monde"` ;
  - *TvBreizh* : `"tvbreizh"` ;
  - *Vivolta* : `"vivolta"` ;
- **`"canal-tps"` :**
  - *Canal+* : `"canalplus"` ;
  - *Canal+ cinéma* : `"canalplus-cinema"` ;
  - *Canal+ décalé* : `"canalplus-decale"` ;
  - *Canal+ family* : `"canalplus-family"` ;
  - *Canal+ sport* : `"canalplus-sport"` ;
- **`"cinema"` :**
  - *Action* : `"action"` ;
  - *Ciné + Classic* : `"cineplus-classic"` ;
  - *Ciné + Club* : `"cineplus-club"` ;
  - *Ciné + Emotion* : `"cineplus-emotion"` ;
  - *Ciné + Famiz* : `"cineplus-famiz"` ;
  - *Ciné + Frisson* : `"cineplus-frisson"` ;
  - *Ciné FX* : `"cine-fx"` ;
  - *Ciné Polar* : `"cine-polar"` ;
  - *Ciné + Premier* : `"cineplus-premier"` ;
  - *Disney Cinemagic +1* : `"disney-cinemagic-plus1"` ;
  - *OCS Choc* : `"ocs-choc"` ;
  - *OCS Géants* : `"ocs-geants"` ;
  - *OCS Max* : `"ocs-max"` ;
  - *Paramount Channel* : `"paramount-channel"` ;
  - *TCM* : `"tcm-cinema"` ;
  - *XXL* : `"xxl"` ;
- **`"sport"` :**
  - *AB Moteurs* : `"ab-moteurs"` ;
  - *beIN Sports 1* : `"bein-sports-1"` ;
  - *beIN Sports 2* : `"bein-sports-2"` ;
  - *beIN Sports 3* : `"bein-sports-3"` ;
  - *Canal+ sport* : `"canalplus-sport"` ;
  - *Encyclo* : `"science-vie-tv"` ;
  - *Equidia* : `"equidia-live"` ;
  - *Eurosport 2* : `"eurosport-2"` ;
  - *Eurosport* : `"eurosport"` ;
  - *Girondins TV* : `"girondins-tv"` ;
  - *Info Sport +* : `"infosport-plus"` ;
  - *L'Equipe 21* : `"l-equipe-21"` ;
  - *Ma Chaîne Sport* : `"ma-chaine-sport"` ;
  - *Motors TV* : `"motors-tv"` ;
  - *OLTV* : `"ol-tv-olympique-lyonnais"` ;
  - *OMtv* : `"om-tv"` ;
- **`"information"` :**
  - *BFM TV* : `"bfm-tv"` ;
  - *France 24* : `"france-24"` ;
  - *itele* : `"i-tele"` ;
  - *LCI* : `"lci-la-chaine-info"` ;
- **`"belgique-suisse"` :**
  - *Club RTL* : `"club-rtl"` ;
  - *La Deux* : `"rtbf-la-deux"` ;
  - *La Trois* : `"rtbf-la-trois"` ;
  - *La Une* : `"rtbf-la-une"` ;
  - *Plug RTL* : `"plug-rtl"` ;
  - *RTL TVI* : `"rtl-tvi"` ;
  - *RTS Deux* : `"rts-deux"` ;
  - *RTS Un* : `"rts-un"` ;
- **`"jeunesse"` :**
  - *Boomerang* : `"boomerang"` ;
  - *Canal J* : `"canal-j"` ;
  - *Cartoon Network* : `"cartoon-network"` ;
  - *Disney Channel* : `"disney-channel"` ;
  - *Disney Cinemagic +1* : `"disney-cinemagic-plus1"` ;
  - *Disney Junior* : `"disney-junior"` ;
  - *Mangas* : `"mangas"` ;
  - *Nickelodéon* : `"nickelodeon"` ;
  - *Piwi+* : `"piwi-plus"` ;
  - *TéléToon+* : `"teletoon-plus"` ;
  - *TIJI* : `"tiji"` ;
- **`"musique"` :**
  - *M6 Music* : `"m6-music"` ;
  - *MCM* : `"mcm"` ;
  - *MCM Top* : `"mcm-top"` ;
  - *Melody* : `"melody"` ;
  - *Mezzo* : `"mezzo"` ;
  - *MTV Base France* : `"mtv-base-france"` ;
  - *MTV Hits* : `"mtv-hits"` ;
  - *MTV Idol* : `"mtv-idol"` ;
  - *MTV* : `"mtv"` ;
  - *MTV Pulse* : `"mtv-pulse"` ;
  - *MTV Rocks* : `"mtv-rocks"` ;
  - *NRJ Hits* : `"nrj-hits"` ;
- **`"documentaire"` :**
  - *Animaux* : `"animaux"` ;
  - *Chasse et pêche* : `"chasse-et-peche"` ;
  - *Discovery Channel* : `"discovery-channel"` ;
  - *Discovery Science* : `"discovery-science"` ;
  - *E !* : `"e-entertainment"` ;
  - *Encyclo* : `"science-vie-tv"` ;
  - *Histoire* : `"histoire"` ;
  - *National Geographic* : `"national-geographic"` ;
  - *Planète+ Justice* : `"planete-plus-crime-investigation"` ;
  - *Planète + No Limit* : `"planete-plus-action-experience"` ;
  - *Planète +* : `"planete-plus"` ;
  - *Planète + Thalassa* : `"planete-plus-thalassa"` ;
  - *RMC Découverte* : `"rmc-decouverte"` ;
  - *Seasons* : `"seasons"` ;
  - *Toute l'histoire* : `"toute-l-histoire"` ;
  - *Ushuaia TV* : `"ushuaia-tv"` ;
  - *Voyage* : `"voyage"` ;
- **`"serie"` :**
  - *Canal+ Séries* : `"canalplus-series"` ;
  - *OCS Choc* : `"ocs-choc"` ;
  - *OCS Géants* : `"ocs-geants"` ;
  - *OCS Max* : `"ocs-max"` ;
  - *Série club* : `"serie-club"`.

## Exemple

### /config.json

Cet exemple donne le programme télévisé de toutes les chaines de la TNT sauf
Canal+, BFM TV et itele.

```JSON
{
    "channels": {
        "tnt": [
            "tf1", "france-2", "france-3", "france-5", "m6", "arte", "d8",
            "w9", "tmc", "nt1", "nrj-12",
            "la-chaine-parlementaire-public-senat", "france-4", "d17",
            "gulli", "france-o", "hd1", "l-equipe-21", "6ter", "numero-23",
            "rmc-decouverte", "cherie-25"
        ]
    }
}
```
