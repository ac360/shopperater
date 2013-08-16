Medley.Routers.Main = Backbone.Router.extend({
	
	routes: { 
      ""                    :              "browser",
      "editor"              :              "editor"
    },

    initialize: function() {
        _.bindAll(this);
    }, // /initialize

    browser: function() {
        var screenBrowser = new Medley.Views.ScreenBrowser();
        $('#dashboard-container').html(screenBrowser.render().$el); 
    }, // /home

    editor: function() {
        var screenEditor = new Medley.Views.ScreenEditor();
    }

}); // /Router.Deals

