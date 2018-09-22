# core/clock/date

Ce scraper retourne l'heure actuelle.

Il peut être utilisé avec le module `core/clock`.

## Configuration

Il n'y a pas de configuration.

## Exemple

Cet configuration affiche l'heure courante.

```JSON
{
    "module": "core/clock",
    "files": { "config.json": {} },
    "scrapers": [
        {
            "scraper": "core/clock/date"
        }
    ]
}
```
