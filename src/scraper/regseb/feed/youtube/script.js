define(["jquery"], function ($) {
    "use strict";

    const URL_API = "https://www.googleapis.com/youtube/v3/";

    return class {
        constructor({ user, key }) {
            this.user = user;
            this.key  = key;
            this.playlist = null;
        } // constuctor()

        init() {
            const that = this;
            if (null !== this.playlist) {
                return Promise.resolve(this.playlist);
            }

            return $.getJSON(URL_API + "channels?part=contentDetails" +
                             "&forUsername=" + this.user + "&key=" + this.key)
                                                         .then(function (data) {
                that.playlist = data.items[0].contentDetails.relatedPlaylists
                                                                       .uploads;
                return that.playlist;
            });
        } // init()

        list(size) {
            const that = this;
            return that.init().then(function (playlist) {
                const url = URL_API + "playlistItems?key=" + that.key +
                            "&part=snippet&playlistId=" + playlist +
                            "&maxResults=" + size;
                return $.getJSON(url).then(function (data) {
                    return data.items.map(function (item) {
                        return {
                            "title": item.snippet.title,
                            "desc":  item.snippet.description,
                            "link":  "https://www.youtube.com/watch?v=" +
                                     item.snippet.resourceId.videoId,
                            "guid":  item.snippet.resourceId.videoId,
                            "date":  new Date(item.snippet.publishedAt)
                                                                      .getTime()
                        };
                    });
                });
            });
        } // list()
    };
});
