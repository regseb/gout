Date.prototype.format = function (pattern) {
    "use strict";
    var MONTHS = ["janvier", "février", "mars", "avril", "mai", "juin",
                  "juillet", "aout", "septembre", "octobre", "novembre",
                  "décembre"];
    var DAYS = ["dimanche", "lundi", "mardi", "mercredi", "jeudi", "vendredi",
                "samedi" ];

    var year    = this.getFullYear();
    var month   = this.getMonth() + 1;
    var date    = this.getDate();
    var day     = this.getDay();
    var hours   = this.getHours();
    var minutes = this.getMinutes();

    return pattern.replace("yyyy",  ("0000" + year).slice(-4))
                  .replace("MMMMM", MONTHS[month - 1])
                  .replace("MM",    ("00" + month).slice(-2))
                  .replace("EEEEE", DAYS[day])
                  .replace("dd",    ("00" + date).slice(-2))
                  .replace("HH",    ("00" + hours).slice(-2))
                  .replace("mm",    ("00" + minutes).slice(-2));
}; // Date.format()
