class Users::OmniauthCallbacksController < Devise::OmniauthCallbacksController
  
  def facebook

      # With this code you can see the data sent by facebook
      omniauth = request.env["omniauth.auth"] 

      @user = User.find_for_facebook_oauth(request.env["omniauth.auth"], current_user)

      if @user.persisted?
        sign_in_and_redirect @user, :event => :authentication
      else
        session["devise.facebook_data"] = request.env["omniauth.auth"]
        redirect_to new_user_registration_url
      end

   end

   def etsy
     # With this code you can see the data sent by etsy
      omniauth = request.env["omniauth.auth"] 
      puts omniauth
      @user    = User.find_for_etsy_oauth(request.env["omniauth.auth"], current_user)

      if @user.persisted?
        sign_in_and_redirect @user, :event => :authentication
      else
        session["devise.etsy_data"] = request.env["omniauth.auth"]
        redirect_to root_path
      end
      
   end

end