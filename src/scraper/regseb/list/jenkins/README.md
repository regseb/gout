# /regseb/list/jenkins

Ce scraper récupère les *jobs* et les *modules* **jenkins** en erreur.

## Configuration

Le configuration contient un objet
[JSON](http://www.json.org "JavaScript Object Notation") avec les propriétés
suivantes :

- `"url"`: l'URL du serveur Jenkins ;
- `"jobs"`: les filtres des *jobs* à afficher.

## Exemple

Cet exemple affiche les *modules* *Maven Core* et *Maven Artifact* du *job*
*maven-3.x*, ainsi que le *job* *Tomcat-7.x* de la fondation
**[Apache](//builds.apache.org/)**.

```JSON
{
    "std/list/jenkins": {
        "widget": "std/list",
        "coord": { "x": 1, "y": 1, "w": 18, "h": 5 },
        "config": {
            "empty": {
                "link": "https://builds.apache.org",
                "title": "(Aucun job en erreur)",
                "desc": null
            },
            "color": "#9e9e9e",
            "cron": "0 */4 * * *"
        },
        "scrapers": [
            {
                "scraper": "regseb/list/jenkins",
                "config": {
                    "url": "https://builds.apache.org",
                    "jobs": {
                        "maven-3.x": ["org.apache.maven:maven-core",
                                      "org.apache.maven:maven-artifact"],
                        "Tomcat-7.x": null
                    }
                }
            }
        ]
    }
}
```
