Medley.Views.EditorMedleyPreviewDraftMode = Backbone.View.extend({
	
	tagName: "div",
    className: "row",
	template: JST['screens/editor/medley_preview_draft_mode'],

	initialize: function() {
		_.bindAll(this);
        console.log("You Are In Draft Mode...", this.model);
	},

	events: {
    },

    loadMedleyDraft: function(model) {
        var gridster = M.instantiateGridster();
        _.each(this.model.items, function(product) { 
            if ( product.id !== null ) {
                if (product.x == 1) {
                    gridster.add_widget('<li class="medley-grid-item new-item item-small" data-row="1" data-col="1" data-sizex="1" data-sizey="1" data-id="' + product.id + '" data-title="' + product.title + '" data-price="' + product.price + '" data-imagesmall="' + product.img_small + '" data-imagelarge="' + product.img_big + '" data-category="' + product.category + '" data-source="' + product.source + '" data-link="' + product.link + '"></li>', product.x, product.y, product.c, product.r);
                } else if (product.x == 2 && product.y ==1) {
                    gridster.add_widget('<li class="medley-grid-item new-item item-medium" data-row="1" data-col="1" data-sizex="1" data-sizey="1" data-id="' + product.id + '" data-title="' + product.title + '" data-price="' + product.price + '" data-imagesmall="' + product.img_small + '" data-imagelarge="' + product.img_big + '" data-category="' + product.category + '" data-source="' + product.source + '" data-link="' + product.link + '"></li>', product.x, product.y, product.c, product.r);
                } else if (product.x == 2 && product.y == 2) {
                    gridster.add_widget('<li class="medley-grid-item new-item item-large" data-row="1" data-col="1" data-sizex="1" data-sizey="1" data-id="' + product.id + '" data-title="' + product.title + '" data-price="' + product.price + '" data-imagesmall="' + product.img_small + '" data-imagelarge="' + product.img_big + '" data-category="' + product.category + '" data-source="' + product.source + '" data-link="' + product.link + '"></li>', product.x, product.y, product.c, product.r);
                };

                var itemView = new Medley.Views.EditorProduct({ model: product });
                $('.new-item').html(itemView.render().$el)
                $('.new-item').removeClass('new-item')
            }
        });
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

	render: function() {
        var self = this;
        if (self.model !== false) {
            this.$el.html(this.template({ model: self.model })).fadeIn(1000);
            // Defer the instantiation of Gridster so that it happens at the end of everything else
            _.defer( function() { self.loadMedleyDraft(self.model); } )
        } else {
            alert("Error: The Medley you are trying to remix was not saved to Local Storage")
        }
        
        // Load User Information
        _.defer( function() { self.loadUserInformation(); } )

        return this;
    } // /render

});