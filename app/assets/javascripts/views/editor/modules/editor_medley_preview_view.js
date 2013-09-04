Medley.Views.EditorMedleyPreview = Backbone.View.extend({
	
	tagName: "div",
    className: "row",
	template: JST['screens/editor/medley_preview'],

	initialize: function() {
		_.bindAll(this);
        if ( this.options.params !== undefined ) {
            console.log("Below are the params passed into this view:")
            console.log(this.options.params)
        }
	},

	events: {
		'dragleave #medley-container' 		       : 'gridUnhighlightDropZone',
		'drop #medley-container'      		       : 'gridAddItemToGrid',
	    'dragover #medley-container'  		       : 'gridHighlightDropzone'
    },

    render: function () {
        var self = this;
        // Check If REFERRAL by looking for the referral=true parameter
        if( this.options.params !== undefined && this.options.params.referral !== undefined ){
                // Perform Product Look-up
                var referralProducts = new Medley.Collections.ItemLookup();
                referralProducts.fetch({
                    data: { 
                        product_one_retailer: this.options.params.product_one_retailer,
                        product_one_id: this.options.params.product_one_id
                    },
                    processData: true,
                    success: function (response) {
                        var collection = response.toJSON();
                        if (collection.error) {
                           console.log(collection.error)
                        } else {
                            self.$el.html(self.template({ collection: self.options.params }));
                            // Load in the Referral Medley Items
                            _(self.loadReferralMedley(collection)).defer();
                        };
                    }
                });
        // Check If REMIX by looking for the remix=true parameter
        } else if ( this.options.params !== undefined && this.options.params.remix !== undefined ) {
                this.$el.html(this.template());
                // Defer the instantiation of Gridster so that it happens at the end of everything else
                _(this.instantiateGridster).defer();
        // Check if Plain CREATE Mode
        } else {
                this.$el.html(this.template());
                // Defer the instantiation of Gridster so that it happens at the end of everything else
                _(this.instantiateGridster).defer();
        };
        // Load User Information
        _(this.loadUserInformation).defer();
        return this;
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
        }
    },

    loadReferralMedley: function(collection) {
        var gridster = M.instantiateGridster();
        _.each(collection, function(product) { 
            // Build New Model Object
            product.size  = 1
            product.sizex = 1
            product.sizey = 1
            gridster.add_widget('<li class="medley-grid-item new-item" data-row="1" data-col="1" data-sizex="1" data-sizey="1" data-id="' + product.id + '" data-title="' + product.title + '" data-price="' + product.price + '" data-image="' + product.img_small + '" data-category="' + product.category + '" data-source="' + product.source + '" data-link="' + product.link + '"></li>', 1, 1, 1, 1);
            var itemView = new Medley.Views.EditorProduct({ model: product });
            $('.new-item').html(itemView.render().$el)
            $('.new-item').removeClass('new-item')
            console.log("Referral Medley Loaded")
        });
    },

    gridHighlightDropzone: function(e) {
    	e.preventDefault();
    	$('#medley-container').addClass('drop-zone-highlight')
    },

    gridUnhighlightDropZone: function(e) {
    	$('#medley-container').removeClass('drop-zone-highlight')
    },

    gridAddItemToGrid: function(e) {
        //  Run Helper function to check how many Medley items are curerntly in the Medley
        if(M.checkMedleyItemCount()) {
            // Get Product from DataTransferObject that was set on dragstart
            var product = {}
            product.id           = e.originalEvent.dataTransfer.getData("productID");
            product.title        = e.originalEvent.dataTransfer.getData("productTitle");
            product.price        = e.originalEvent.dataTransfer.getData("productPrice");
            product.img_small    = e.originalEvent.dataTransfer.getData("productImage");
            product.category     = e.originalEvent.dataTransfer.getData("productCategory");
            product.source       = e.originalEvent.dataTransfer.getData("productSource");
            product.link         = e.originalEvent.dataTransfer.getData("productLink");
            product.sizex        = 1;
            product.sizey        = 1;
            product.size         = 1;
            console.log("You just added the Product below:");
            console.log(product);
            // Re-instantiate Gridster
            var gridster = M.instantiateGridster();
            gridster.add_widget('<li class="medley-grid-item new-item" data-row="1" data-col="1" data-sizex="1" data-sizey="1" data-id="' + product.id + '" data-title="' + product.title + '" data-price="' + product.price + '" data-image="' + product.img_small + '" data-category="' + product.category + '" data-source="' + product.source + '" data-link="' + product.link + '"></li>', 1, 1, 1, 1);
            var itemView = new Medley.Views.EditorProduct({ model: product });
            $('.new-item').html(itemView.render().$el)
            $('.new-item').removeClass('new-item')
        } else {
            alert("Sorry, Medlies can contain only 16 Items");
        };
        this.gridUnhighlightDropZone();
    },

    instantiateGridster: function() {
        M.instantiateGridster();
    },

	openRemixModal: function(e) {

		var medleyTitle = $('#medley-title').text()
		var medleyDescription = $('#medley-description').text()


        // This code is used to create new Medlies, but you are no longer using it here
    	// var newMedley = new Medley.Collections.Medlies();
        // newMedley.create({ 
        //        	title: medleyTitle, 
        //        	description:  ,
               	
        //        	item_one_id:  ,
        //        	item_one_title:  ,
        //        	item_one_price:  ,
        //        	item_one_image:  ,
        //        	item_one_category:  ,
        //        	item_one_source:  ,
        //        	item_one_affiliate_link:  ,
        //        	item_one_size_x:  ,
        //        	item_one_size_y:  ,
        //        	item_one_column:  ,
        //        	item_one_row:  ,

        //        	item_one_id:  ,
        //        	item_one_title:  ,
        //        	item_one_price:  ,
        //        	item_one_image:  ,
        //        	item_one_category:  ,
        //        	item_one_source:  ,
        //        	item_one_affiliate_link:  ,
        //        	item_one_size_x:  ,
        //        	item_one_size_y:  ,
        //        	item_one_column:  ,
        //        	item_one_row:  ,

        //        	item_one_id:  ,
        //        	item_one_title:  ,
        //        	item_one_price:  ,
        //        	item_one_image:  ,
        //        	item_one_category:  ,
        //        	item_one_source:  ,
        //        	item_one_affiliate_link:  ,
        //        	item_one_size_x:  ,
        //        	item_one_size_y:  ,
        //        	item_one_column:  ,
        //        	item_one_row:  ,

        //        	item_one_id:  ,
        //        	item_one_title:  ,
        //        	item_one_price:  ,
        //        	item_one_image:  ,
        //        	item_one_category:  ,
        //        	item_one_source:  ,
        //        	item_one_affiliate_link:  ,
        //        	item_one_size_x:  ,
        //        	item_one_size_y:  ,
        //        	item_one_column:  ,
        //        	item_one_row:  ,

        //        	item_one_id:  ,
        //        	item_one_title:  ,
        //        	item_one_price:  ,
        //        	item_one_image:  ,
        //        	item_one_category:  ,
        //        	item_one_source:  ,
        //        	item_one_affiliate_link:  ,
        //        	item_one_size_x:  ,
        //        	item_one_size_y:  ,
        //        	item_one_column:  ,
        //        	item_one_row:  ,

        //        	item_one_id:  ,
        //        	item_one_title:  ,
        //        	item_one_price:  ,
        //        	item_one_image:  ,
        //        	item_one_category:  ,
        //        	item_one_source:  ,
        //        	item_one_affiliate_link:  ,
        //        	item_one_size_x:  ,
        //        	item_one_size_y:  ,
        //        	item_one_column:  ,
        //        	item_one_row:  ,

        //        	item_one_id:  ,
        //        	item_one_title:  ,
        //        	item_one_price:  ,
        //        	item_one_image:  ,
        //        	item_one_category:  ,
        //        	item_one_source:  ,
        //        	item_one_affiliate_link:  ,
        //        	item_one_size_x:  ,
        //        	item_one_size_y:  ,
        //        	item_one_column:  ,
        //        	item_one_row:  ,

        //        	item_one_id:  ,
        //        	item_one_title:  ,
        //        	item_one_price:  ,
        //        	item_one_image:  ,
        //        	item_one_category:  ,
        //        	item_one_source:  ,
        //        	item_one_affiliate_link:  ,
        //        	item_one_size_x:  ,
        //        	item_one_size_y:  ,
        //        	item_one_column:  ,
        //        	item_one_row:  ,

        //        	item_one_id:  ,
        //        	item_one_title:  ,
        //        	item_one_price:  ,
        //        	item_one_image:  ,
        //        	item_one_category:  ,
        //        	item_one_source:  ,
        //        	item_one_affiliate_link:  ,
        //        	item_one_size_x:  ,
        //        	item_one_size_y:  ,
        //        	item_one_column:  ,
        //        	item_one_row:  ,

        //        	item_one_id:  ,
        //        	item_one_title:  ,
        //        	item_one_price:  ,
        //        	item_one_image:  ,
        //        	item_one_category:  ,
        //        	item_one_source:  ,
        //        	item_one_affiliate_link:  ,
        //        	item_one_size_x:  ,
        //        	item_one_size_y:  ,
        //        	item_one_column:  ,
        //        	item_one_row:  ,

        //        	item_one_id:  ,
        //        	item_one_title:  ,
        //        	item_one_price:  ,
        //        	item_one_image:  ,
        //        	item_one_category:  ,
        //        	item_one_source:  ,
        //        	item_one_affiliate_link:  ,
        //        	item_one_size_x:  ,
        //        	item_one_size_y:  ,
        //        	item_one_column:  ,
        //        	item_one_row:  ,

        //        	item_one_id:  ,
        //        	item_one_title:  ,
        //        	item_one_price:  ,
        //        	item_one_image:  ,
        //        	item_one_category:  ,
        //        	item_one_source:  ,
        //        	item_one_affiliate_link:  ,
        //        	item_one_size_x:  ,
        //        	item_one_size_y:  ,
        //        	item_one_column:  ,
        //        	item_one_row:  ,

        //        	item_one_id:  ,
        //        	item_one_title:  ,
        //        	item_one_price:  ,
        //        	item_one_image:  ,
        //        	item_one_category:  ,
        //        	item_one_source:  ,
        //        	item_one_affiliate_link:  ,
        //        	item_one_size_x:  ,
        //        	item_one_size_y:  ,
        //        	item_one_column:  ,
        //        	item_one_row:  ,

        //        	item_one_id:  ,
        //        	item_one_title:  ,
        //        	item_one_price:  ,
        //        	item_one_image:  ,
        //        	item_one_category:  ,
        //        	item_one_source:  ,
        //        	item_one_affiliate_link:  ,
        //        	item_one_size_x:  ,
        //        	item_one_size_y:  ,
        //        	item_one_column:  ,
        //        	item_one_row:  ,

        //        	item_one_id:  ,
        //        	item_one_title:  ,
        //        	item_one_price:  ,
        //        	item_one_image:  ,
        //        	item_one_category:  ,
        //        	item_one_source:  ,
        //        	item_one_affiliate_link:  ,
        //        	item_one_size_x:  ,
        //        	item_one_size_y:  ,
        //        	item_one_column:  ,
        //        	item_one_row:  ,

        //        	item_one_id:  ,
        //        	item_one_title:  ,
        //        	item_one_price:  ,
        //        	item_one_image:  ,
        //        	item_one_category:  ,
        //        	item_one_source:  ,
        //        	item_one_affiliate_link:  ,
        //        	item_one_size_x:  ,
        //        	item_one_size_y:  ,
        //        	item_one_column:  ,
        //        	item_one_row:  
               	
        //     });
    },

});