Medley.Routers.Main = Backbone.Router.extend({
	
	routes: { 
      ""                    :              "browser",
      "editor"              :              "editor",
      ":id"                 :              "show",
      "register"            :              "register",
      "users/sign_up"       :              "register"
    },

    initialize: function() {
        _.bindAll(this);
        // Set Login Header
        M.userLoginStatus();
    }, // /initialize

    browser: function() {
        var header = new Medley.Views.Header();
        var screenBrowser = new Medley.Views.ScreenBrowser();
    }, // /home

    editor: function() {
        var header = new Medley.Views.Header();
        var screenEditor = new Medley.Views.ScreenEditor();
    },

    show: function(id) {
        var header = new Medley.Views.Header();
        var screenShow = new Medley.Views.ScreenShow({ id: id });
    },

    register: function() {
        var registrationView = new Medley.Views.Registration();
    }

}); // /Router.Deals

