Medley.Routers.Main = Backbone.Router.extend({
	
	routes: { 
      ""                    :              "browser",
      "editor"              :              "editor",
      "register"            :              "register"
    },

    initialize: function() {
        _.bindAll(this);
    }, // /initialize

    browser: function() {
        var header = new Medley.Views.Header();
        var screenBrowser = new Medley.Views.ScreenBrowser();
        $('#dashboard-container').html(screenBrowser.render().$el); 
    }, // /home

    editor: function() {
        var header = new Medley.Views.Header();
        var screenEditor = new Medley.Views.ScreenEditor();
    },

    register: function() {
        var registrationView = new Medley.Views.Registration();
    }

}); // /Router.Deals

