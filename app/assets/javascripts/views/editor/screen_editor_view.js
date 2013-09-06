Medley.Views.ScreenEditor = Backbone.View.extend({
	
	el: "#dashboard-container",

	initialize: function() {
		_.bindAll(this);
	    
			// Fetch Parameters, if any...
			var query = location.search.substr(1);
			if(query){
				var data = query.split("&");
		    	var params = {};
				for(var i=0; i<data.length; i++) {
				    var item = data[i].split("=");
				    params[item[0]] = item[1];
				}
			};
			// Check for SEARCH Param
			if ( params !== undefined && params.search !== undefined ){
					var editorSearch = new Medley.Views.EditorSearch({ params: params });
			} else {
					var editorSearch = new Medley.Views.EditorSearch({});
			}
			// Check for REFERRAL Param
			if ( params !== undefined && params.referral !== undefined ){
					var editorMedleyPreview = new Medley.Views.EditorMedleyPreview({ params: params });
					$('#module-medley-editor').html(editorMedleyPreview.render().$el); 

			// Check for REMIX Param
			} else if (  params !== undefined && params.remix !== undefined ) {
					var editorMedleyPreview = new Medley.Views.EditorMedleyPreview({});
					$('#module-medley-editor').html(editorMedleyPreview.render().$el);
			
			// Check for PLAIN CREATE MODE
			} else {
					var editorMedleyPreview = new Medley.Views.EditorMedleyPreview({});
					$('#module-medley-editor').html(editorMedleyPreview.render().$el);
			};
	},

	events: {
		"dragstart .item-result-row"                :   "gridSetDataTransferObject",
		"click #publish-next-button-one"            :   "loadPublishScreenTwo",
		'click .publish-cancel'                     :   'cancelPublish',
		'click #medley-publish-button'              :   'publishMedley'
	},

	gridSetDataTransferObject: function(e) {
	    e.originalEvent.dataTransfer.setData("productID", $(e.currentTarget).attr('data-id'));
	    e.originalEvent.dataTransfer.setData("productTitle", $(e.currentTarget).attr('data-title'));
	    e.originalEvent.dataTransfer.setData("productPrice", $(e.currentTarget).attr('data-price'));
	    e.originalEvent.dataTransfer.setData("productImageSmall", $(e.currentTarget).attr('data-image-small'));
	    e.originalEvent.dataTransfer.setData("productImageLarge", $(e.currentTarget).attr('data-image-large'));
	    e.originalEvent.dataTransfer.setData("productCategory", $(e.currentTarget).attr('data-category'));
	    e.originalEvent.dataTransfer.setData("productSource", $(e.currentTarget).attr('data-source'));
	    e.originalEvent.dataTransfer.setData("productLink", $(e.currentTarget).attr('data-link'));
	},

	publishMedley: function() {
        $('#tags-screen').hide();
        $('#publish-medley-modal').modal()
        $('#publish-medley-modal').modal('show')
        $('#publish-medley-modal').on('shown.bs.modal', function () {
            $('#category-list').niceScroll({cursorcolor:"#999999"});
            $('#category-screen').fadeIn(400)
        })
        // var medleyItemsCount = $("#medley-grid li").size()
        // if (medleyItemsCount > 1) {
        //     var thisMedley              = {};
        //     thisMedley.title            = $('#medley-title').text();
        //     thisMedley.description      = $('#description').text();
        //     thisMedley.items            = [];
        //     $('.medley-grid-item').each(function(index, elem) {
        //             var thisItem = {};
        //             thisItem.row        = $(elem).attr('data-row')
        //             thisItem.col        = $(elem).attr('data-col')
        //             thisItem.sizex      = $(elem).attr('data-sizex')
        //             thisItem.sizey      = $(elem).attr('data-sizey')
        //             thisItem.id         = $(elem).attr('data-id')
        //             thisItem.title      = $(elem).attr('data-title')
        //             thisItem.price      = $(elem).attr('data-price')
        //             thisItem.imagesmall = $(elem).attr('data-imagesmall')
        //             thisItem.imagelarge = $(elem).attr('data-imagelarge')
        //             thisItem.category   = $(elem).attr('data-category')
        //             thisItem.source     = $(elem).attr('data-source')
        //             thisItem.link       = $(elem).attr('data-link')
        //             thisMedley.items.push( thisItem );
        //     });
        //     console.log(thisMedley);
        // } else {
        //     alert("A Medley must contain at least two items before it can be published...  Otherwise it's not a Medley!")
        // };
    },

	loadPublishScreenTwo: function() {
		if($('input:radio:checked').length > 0){
				$('#category-screen').fadeOut(200, function() {
				    $('#tags-screen').fadeIn(200);
				});
		 }else{
		    	alert("Please select a Category for your Medley");
		 }
	},

	loadPublishScreenOne: function() {
		$('#category-screen').fadeIn(200)
	},

	cancelPublish: function() {
        $('#publish-medley-modal').modal('hide')
    },

	render: function () {
		return this;
	}

});