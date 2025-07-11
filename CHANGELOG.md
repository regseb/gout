# Changelog

## [0.14.0](https://github.com/regseb/gout/compare/v0.13.0...v0.14.0) (2025-07-05)

### Features

- Publier l'extension pour Firefox Android.
  ([91185c3](https://github.com/regseb/gout/commit/91185c31f6b0d9bf11fca0137a65963eae4b9f39))
- **scraper/tools/filter:** Permettre une comparaison insensible à la casse.
  ([a22d03d](https://github.com/regseb/gout/commit/a22d03d3a88b128e6f69e4da6ef5a132ee8ee9f4))
- **scraper/tools/transforms:** Ajouter un scraper pour transformer des
  résultats.
  ([0b01359](https://github.com/regseb/gout/commit/0b01359ad183a7035b78cb5163b6724b56fe7f76))

## [0.13.0](https://github.com/regseb/gout/compare/v0.12.1...v0.13.0) (2024-11-09)

### Features

- Simplifier les images SVG.
  ([75b0ec7](https://github.com/regseb/gout/commit/75b0ec7b16137c074f21de62d0afd34b744599bc))
- **tools/filter:** Ajouter le support des RegExp.
  ([f1dce28](https://github.com/regseb/gout/commit/f1dce28a5af028e6bd5e92acceb1821b110864d8))

### Bug Fixes

- Gérer les différents cas pour modifier les entêtes.
  ([06ea93b](https://github.com/regseb/gout/commit/06ea93b0fa202297a88c2859c774aaa1657975af))
- **list/rss:** Récupérer les données dans "updated".
  ([48ae531](https://github.com/regseb/gout/commit/48ae5313d7c65176ac9db1fe61ebfcc85801401f))

## [0.12.1](https://github.com/regseb/gout/compare/v0.12.0...v0.12.1) (2024-08-11)

### Bug Fixes

- Corriger les exemples.
  ([cc9c871](https://github.com/regseb/gout/commit/cc9c871d4a854d62787c6133a4d158ac49be1b3b))
- Gérer les flux RSS sans date.
  ([b9e5397](https://github.com/regseb/gout/commit/b9e5397cf8dd9b886fbf7902a97693930a3f43fa))
- Optimiser les filtres.
  ([f1b9522](https://github.com/regseb/gout/commit/f1b9522454904b2011dead14ce5abb53d7b68259))

## [0.12.0](https://github.com/regseb/gout/compare/v0.11.0...v0.12.0) (2024-05-29)

### Features

- Fournir une extension pour Chromium.
  ([b1cec7e](https://github.com/regseb/gout/commit/b1cec7e8bd92fb3f27e2f6689076e7dd4c1fc662))
- Utiliser YAML pour les configurations.
  ([91b03ee](https://github.com/regseb/gout/commit/91b03eed5cbc4e8d5697863ddadd7792634f67b6))

### Bug Fixes

- Gérer la release avec deux extensions.
  ([20c55a5](https://github.com/regseb/gout/commit/20c55a51eb3e6d2cdbc7dbaab9b2819176f09cf1))

## [0.11.0](https://github.com/regseb/gout/compare/v0.10.0...v0.11.0) (2024-03-07)

### Features

- Récupérer les données dans le group (Atom).
  ([e84592f](https://github.com/regseb/gout/commit/e84592f29543e54ac754a630766e9bc9f8ebb783))

### Bug Fixes

- **module/podcast:** Gérer les actions play/pause.
  ([d950ff3](https://github.com/regseb/gout/commit/d950ff3890482cd473f4b8883ced66cb597cc12d))

## [0.10.0](https://github.com/regseb/gout/compare/v0.9.8...v0.10.0) (2024-01-08)

### Features

- Chainer les scrapers.
  ([04c094b](https://github.com/regseb/gout/commit/04c094b9f08b7ed980e27c57fd922d7e3f86e1fb))

### Bug Fixes

- Déplacer le scraper Repeater dans tools.
  ([da4af6f](https://github.com/regseb/gout/commit/da4af6fbf59a68223468b52abb401c2e683e5630))
- **scraper/icon/ping:** Remplacer les points par des "x".
  ([402e2b4](https://github.com/regseb/gout/commit/402e2b400f16b92b6e9e193a7ae70f1dacc5ff9b))

## [0.9.8](https://github.com/regseb/gout/compare/v0.9.7...v0.9.8) (2023-09-24)

### Bug Fixes

- Corriger des fautes de français.
  ([ebb3cba](https://github.com/regseb/gout/commit/ebb3cba7bc03a738ef59055d857b2673dade3e32))
- Corriger le nom des classes.
  ([c91d0fa](https://github.com/regseb/gout/commit/c91d0fa7befa9582dad35712b2a3fdf630183f31))
- Gérer correctement les async / await.
  ([b017aaa](https://github.com/regseb/gout/commit/b017aaade74a678200fa4a8c597463fcd6296c33))

## [0.9.7](https://github.com/regseb/gout/compare/v0.9.6...v0.9.7) (2023-03-10)

### Bug Fixes

- **extension:** Modifier la requête HTTP.
  ([d0de0f9](https://github.com/regseb/gout/commit/d0de0f947c53fb594cdd61956952b297dd226114))
- Renommer "Configuration" en "Options".
  ([eb0a0ad](https://github.com/regseb/gout/commit/eb0a0adcffdb07559a5853b630701cdfc197ddca))

## [0.9.6](https://github.com/regseb/gout/compare/v0.9.5...v0.9.6) (2022-12-11)

## [0.9.5](https://github.com/regseb/gout/compare/v0.9.4...v0.9.5) (2022-10-23)

### Features

- Améliorer l'héritage de widgets.
  ([1c25ad3](https://github.com/regseb/gout/commit/1c25ad37d0063bed18f4065d980d78ef2250e7eb))
- **module/findrss:** Ajouter un module pour extraire les flux RSS.
  ([e7b88a7](https://github.com/regseb/gout/commit/e7b88a7e534ae6b335b5bffa4341e35f0d17a995))

### Bug Fixes

- **scraper/ping:** Gérer correctement les codes.
  ([b03035c](https://github.com/regseb/gout/commit/b03035ca4d5779653cbf0ab1811341a7c163d658))
