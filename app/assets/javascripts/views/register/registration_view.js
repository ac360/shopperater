Medley.Views.Registration = Backbone.View.extend({
	
	el: "#registration-container",

	initialize: function() {
		_.bindAll(this);
	},

	events: {
		"keyup .registration-username"      :  "checkUsername",
		"keyup .registration-email"      	:  "checkEmail",
		"keyup .registration-password"      :  "checkPassword"
	},

	checkUsername: function(e) {
		var username = $(e.currentTarget).val()
		if(username.match(/[^0-9a-z]/i)) {
			$('.registration-username').tooltip({
				placement:'top',
				title: 'Only Letters & Numbers Allowed',
				trigger: 'manual',
				delay: { hide: 500 }
			});
		    $('.registration-username').tooltip('show');
		    $('.tooltip-inner').css('background-color', '#d94f4f')
		    $('.tooltip-arrow').css('border-top-color', '#d94f4f')
		    username = username.replace(/[_\W]/g, '');
		    $('.registration-username').val(username);
		} else {
			setTimeout(function(){
		        $('.registration-username').tooltip('hide')
		    }, 3000);
		}
    },

    checkEmail: function(e) {
    },
    
    checkPassword: function(e) {
    },

	render: function () {
		return this;
	}

});