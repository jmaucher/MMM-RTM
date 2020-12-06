Module.register("MMM-RTM", {

    defaults: {
        url: "",
        interval: 3 // how often to refresh (in hours)
    },
    getScripts: function () {
        return ["modules/MMM-RTM/js/jquery-3.1.1.min.js", "modules/MMM-RTM/js/feednami.js"];
    },
    getStyles: function () {
        return ["modules/MMM-RTM/css/style.css"];
    },
    start: function () {
        Log.info("Starting module: " + this.name);
        var self = this;
        var timeout = this.config.interval * 60 * 60 * 1000; // hours to milliseconds
        setInterval(function () {
            self.updateDom();
        }, timeout);
    },

    getDom: function () {
        var wrapper = document.createElement("div");
        var url = this.config.url;
        feednami.load(url, function (result) {
            if (result.error) {
                console.log(result.error);
            } else {
                var entries = result.feed.entries;
                for (var i = 0; i < entries.length; i++) {
                    var entry = entries[i];
                    var title = entry.title;
                    console.log(entry);
                    var x = document.createElement("div");
                    x.innerHTML = entry.title;
                    wrapper.append(x);
                }
            }
        });
        return wrapper;
    }
});
