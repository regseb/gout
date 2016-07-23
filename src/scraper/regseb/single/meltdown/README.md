# /regseb/single/meltdown

Ce *scraper* récupère les évènements du jour dans un bar
**[Meltdown](http://www.meltdown.bar/)**.

## Configuration

La configuration contient le nom de la ville où se trouve le bar.

## Exemple

Cet exemple affiche l'évènement du Meltdown d'*Aix-en-Provence*.

```JSON
{
    "std/single/meltdown": {
        "widget": "std/single",
        "coord": { "x": 1, "y": 1, "w": 20, "h": 2 },
        "config": {
            "color": "TODO",
            "cron": "0 0 * * *"
        },
        "scrapers": [
            { "scraper": "regseb/single/meltdown",
              "config": "aix" }
        ]
    }
}
```
