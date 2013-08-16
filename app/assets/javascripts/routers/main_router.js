Shopperater.Routers.Main = Backbone.Router.extend({
	
	routes: {
    	"":                              "homePage"
    },

    initialize: function() {
      _.bindAll(this);

    }, // End of initialize

    homePage: function() {

      var screenDashboard = new Shopperater.Views.ScreenDashboard({});
      
    }, // END home

    

}); // End of Router.Deals
