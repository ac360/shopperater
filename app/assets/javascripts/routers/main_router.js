Shopperater.Routers.Main = Backbone.Router.extend({
	
	routes: {
    	"":                              "homePage"
    },

    initialize: function() {
      _.bindAll(this);

    }, // End of initialize

    homePage: function() {
      var modulePrimarySearch = new Shopperater.Views.ModulePrimarySearch({})
      var moduleCart = new Shopperater.Views.ModuleCart({})
      $('#module-cart-container').html(moduleCart.render().$el);
    }, // END home

    

}); // End of Router.Deals
