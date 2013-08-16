window.Medley = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
  	Medley.Router = new Medley.Routers.Main();
    if (!Backbone.history.started) {
            Backbone.history.start({ pushState: true });
            Backbone.history.started = true;
    }
  }
};

$(document).ready(function(){
  Medley.initialize();
});
