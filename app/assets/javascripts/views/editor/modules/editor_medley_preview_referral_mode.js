Medley.Views.EditorMedleyPreviewReferralMode = Backbone.View.extend({
	
	tagName: "div",
    className: "row",
	template: JST['screens/editor/medley_preview_referral_mode'],

	initialize: function() {
		_.bindAll(this);
        console.log("You Are In Referral Mode...");
        console.log("Below are the params passed into the Preview/Viewer View:")
        console.log(this.options.params)
	},

	events: {
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

	render: function() {
        var self = this;
        // Perform Product Look-up for the IDs included in the parameters
        var referralProducts = new Medley.Collections.ItemLookup();
        referralProducts.fetch({
            data: { 
                product_one_retailer: self.options.params.product_one_retailer,
                product_one_id: self.options.params.product_one_id
            },
            processData: true,
            success: function (response) {
                var collection = response.toJSON();
                console.log("Product Lookup Completed.  Results Here:", collection)
                self.$el.html(self.template({ params: self.options.params })).fadeIn(1000);
                // Load in the Referral Medley Items
                _.defer( function() { self.loadReferralMedley(collection); } )
            } // /success
        }); // /referralProducts.fetch

        // Load User Information
        _.defer( function() { self.loadUserInformation(); } )

        return this;
    } // /render

});