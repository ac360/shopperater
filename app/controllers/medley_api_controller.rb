class MedleyApiController < ApplicationController

	include ActionView::Helpers::NumberHelper

	def product_search
		client = A2z::Client.new(key: ENV["AMAZON_PAAPI_KEY"], secret: ENV["AMAZON_PAAPI_SECRET"], tag: ENV["AMAZON_PAAPI_TAG"])
		# Because there are thousands of items in each search index, ItemSearch requires that you specify the value for at least one parameter in addition to a search index.
		search_keywords = params[:keywords].to_s

		@results = client.item_search do
  			 keywords search_keywords
  			 category 'All'
  			 # item_page 2
  			 response_group 'Small, Images, OfferListings'
        end

        # Create custom response here using the data from the Amazon API's reponse...
        @custom_search_results = []
        @results.items.each do |product|

			@new_response    		= 	OpenStruct.new(:source => "amazon")
			@new_response.id 		= 	product.asin if product.asin.present? 
			@new_response.title 	= 	product.title if product.title.present? 
			if product.offers.present? 
				@new_response.price = 	product.offers.first.price.fractional / 100.00
				@new_response.price =   number_with_precision(@new_response.price, :precision => 2)
			else
				@new_response.price =   "No Price"
			end
			@new_response.img_small = 	product.medium_image.url if product.medium_image.present? 
			@new_response.img_big   = 	product.large_image.url  if product.large_image.present?
			@new_response.category  = 	product.product_group    if product.product_group.present?
			@new_response.link      = 	"http://amazon.com/"

			@custom_search_results  << @new_response
		end
	end


	def product_lookup
		# Check which Retailer this is for
		case params[:product_one_retailer] 
			# When the retailer=amazon, query their API for the individual item(s) and reshape 
			# their API's repsonse into a custom response that the views can understand.  This is necessary because we will be working
			# with several Retailers with different API response formats. 
			when "amazon"
				client = A2z::Client.new(key: ENV["AMAZON_PAAPI_KEY"], secret: ENV["AMAZON_PAAPI_SECRET"], tag: ENV["AMAZON_PAAPI_TAG"])
				# TODO: The author of the A2z gem says he is working on allowing multiple ids to be passed into this method.
				product_one_id = params[:product_one_id]
				@product = client.item_lookup do
		             id product_one_id
		             response_group 'Small, Images, OfferListings'
		        end

		        @custom_lookup_results = []
		        # Create custom response here using the data from the Amazon API's reponse...
		        @new_response           =   OpenStruct.new(:source => "amazon")
		        @new_response.id        = 	@product.item.asin             if @product.item.asin.present?
		        @new_response.title     = 	@product.item.title            if @product.item.title.present?
		        if @product.item.offers.present?
		        	@new_response.price =   @product.item.offers.first.price.fractional / 100.00
		        	@new_response.price =   number_with_precision(@new_response.price, :precision => 2)
		        else
		        	@new_response.price =   "No Price"
		        end
		        @new_response.img_small = 	@product.item.medium_image.url if @product.item.medium_image.url.present?
		        @new_response.img_big   = 	@product.item.large_image.url  if @product.item.large_image.url.present? 
		        @new_response.category  = 	@product.item.product_group    if @product.item.product_group.present? 
		        @new_response.link      = 	"http://amazon.com"

		        @custom_lookup_results << @new_response
		        @custom_lookup_results 
		        # The Custom Result is in an Array because the View will only know how to handle collections/arrays
			when "etsy"
			else
				render :json => "The Retailer Parameter you included is incorrect or the Retailer is unsupported."
		end
	end # product_lookup

	def user_information 
		@user =  User.find(current_user.id)
	end

end
