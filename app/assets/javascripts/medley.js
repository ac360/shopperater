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
  if (window.location.hash && window.location.hash == '#_=_') {
      window.location = '';
  }
  Medley.initialize();
});


// Medley Helper Functions
var M = {};
// Create Helper Object Functions
M.checkMedleyItemCount = function() {
  var medleyItemsCount = $("#medley-grid li").size()
  if (medleyItemsCount < 12) {
    return true;
  } else {
    return false;
  };
} // /checkMedleyItems

M.instantiateGridster = function() {
  var gridster = $(".gridster ul").gridster({
      widget_margins: [5, 5],
      widget_base_dimensions: [90, 90],
      avoid_overlapped_widgets: true
  }).data("gridster");
  return gridster;
}

M.validateEmailAddress = function(emailAddress) {
    var pattern = new RegExp(/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i);
    return pattern.test(emailAddress);
};

M.getCategory = function(number) {
  number = parseInt(number) 
  switch (number) {
    case 1:
      var category = "Appliances"
      return category;
      break;
    case 2:
      var category = "Arts, Crafts & Sewing"
      return category;
      break;
    case 3:
      var category = "Automotive"
      return category;
      break;
    case 4:
      var category = "Baby"
      return category;
      break;
    case 5:
      var category = "Beauty"
      return category;
      break;
    case 6:
      var category = "Books"
      return category;
      break;
    case 7:
      var category = "Cell Phones & Accessories"
      return category;
      break;
    case 8:
      var category = "Clothing & Accessories"
      return category;
      break;
    case 9:
      var category = "Collectibles"
      return category;
      break;
    case 10:
      var category = "Computers"
      return category;
      break;
    case 11:
      var category = "Electronics"
      return category;
      break;
    case 12:
      var category = "Grocery & Gourmet Foods"
      return category;
      break;
    case 13:
      var category = "Health & Personal Care"
      return category;
      break;
    case 14:
      var category = "Home & Kitchen"
      return category;
      break;
    case 15:
      var category = "Industrial & Scientific"
      return category;
      break;
    case 16:
      var category = "Jewelry"
      return category;
      break;
    case 17:
      var category = "Movies & TV"
      return category;
      break;
    case 18:
      var category = "Music"
      return category;
      break;
    case 19: 
      var category = "Musical Instruments"
      return category;
      break;
    case 20:
      var category = "Patio, Lawn & Garden"
      return category;
      break;
    case 21:  
      var category = "Pet Supplies"
      return category;
      break;
    case 22:  
      var category = "Shoes"
      return category;
      break;
    case 23:  
      var category = "Software"
      return category;
      break;
    case 24:  
      var category = "Sports & Outdoors"
      return category;
      break;
    case 25:  
      var category = "Tools & Home Improvement"
      return category;
      break;
    case 26:  
      var category = "Toys & Games"
      return category;
      break;
    case 27:  
      var category = "Video Games"
      return category;
      break;
    case 28:  
      var category = "Watches"
      return category;
      break;
    default:
      var category = "Uncategorized"
      return category;
      break;
  }
}

M.placeCaretAtEnd = function(el) {
      el.focus();
      if (typeof window.getSelection != "undefined"
              && typeof document.createRange != "undefined") {
          var range = document.createRange();
          range.selectNodeContents(el);
          range.collapse(false);
          var sel = window.getSelection();
          sel.removeAllRanges();
          sel.addRange(range);
      } else if (typeof document.body.createTextRange != "undefined") {
          var textRange = document.body.createTextRange();
          textRange.moveToElementText(el);
          textRange.collapse(false);
          textRange.select();
      }
};

M.getParams = function() {
  var query = location.search.substr(1);
    if(query){
      var data = query.split("&");
      var params = {};
      for(var i=0; i<data.length; i++) {
          var item = data[i].split("=");
          params[item[0]] = item[1];
      }
      return params;
    };
}

M.removeMedleySizeClass = function(elem) {
  $(elem).removeClass('item-small');
  $(elem).removeClass('item-medium');
  $(elem).removeClass('item-large');
}


