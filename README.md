# Gout
Portail personnalisable.

## Installation
    cd /tmp/
    wget https://github.com/regseb/gout/archive/master.zip
    unzip gout-master.zip
    mv gout-master gout
    sudo apt-get install apache2 php5 libapache2-mod-php5 php5-curl
    sudo cp -r gout /var/www/
    sudo chmod 777 /var/www/gout/tmp/

## Utilisation
    http://localhost/gout/?config=config.json

## Compatibilité
 Chrome | Firefox | Internet Explorer | Opera | Safari
:------:|:-------:|:-----------------:|:-----:|:------:
   5    |    5    |         9         |  12   |   5

## Licence
La bibliothèque est publiée sous *GNU GENERAL PUBLIC LICENSE*.