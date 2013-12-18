Medley.Views.ShowMedleyPreview = Backbone.View.extend({
  
  tagName: "div",
  id: "",
  className: "",
  template: JST['screens/show/medley_preview'],

  initialize: function() {
    _.bindAll(this);
    var self = this;
    console.log("Showing this Medley: ", this.model);
  }, // initialize

  events: {

  },

  addItemsToMedley: function() {
      var self = this;
      self.options.gridster = M.instantiateGridster();
      _.each(this.model.items, function(item) {
          if ( item.id !== null ) {
              // Find Item Size and set special class...
              if (item.x == 1) {
                  self.options.gridster.add_widget('<li class="medley-grid-item item-small m-box-shadow-two" data-id="' + item.id + '" data-title="' + item.title + '" data-price="' + item.price + '" data-imagesmall="' + item.img_small + '" data-imagelarge="' + item.img_big + '" data-category="' + item.category + '" data-source="' + item.source + '" data-link="' + item.link + '"><div id="medley-item-image-container"><img src="' + item.img_small + '" class="product-image" draggable="false"></div></li>', item.x, item.y, item.c, item.r); 
              } else if (item.x == 2 && item.y ==1) {
                  self.options.gridster.add_widget('<li class="medley-grid-item item-medium m-box-shadow-two" data-id="' + item.id + '" data-title="' + item.title + '" data-price="' + item.price + '" data-imagesmall="' + item.img_small + '" data-imagelarge="' + item.img_big + '" data-category="' + item.category + '" data-source="' + item.source + '" data-link="' + item.link + '"><div id="medley-item-image-container"><img src="' + item.img_big + '" class="product-image" draggable="false"></div></li>', item.x, item.y, item.c, item.r); 
              } else if (item.x == 2 && item.y == 2) {
                  self.options.gridster.add_widget('<li class="medley-grid-item item-large m-box-shadow-two" data-id="' + item.id + '" data-title="' + item.title + '" data-price="' + item.price + '" data-imagesmall="' + item.img_small + '" data-imagelarge="' + item.img_big + '" data-category="' + item.category + '" data-source="' + item.source + '" data-link="' + item.link + '"><div id="medley-item-image-container"><img src="' + item.img_big + '" class="product-image" draggable="false"></div></li>', item.x, item.y, item.c, item.r); 
              }
          };
      });
  },

  render: function () {
    var self = this;
    this.$el.html(this.template({ model: this.model })).fadeIn(500);
    // Defer the instantiation of Gridster so that it happens at the end of everything else
    _.defer( function() { self.addItemsToMedley() })
    // Manual Event Binder for Notification Modal Hide
    return this;
  }

});

