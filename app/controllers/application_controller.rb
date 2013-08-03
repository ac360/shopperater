class ApplicationController < ActionController::Base
  protect_from_forgery



  private

  def create_amazon_api_client
  	# client = A2z::Client.new(key: ENV["AMAZON_PAAPI_KEY"], secret: ENV["AMAZON_PAAPI_SECRET"], tag: ENV["AMAZON_PAAPI_TAG"])
  end

end
