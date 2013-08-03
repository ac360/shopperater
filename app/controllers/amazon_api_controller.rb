class AmazonApiController < ApplicationController

	def index
		client = A2z::Client.new(key: ENV["AMAZON_PAAPI_KEY"], secret: ENV["AMAZON_PAAPI_SECRET"], tag: ENV["AMAZON_PAAPI_TAG"])
		@response = client.item_search do
  			 keywords 'stove'
  			 category 'All'
        end
		render :json => @response
	end

	def item_search
		client = A2z::Client.new(key: ENV["AMAZON_PAAPI_KEY"], secret: ENV["AMAZON_PAAPI_SECRET"], tag: ENV["AMAZON_PAAPI_TAG"])
		# Because there are thousands of items in each search index, ItemSearch requires that you specify the value for at least one parameter in addition to a search index.
		response = client.item_search do
  			 keywords 'Visa'
  			 category 'Credit Cards'
        end
		render :json => response
	end

end
