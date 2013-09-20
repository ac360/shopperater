Medley.Views.EditorMedleyPreviewPlainMode = Backbone.View.extend({
	
	tagName: "div",
    className: "row",
	template: JST['screens/editor/medley_preview'],

	initialize: function() {
		_.bindAll(this);
        if ( this.options.params !== undefined ) {
            console.log("Below are the params passed into the Preview/Viewer View:")
            console.log(this.options.params)
        }
	},

	events: {
		'dragleave #medley-container' 		       : 'gridUnhighlightDropZone',
		'drop #medley-container'      		       : 'gridAddItemToGrid',
	    'dragover #medley-container'  		       : 'gridHighlightDropzone'
    },

    loadUserInformation: function() {
        if ( medleyAuthenticated == true) {
            var userInfo = new Medley.Models.CurrentUser({});
            userInfo.fetch({
                success: function (response) {
                    var result = response.toJSON();
                    console.log("Here is the Current User Information:", result)
                    if (result.error) {
                       console.log(result.error)
                    } else {
                        var userInformationView = new Medley.Views.EditorUserInformation({ model: result });
                        $('#user-information').html(userInformationView.render().$el);
                    }
                } // End Success
            }); // End fetch 
        } else {
            var anonUser = {}
            anonUser.email = "No Email"
            anonUser.username = "Anonymous"
            var userInformationView = new Medley.Views.EditorUserInformation({ model: anonUser });
            $('#user-information').html(userInformationView.render().$el);
        }
    },

    loadReferralMedley: function(collection, params) {
        console.log("running", collection)
        var gridster = M.instantiateGridster();
        _.each(collection, function(product) { 
            console.log(product)
            // Build New Model Object
            product.size  = 1
            product.sizex = 1
            product.sizey = 1
            gridster.add_widget('<li class="medley-grid-item new-item" data-row="1" data-col="1" data-sizex="1" data-sizey="1" data-id="' + product.id + '" data-title="' + product.title + '" data-price="' + product.price + '" data-image="' + product.img_small + '" data-category="' + product.category + '" data-source="' + product.source + '" data-link="' + product.link + '"></li>', 1, 1, 1, 1);
            var itemView = new Medley.Views.EditorProduct({ model: product });
            $('.new-item').html(itemView.render().$el)
            $('.new-item').removeClass('new-item')
            console.log("Referral Medley Loaded Into Viewer Area")
        });
    },

    loadRemixedMedley: function(model) {
        var gridster = M.instantiateGridster();
        _.each(model.items, function(product) { 
            if ( product.id !== null ) {
                gridster.add_widget('<li class="medley-grid-item new-item" data-row="1" data-col="1" data-sizex="1" data-sizey="1" data-id="' + product.id + '" data-title="' + product.title + '" data-price="' + product.price + '" data-imagesmall="' + product.img_small + '" data-imagelarge="' + product.img_big + '" data-category="' + product.category + '" data-source="' + product.source + '" data-link="' + product.link + '"></li>', product.x, product.y, product.c, product.r);
                var itemView = new Medley.Views.EditorProduct({ model: product });
                $('.new-item').html(itemView.render().$el)
                $('.new-item').removeClass('new-item')
            }
        });
    },

    instantiateGridster: function() {
        M.instantiateGridster();
    },

	render: function() {
        var self = this;

        // Check If REFERRAL by looking for the referral=true parameter
        if( this.options.params !== undefined && this.options.params.referral !== undefined ){
            console.log("You Are In Referral Mode:");
            // Perform Product Look-up
            var referralProducts = new Medley.Collections.ItemLookup();
            referralProducts.fetch({
                data: { 
                    product_one_retailer: self.options.params.product_one_retailer,
                    product_one_id: self.options.params.product_one_id
                },
                processData: true,
                success: function (response) {
                    var collection = response.toJSON();
                    console.log("Product Lookup Completed...  Results Here:", collection)
                    self.$el.html(self.template({ params: self.options.params })).fadeIn(1000);
                    // Load in the Referral Medley Items
                    _.defer( function() { self.loadReferralMedley(collection); } )
                } // /success
            }); // /referralProducts.fetch

        // Check If REMIX by looking for the remix=true parameter
        } else if ( this.options.params !== undefined && this.options.params.remix !== undefined ) {
            // Get Medley from local storage, if nothing is in local storage, return false
            self.model = $.jStorage.get("medley_current", false);
            if (self.model != false) {
                console.log("You Are In Remix Mode - Here is the Medley you are remixing: ", self.model);
                this.$el.html(this.template({ params: self.options.params, model: self.model })).fadeIn(1000);
                // Defer the instantiation of Gridster so that it happens at the end of everything else
                _.defer( function() { self.loadRemixedMedley(self.model); } )
            };

        // Check if Plain CREATE Mode
        } else {
            existingMedley = $.jStorage.get("medley_current", false)
            if ( existingMedley !== false ) {
                this.$el.html(this.template({ params: existingMedley })).fadeIn(1000)
            } else {
                var params = undefined;
                this.$el.html(this.template({ params: params })).fadeIn(1000)
            }
            // Defer the instantiation of Gridster so that it happens at the end of everything else
            _(this.instantiateGridster).defer();
        };

        // Load User Information
        _(this.loadUserInformation).defer();

        return this;
    } // /render

});