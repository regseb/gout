# /regseb/tele7jours

Ce module donne le
**[programme télévisé](http://www.programme-television.org/)** du soir.

## Configuration

**25** est une taille raisonnable pour la largeur du cadre. La hauteur dépend
du nombre de chaines qu'il faut afficher dans le cadre. Si vous souhaitez avoir
*N* chaines de télévision : il faut fixer la hauteur à *N + 1*.

Le répertoire de la passerelle doit avoir un fichier ***config.json***
contenant un objet [JSON](http://www.json.org "JavaScript Object Notation")
avec les propriétés suivantes :

- `"broadcast"` (optionnel - valeur par défaut : `"tnt"`) : la source de
  diffusion ([`"tnt"`](http://www.programme-television.org/?bouquet=tnt),
  [`"tnt-canal"`](http://www.programme-television.org/?bouquet=tnt-canal),
  [`"canalsat"`](http://www.programme-television.org/?bouquet=canalsat),
  [`"orange"`](http://www.programme-television.org/?bouquet=orange),
  [`"free"`](http://www.programme-television.org/?bouquet=free),
  [`"numericable"`](http://www.programme-television.org/?bouquet=numericable),
  [`"neufbox-sfr"`](http://www.programme-television.org/?bouquet=neufbox-sfr),
  [`"bouygues"`](http://www.programme-television.org/?bouquet=bouygues),
  [`"alice"`](http://www.programme-television.org/?bouquet=alice),
  [`"darty"`](http://www.programme-television.org/?bouquet=darty) ou
  [`"bis-televisions"`](http://www.programme-television.org/?bouquet=bis-televisions)) ;
- `"channels"` : la liste des chaines affichées (voir en-dessous pour connaitre
  les codes) ;
- `"color"` (optionnel - valeur par défaut : `"#9e9e9e"`) : la couleur de fond
  du cadre (au format hexadécimale, régulier RGB ou avec des mots-clefs
  prédéfinis).

Voici le tableau des codes des chaines de la TNT :

```JSON
["tf1", "france-2", "france-3", "canal", "france-5", "m6", "arte", "d8", "w9",
 "tmc", "nt1", "nrj12", "lcp-public-senat", "france-4", "bfm-tv", "i-tele",
 "d17", "gulli", "france-o", "hd1", "l-equipe-21", "6ter", "numero-23",
 "rmc-decouverte", "cherie-25"]
```

Et la liste ci-dessous donne les codes pour toutes les chaines :

- *13e Rue* : `"13e-rue"` ;
- *6ter* : `"6ter"` ;
- *8 Mont-Blanc* : `"tv8-montblanc"` ;
- *AB 1* : `"ab-1"` ;
- *AB 3* : `"ab3"` ;
- *AB 4* : `"ab4"` ;
- *AB Moteurs* : `"ab-moteurs"` ;
- *Action* : `"action"` ;
- *Alsace 20* : `"alsace-20"` ;
- *Animaux* : `"animaux"` ;
- *Arte* : `"arte"` ;
- *Azur TV* : `"azur-tv"` ;
- *beIN SPORTS 1* : `"bein-sports-1"` ;
- *beIN SPORTS 2* : `"bein-sports-2"` ;
- *beIN SPORTS 3* : `"bein-sports-3"` ;
- *BFM Business* : `"bfm-business"` ;
- *BFM TV* : `"bfm-tv"` ;
- *Boomerang* : `"boomerang"` ;
- *Campagnes TV* : `"campagnes-tv"` ;
- *Canal+* : `"canal"` ;
- *Canal+ Cinéma* : `"canal-cinema"` ;
- *Canal+ Décalé* : `"canal-decale"` ;
- *Canal+ Family* : `"canal-family"` ;
- *Canal J* : `"canal-j"` ;
- *Canal partagé TNT Ile-de-France* : `"canal-partage-tnt-ile-de-france"` ;
- *Canal+ Séries* : `"canal-series"` ;
- *Canal+ Sport* : `"canal-sport"` ;
- *Cartoon Network* : `"cartoon-network"` ;
- *Chasse et pêche* : `"chasse-et-peche"` ;
- *Chérie 25* : `"cherie-25"` ;
- *Ciné+ Classic* : `"cine-classic"` ;
- *Ciné+ Club* : `"cine-club"` ;
- *Ciné+ Emotion* : `"cine-emotion"` ;
- *Ciné+ Famiz* : `"cine-famiz"` ;
- *Ciné+ Frisson* : `"cine-frisson"` ;
- *Ciné FX* : `"cine-fx"` ;
- *Ciné+ Premier* : `"cine-premier"` ;
- *Comédie+* : `"comedie"` ;
- *D17* : `"d17"` ;
- *D8* : `"d8"` ;
- *Demain TV* : `"demain-tv"` ;
- *Discovery Channel* : `"discovery-channel"` ;
- *Discovery Science* : `"discovery-science"` ;
- *Disney Channel* : `"disney-channel"` ;
- *Disney Cinema* : `"disney-cinema"` ;
- *Disney Junior* : `"disney-junior"` ;
- *Disney XD* : `"disney-xd"` ;
- *Dorcel TV* : `"dorcel-tv"` ;
- *E !* : `"e-entertainment"` ;
- *Equidia Life* : `"equidia-life"` ;
- *Equidia Live* : `"equidia-live"` ;
- *Eurochannel* : `"eurochannel"` ;
- *Eurosport 2* : `"eurosport-2"` ;
- *Eurosport* : `"eurosport"` ;
- *Extreme Sports Channel* : `"extreme-sports-channel"` ;
- *France 24* : `"france-24"` ;
- *France 2* : `"france-2"` ;
- *France 3* : `"france-3"` ;
- *France 4* : `"france-4"` ;
- *France 5* : `"france-5"` ;
- *France Ô* : `"france-o"` ;
- *Game One* : `"game-one"` ;
- *Golf Channel* : `"golf-channel"` ;
- *Golf+* : `"golf"` ;
- *Gong Max* : `"gong-max"` ;
- *Grand Lille TV* : `"grand-lille-tv"` ;
- *Gulli* : `"gulli"` ;
- *HD1* : `"hd1"` ;
- *Histoire* : `"histoire"` ;
- *Hustler TV* : `"hustler-tv"` ;
- *iC1* : `"ic1-clermont-premiere"` ;
- *IDF1* : `"idf1"` ;
- *Infosport+* : `"infosport"` ;
- *iTélé* : `"i-tele"` ;
- *J-One* : `"j-one"` ;
- *June TV* : `"june-tv"` ;
- *Kombat Sport* : `"kombat-sport"` ;
- *KTO* : `"kto"` ;
- *KZTV* : `"kztv"` ;
- *La Chaîne parlementaire* : `"lcp-public-senat"` ;
- *LCI - La Chaîne Info* : `"lci"` ;
- *LCM* : `"lcm"` ;
- *LCP 24H/24* : `"lcp-24-24h"` ;
- *L'Equipe 21* : `"l-equipe-21"` ;
- *M6* : `"m6"` ;
- *M6 Music* : `"m6-music"` ;
- *Ma Chaîne Sport* : `"ma-chaine-sport"` ;
- *Mangas* : `"mangas"` ;
- *MCM* : `"mcm"` ;
- *MCM Top* : `"mcm-top"` ;
- *MCS Bien-être* : `"mcs-bien-etre"` ;
- *MCS Extrême* : `"mcs-extreme"` ;
- *MCS Tennis* : `"mcs-tennis"` ;
- *Melody* : `"melody"` ;
- *Mezzo Live HD* : `"mezzo-live-hd"` ;
- *Mezzo* : `"mezzo"` ;
- *Mirabelle TV* : `"mirabelle-tv"` ;
- *Motors TV* : `"motors-tv"` ;
- *MTV Base France* : `"mtv-base"` ;
- *MTV Hits* : `"mtv-hits"` ;
- *MTV Idol* : `"mtv-idol"` ;
- *MTV* : `"mtv"` ;
- *MTV Pulse* : `"mtv-pulse"` ;
- *MTV Rocks* : `"mtv-rocks"` ;
- *Nat Geo Wild* : `"nat-geo-wild"` ;
- *National Geographic Channel* : `"national-geographic"` ;
- *Nautical Channel* : `"nautical-channel"` ;
- *Nickelodeon Junior* : `"nickelodeon-junior"` ;
- *Nickelodéon* : `"nickelodeon"` ;
- *Nolife* : `"nolife"` ;
- *Non Stop People HD* : `"non-stop-people"` ;
- *NRJ 12* : `"nrj12"` ;
- *NRJ Hits* : `"nrj-hits"` ;
- *NT 1* : `"nt1"` ;
- *Numéro 23* : `"numero-23"` ;
- *OCS Choc* : `"ocs-choc"` ;
- *OCS City* : `"ocs-city"` ;
- *OCS Géants* : `"ocs-geants"` ;
- *OCS Max* : `"ocs-max"` ;
- *OLTV* : `"ol-tv"` ;
- *OMtv* : `"omtv"` ;
- *Paramount Channel* : `"paramount-channel"` ;
- *Paris Première* : `"paris-premiere"` ;
- *Pink TV* : `"pink-tv"` ;
- *Piwi+* : `"piwi"` ;
- *Planète+ Action et Expérience* : `"planete-a-e"` ;
- *Planète+ Crime Investigation* : `"planete-ci"` ;
- *Planète+* : `"planete"` ;
- *Planète+ Thalassa* : `"planete-thalassa"` ;
- *Polar* : `"cine-polar"` ;
- *RMC Découverte* : `"rmc-decouverte"` ;
- *RTL 9* : `"rtl9"` ;
- *Science & Vie TV* : `"sciences-vie-tv"` ;
- *Seasons* : `"seasons"` ;
- *serieclub* : `"serieclub"` ;
- *Shorts TV* : `"shorts-tv"` ;
- *Sport 365* : `"sport-365"` ;
- *Sundance Channel* : `"sundance-channel"` ;
- *Syfy* : `"sy-fy"` ;
- *TCM Cinéma* : `"tcm-cinema"` ;
- *Télé Grenoble Isère* : `"tele-grenoble-isere"` ;
- *Télé Locale Provence* : `"tele-locale-provence"` ;
- *Télénantes* : `"telenantes"` ;
- *Télésud* : `"telesud"` ;
- *TéléToon+* : `"teletoon"` ;
- *Téva* : `"teva"` ;
- *TF1* : `"tf1"` ;
- *TIJI* : `"tiji"` ;
- *TL7* : `"tl7-saint-etienne"` ;
- *TLM - Télé Lyon Métropole* : `"tlm"` ;
- *TMC* : `"tmc"` ;
- *Toute l'histoire* : `"toute-l-histoire"` ;
- *Trace Tropical* : `"trace-tropical"` ;
- *Trace Urban* : `"trace-urban"` ;
- *Trek* : `"trek"` ;
- *TV5MONDE* : `"tv5-monde"` ;
- *TV7 Bordeaux* : `"tv7-bordeaux"` ;
- *TvBreizh* : `"tv-breizh"` ;
- *TVR Rennes 35 Bretagne* : `"tvr"` ;
- *TV Sud* : `"tv-sud"` ;
- *TV Tours* : `"tv-tours"` ;
- *TV Vendée* : `"tv-vendee"` ;
- *Ushuaïa TV* : `"ushuaia-tv"` ;
- *Vivolta* : `"vivolta"` ;
- *Vosges Télévision* : `"vosges-tv"` ;
- *Voyage* : `"voyage"` ;
- *W9* : `"w9"` ;
- *Wéo* : `"weo"` ;
- *XXL* : `"xxl"`.

## Exemple

### /config.json

Cet exemple donne le programme télévisé de toutes les chaines de la TNT sauf
Canal+, BFM TV et iTélé.

```JSON
{
    "channels": [
        "tf1", "france-2", "france-3", "france-5", "m6", "arte", "d8", "w9",
        "tmc", "nt1", "nrj12", "lcp-public-senat", "france-4", "d17", "gulli",
        "france-o", "hd1", "l-equipe-21", "6ter", "numero-23", "rmc-decouverte",
        "cherie-25"
    ]
}
```
