class RetailerApiController < ApplicationController

	def product_search
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


	def product_lookup
		# Check which Retailer this is for
		case params[:product_one_retailer] 
			when "amazon"
				client = A2z::Client.new(key: ENV["AMAZON_PAAPI_KEY"], secret: ENV["AMAZON_PAAPI_SECRET"], tag: ENV["AMAZON_PAAPI_TAG"])
				
				# This code is for passing in multiple product IDs, but the gem does not work with that yet. 
				# product_ids = []
				# product_ids << product_one_id =   params[:product_one_id]
				# product_ids << product_two_id =   params[:product_two_id]
				# product_ids << product_three_id = params[:product_three_id]
				# product_ids << product_four_id =  params[:product_four_id]
				# product_ids << product_five_id =  params[:product_five_id]
				# product_ids << product_six_id =   params[:product_six_id]
				# product_ids = product_ids.join(",")

				product_one_id = params[:product_one_id]
			
				@products = client.item_lookup do
		             id product_one_id
		             response_group 'Small, Images, OfferListings'
		        end
		        render :json => @products
			when "etsy"
			else
				render :json => "The Retailer Parameter you included is incorrect or the retailer is unsupported."
		end
	end # product_lookup


end
