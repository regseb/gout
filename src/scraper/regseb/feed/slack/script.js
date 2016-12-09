define(["jquery"], function ($) {
    "use strict";

    const decode = function (input) {
        const ENTITIES = {
            "&amp;":  "&",
            "&lt;":   "<",
            "&gt;":   ">",
            "&apos;": "'",
            "&quot;": "\""
        };
        let output = input;
        for (let entity in ENTITIES) {
            output = output.replace(new RegExp(entity, "g"), ENTITIES[entity]);
        }
        return output;
    }; // decode()

    return class {
        constructor({ group, token, channel }) {
            this.group   = group;
            this.token   = token;
            this.channel = channel;
            this.users   = {};
        } // constructor()

        init() {
            const that = this;
            // Si la liste des membres du groupe est déjà renseignée : ne rien
            // faire.
            if (0 !== Object.keys(this.users).length) {
                return Promise.resolve();
            }

            // Chercher l'identifiant du channel.
            let url = "https://" + that.group + ".slack.com/api/channels.list" +
                      "?token=" + that.token;
            return $.getJSON(url).then(function (response) {
                for (let channel of response.channels) {
                    if (that.channel === channel.name) {
                        that.channel = channel.id;
                        break;
                    }
                }
            // Récupérer la liste des membres du groupe.
            }).then(function () {
                url = "https://" + that.group + ".slack.com/api/users.list" +
                      "?token=" + that.token;
                return $.getJSON(url).then(function (response) {
                    for (let member of response.members) {
                        that.users[member.id] = member["real_name"];
                    }
                });
            });
        } // init()

        extract(size) {
            const that = this;
            return that.init().then(function () {
                const url = "https://" + that.group + ".slack.com/api/" +
                            "channels.history?token=" + that.token +
                            "&channel=" + that.channel + "&count=" + size;
                return $.getJSON(url).then(function (response) {
                    return response.messages.map(function (message) {
                        return {
                            "title": that.users[message.user] + " : " +
                                     decode(message.text),
                            "desc":  "",
                            "link":  "https://" + that.group + ".slack.com/" +
                                     "messages/" + that.channel + "?" +
                                     message.ts,
                            "guid":  message.ts,
                            "date":  parseInt(message.ts, 10)
                        };
                    });
                });
            });
        } // extract()
    };
});
