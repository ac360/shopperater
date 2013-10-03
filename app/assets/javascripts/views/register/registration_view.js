Medley.Views.Registration = Backbone.View.extend({
	
	el: "#registration-container",

	initialize: function() {
		_.bindAll(this);
		this.options.validations = {}
	},

	events: {
		"keyup .registration-username"      :  "validateUsername",
		"keyup .registration-email"      	:  "validateEmail",
		"keyup .registration-password"      :  "validatePassword",
		"click #sign-up-button"             :  "runAllValidations"
	},

    runAllValidations: function(e) {
    	e.preventDefault();
    	this.validateUsername();
    	this.validateEmail();
    	this.validatePassword();
    	if (this.options.validations.username == true && this.options.validations.email == true && this.options.validations.password == true) {
    		document.getElementById('new_user').submit();
    	} 
    	console.log(this.options.validations);
    },

    validateUsername: function() {
	    	var self = this;
	    	var status = false
	    	var username = $('.registration-username').val()
	    	if (username.length === 0) {
		        $('#username-notifications').removeClass('hide').html('<p style="color:#ffd1d1">Username is blank</p>')
		        $('.registration-username').css("background-color", "#ffd1d1");
		        this.options.validations.username = false
		        return;  
		    }
		    if (username.length < 3) {
		        
		        $('#username-notifications').removeClass('hide').html('<p style="color:#ffd1d1">Username must be at least 3 characters long</p>')
		        $('.registration-username').css("background-color", "#ffd1d1");
		        this.options.validations.username = false
		        return;  
		    }
		    if (username.match(/[^0-9a-z]/i)) {
		    	
		    	$('#username-notifications').removeClass('hide').html('<p style="color:#ffd1d1">Letters & Numbers Only Please</p>')
		    	$('.registration-username').css("background-color", "#ffd1d1");
		    	this.options.validations.username = false
		    	return;
			} else {
				// Check if username exists
		    	var usernameValidation = new Medley.Models.UsernameValidation({})
			    usernameValidation.fetch({
		                data: { username: $('.registration-username').val() },
		                processData: true,
		                success: function (response) {
		                    var result = response.toJSON();
		                    if (result.valid == true) {
		    					$('#username-notifications').removeClass('hide').html('<p style="color:#ffd1d1">Username Has Been Taken</p>');
		    					$('.registration-username').css("background-color", "#ffd1d1");
		    					self.options.validations.username = false
		    					return;
		                    } else if (result.valid == false) {
		                    	$('#username-notifications').removeClass('hide').html('<p style="color:#DBFFE3"><i class="glyphicon glyphicon-ok"></i> Username Is Available!</p>');
		                    	$('.registration-username').css("background-color", "#dbffe3");
		                    	self.options.validations.username = true
		                    	return;
		                    }
		            } // End Success
		        }); // End fetch 
		    }
    },

    validateEmail: function() {
    	var self = this;
	    if( !M.validateEmailAddress($('.registration-email').val()) ) { 
		    	$('#email-notifications').removeClass('hide').html('<p style="color:#ffd1d1">Enter A Valid Email Address</p>');
		    	$('.registration-email').css("background-color", "#ffd1d1");
		    	this.options.validations.email = false
		        return;
	     } else {
		     	var emailValidation = new Medley.Models.EmailValidation({})
			    emailValidation.fetch({
			            data: { email: $('.registration-email').val() },
			            processData: true,
			            success: function (response) {
			                var result = response.toJSON();
			                if (result.valid == true) {
								$('#email-notifications').removeClass('hide').html('<p style="color:#ffd1d1">An Account With This Email Already Exists</p>');
								$('.registration-email').css("background-color", "#ffd1d1");
								self.options.validations.email = false
								return;
			                } else if (result.valid == false) {
			                	console.log("Email Address Has Not Been Taken");
			                	$('#email-notifications').addClass('hide')
			                	$('.registration-email').css("background-color", "#dbffe3");
			                	self.options.validations.email = true
			                	return;
			                }
			            } // End Success
		        }); // End fetch 
	     } // End if statement
    },

    validatePassword: function() {
    	var self = this;
    	if($('.registration-password').val().length === 0) {
	        
	        $('#password-notifications').removeClass('hide').html('<p style="color:#ffd1d1">Password is blank</p>');
	        $('.registration-password').css("background-color", "#ffd1d1");
	        this.options.validations.password = false
	        return;  
	    } else if ($('.registration-password').val().length < 8) {
	        
	        $('#password-notifications').removeClass('hide').html('<p style="color:#ffd1d1">Password must be at least 8 characters long</p>');
	        $('.registration-password').css("background-color", "#ffd1d1");
	        this.options.validations.password = false
	        return;  
	    } else {
	    	this.options.validations.password = true
	        $('#password-notifications').addClass('hide');
	        $('.registration-password').css("background-color", "#dbffe3");
	    }
    },

	render: function () {
		return this;
	}

});