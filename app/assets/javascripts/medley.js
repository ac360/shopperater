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


// Medley Helper Functions
var M = {};
// Create Helper Object Functions
M.checkMedleyItemCount = function() {
  var medleyItemsCount = $("#medley-grid li").size()
  if (medleyItemsCount < 16) {
    return true;
  } else {
    return false;
  };
} // /checkMedleyItems

M.instantiateGridster = function() {
  var gridster = $(".gridster ul").gridster({
                    widget_margins: [5, 5],
                    widget_base_dimensions: [90, 90]
  }).data("gridster");
  return gridster;
}


