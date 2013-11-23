// Configurer les applications.
var apps = [
    // Proposition de couleurs : #f0a30a (amber), #825a2c (brown),
    // #0050ef (cobalt), #a20025 (crimson), #1ba1e2 (cyan), #d80073 (magenta),
    // #a4c400 (lime), #6a00ff (indigo), #60a917 (green), #008a00 (emerald),
    // #76608a (mauve), #6d8764 (olive), #fa6800 (orange), #f472d0 (pink),
    // #e51400 (red), #7a3b3f (sienna), #647687 (steel), #00aba9 (teal),
    // #aa00ff (violet), #d8c100 (yellow).

    // ajaxloader.
    { 'type': 'ajaxloader',
      'coord': { 'x': 110, 'y': 6, 'w': 3, 'h': 3 },
      'color': 'black' },

    // search.
    { 'type': 'search',
      'coord': { 'x': 83, 'y': 6, 'w': 26, 'h': 3 },
      'engines': [ { 'title': 'DuckDuckGo',
                     'url': 'https://duckduckgo.com/',
                     'terms': 'q',
                     'color': '#e51400',
                     'icon': 'app/search/duckduckgo/icon.svg' },
                   { 'title': 'Google',
                     'url': 'https://www.google.fr/search',
                     'terms': 'q',
                     'color': '#1ba1e2',
                     'icon': 'app/search/duckduckgo/icon.svg' } ] },

    // feed.
    { 'type': 'feed',
      'coord': { 'x': 1, 'y': 1, 'w': 40, 'h': 8 },
      'color': '#f0a30a',
      'url':  'http://rss.allocine.fr/ac/actualites/cine',
      'icon': 'app/feed/allocine/icon.svg',
      'size': 5 },
    { 'type': 'feed',
      'coord': { 'x': 1, 'y': 10, 'w': 40, 'h': 8 },
      'color': '#1ba1e2',
      'url':  'http://www.laprovence.com/rss/Region.xml',
      'icon': 'app/feed/laprovence/icon.svg',
      'size': 5 },
    { 'type': 'feed',
      'coord': { 'x': 42, 'y': 1, 'w': 40, 'h': 8 },
      'color': '#647687',
      'url':  'http://www.arretsurimages.net/rss/vite-dit.rss',
      'icon': 'app/feed/arretsurimages/icon.svg',
      'size': 5 },
    { 'type': 'feed',
      'coord': { 'x': 42, 'y': 10, 'w': 40, 'h': 8 },
      'color': '#e51400',
      'url':  'http://www.lequipe.fr/rss/actu_rss.xml',
      'icon': 'app/feed/lequipe/icon.svg',
      'size': 5 },
    { 'type': 'feed',
      'coord': { 'x': 1, 'y': 19, 'w': 40, 'h': 8 },
      'color': '#a20025',
      'url':  'http://com.clubic.feedsportal.com/c/33464/f/581979/index.rss',
      'icon': 'app/feed/clubic/icon.svg',
      'size': 5 },
    { 'type': 'feed',
      'coord': { 'x': 42, 'y': 19, 'w': 40, 'h': 8 },
      'color': '#0050ef',
      'url':  'http://www.developpez.com/index/rss',
      'icon': 'app/feed/developpez/icon.svg',
      'size': 5 },
    { 'type': 'feed',
      'coord': { 'x': 1, 'y': 28, 'w': 40, 'h': 8 },
      'color': '#647687',
      'url':  'http://www.lemonde.fr/rss/une.xml',
      'icon': 'app/feed/lemonde/icon.svg',
      'size': 5 },
    { 'type': 'feed',
      'coord': { 'x': 42, 'y': 28, 'w': 40, 'h': 8 },
      'color': '#7a3b3f',
      'url':  'http://www.velaux.fr/rss20.xml',
      'icon': 'app/feed/velaux/icon.svg',
      'size': 5 },

    // kraland.
    { 'type': 'kraland',
      'coord': { 'x': 1, 'y': 37, 'w': 40, 'h': 8 },
      'color': '#e51400',
      'size': 5,
      'selection': 'Structurie ; D\u00e9structural' },

    // urtikan.
    { 'type': 'urtikan',
      'coord': { 'x': 114, 'y': 1, 'w': 19, 'h': 18 } },

    // tv.
    { 'type': 'tv',
      'coord': { 'x': 83, 'y': 10, 'w': 30, 'h': 31 },
      'color': '#647687',
      'channels': { 'exclude': [ 4 ] } },

    // weather.
    { 'type': 'weather',
      'coord': { 'x': 114, 'y': 20, 'w': 19, 'h': 16 },
      'color': '#1ba1e2',
      'appid': '57dd115c27d1747c422a74e8530735c6',
      'city': 'Velaux,fr',
      'departement': '13' },

    // cdanslair.
    { 'type': 'cdanslair',
      'coord': { 'x': 83, 'y': 1, 'w': 30, 'h': 4 },
      'color': '#1ba1e2' },

    // om.
    { 'type': 'om',
      'coord': { 'x': 83, 'y': 42, 'w': 26, 'h': 3 },
      'color': '#1ba1e2' },
];
