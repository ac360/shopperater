Shopperater.Routers.Main = Backbone.Router.extend({
	
	routes: {
    	"":                              "homePage",
      "remix":                         "remixPage"
    },

    initialize: function() {
        _.bindAll(this);
    }, // End of initialize

    homePage: function() {
        var screenBrowseMedlies = new Shopperater.Views.ScreenBrowseMedliesView();
        $('#dashboard-container').html(screenBrowseMedlies.render().$el); 
    }, // End home

    remixPage: function() {
        var screenRemixMedley = new Shopperater.Views.ScreenRemixMedleyView();
        $('#dashboard-container').html(screenRemixMedley.render().$el); 
    }
}); // End of Router.Deals
