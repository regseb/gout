# Gout
Portail personnalisable.

## Installation
Exécuter les commandes suivantes dans la console pour installer
*[Apache](http://httpd.apache.org/ "Apache HTTP Server Project")* avec les
modules *[proxy](http://httpd.apache.org/docs/current/mod/mod_proxy.html)* et
*[proxy_http](http://httpd.apache.org/docs/current/mod/mod_proxy_http.html)* :

    sudo apt-get install apache2
    sudo a2enmod proxy
    sudo a2enmod proxy_http

Ajouter les lignes suivantes dans le fichier */etc/apache2/apache2.conf* :

    # Proxy Gout
    <Location /gout/proxy/https/>
      ProxyPass https://
      ProxyPassReverse https://
    </Location>
    <Location /gout/proxy/http/>
      ProxyPass http://
      ProxyPassReverse http://
    </Location>

Redémarrer *Apache* :

    sudo service apache2 restart

Déployer *gout* sur le serveur :

    cd /tmp/
    wget https://github.com/regseb/gout/archive/master.zip
    unzip gout-master.zip
    mv gout-master gout
    sudo cp -r gout /var/www/

## Utilisation
    http://localhost/gout/?user=example

## Compatibilité
 Chrome | Firefox | Internet Explorer | Opera | Safari
:------:|:-------:|:-----------------:|:-----:|:------:
   5    |    5    |         9         |  12   |   5

## Licence
La bibliothèque est publiée sous *GNU GENERAL PUBLIC LICENSE*.
