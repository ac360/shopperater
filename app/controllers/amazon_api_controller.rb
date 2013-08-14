class AmazonApiController < ApplicationController

	def item_search
		client = A2z::Client.new(key: ENV["AMAZON_PAAPI_KEY"], secret: ENV["AMAZON_PAAPI_SECRET"], tag: ENV["AMAZON_PAAPI_TAG"])
		# Because there are thousands of items in each search index, ItemSearch requires that you specify the value for at least one parameter in addition to a search index.
		search_keywords = params[:keywords].to_s

		@search_results = client.item_search do
  			 keywords search_keywords
  			 category 'All'
  			 # item_page 2
  			 response_group 'Small, Images, OfferListings'
        end

		render :json => @search_results
	end

end
