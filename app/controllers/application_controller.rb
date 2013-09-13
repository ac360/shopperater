class ApplicationController < ActionController::Base
  protect_from_forgery
  layout :layout_by_resource

  def after_sign_in_path_for(resource) 
    session["user_return_to"] || root_path
  end

  def after_update_path_for(resource)
    session["user_return_to"] || root_path
  end

  def after_sign_out_path_for(resource)
    session["user_return_to"] || root_path
  end

  private

  def layout_by_resource
    if devise_controller?
      "devise"
    else
      "application"
    end
  end

end
