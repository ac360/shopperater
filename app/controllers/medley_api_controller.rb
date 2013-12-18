class MedleyApiController < ApplicationController

	include ActionView::Helpers::NumberHelper
	include ActionView::Helpers::SanitizeHelper
	include ActionView::Helpers::TextHelper
	# TODO - SANITIZE ALL USER INPUT - STUDY RAILS + BACKBONE + SANITIZATION

	def medley_search
		@keywords = params[:keywords].downcase.gsub(/[^a-z\s]/, '')
		@keywords_array = @keywords.strip.split(/\s+/)
		@formatted_search = ''
		@keywords_array.each do |keyword|
			@formatted_search = @formatted_search + keyword.to_s + '|'
		end
		@formatted_search = @formatted_search.chop
		@medleys = Medley.advanced_search(@formatted_search).order('votes DESC').joins(:user).limit(15)
		@medleys = medley_extra_formatter(@medleys)
		# Build Custom Item URLs Here...
	end

	def medley_show
		begin
		  @medley = Medley.find(params[:id])
		rescue ActiveRecord::RecordNotFound => e
		  render :json => "Medley Not Found"
		end
	end

	def medley_most_recent
		@medleys = Medley.last(15).reverse
		@medleys = medley_extra_formatter(@medleys)
	end

	def medleys_by_user
		@medleys = Medley.where(:user_id => params[:user_id]).last(20).reverse
	end

	def product_search

			# Convert Search Keywords to string and strip whitespace from beg and end
			search_keywords = params[:keywords].to_s.strip
			search_retailer = params[:retailer].to_s.strip
			etsy_store_id   = params[:etsy_store_id].to_s.strip if params[:etsy_store_id].present? 
			# Create custom response array here
			@custom_search_results = []

			if search_retailer == "All Retailers"

					# Perform Amazon Search
					amazonClient = A2z::Client.new(key: ENV["AMAZON_PAAPI_KEY"], secret: ENV["AMAZON_PAAPI_SECRET"], tag: ENV["AMAZON_PAAPI_TAG"])
					# Because there are thousands of items in each search index, ItemSearch requires that you specify the value for at least one parameter in addition to a search index.
					@AMAZONresults = amazonClient.item_search do
			  			 keywords search_keywords
			  			 category 'All'
			  			 # item_page 2
			  			 response_group 'Small, Images, OfferListings'
			        end
			        # Perform Etsy Search and set limit based on number of Amazon Results
			        if @AMAZONresults.items.count < 10
						etsyClient =  HTTParty.get "https://openapi.etsy.com/v2/listings/active.json?keywords=" + URI.escape(search_keywords) + "&limit=20&includes=Images:1&api_key=fidmluour59jmlqcxfvq5k7u"
						@ETSYresults = etsyClient.parsed_response['results']
					else
						etsyClient =  HTTParty.get "https://openapi.etsy.com/v2/listings/active.json?keywords=" + URI.escape(search_keywords) + "&limit=10&includes=Images:1&api_key=fidmluour59jmlqcxfvq5k7u"
						@ETSYresults = etsyClient.parsed_response['results']
					end
					if @AMAZONresults.items.count === 0 && @ETSYresults.count === 0
						render :json => []
						return
					end
			        # Amazon - Filter & Add Products
			        @AMAZONresults.items.each do |product|
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
						# aZn Gem Includes Affiliate Tag In Link by Default.  Let's Strip It And We'll Put It Back in On the Front-End
						if product.links.first.url.present?
							@new_response.link = product.links.first.url.gsub! "%26tag%3Dmedley01-20", ""
						end
						@custom_search_results  << @new_response
					end
					# Etsy - Reformat& Add Products
					# TODO - TRIM TITLES && STRIP URL AND HANDLE MEDLEY AFFILIATE TAG
					etsyPosition = 1
					@ETSYresults.each do |product|
						@new_response    		= 	OpenStruct.new(:source => "etsy")
						@new_response.id 		= 	product['listing_id'].to_s if product['listing_id'].present?  
						@new_response.title 	= 	truncate(product['title'], :length => 70) if product['title'].present? 
						if product['price'].present? 
							@new_response.price = 	product['price']
						else
							@new_response.price =   "No Price"
						end
						@new_response.img_small = 	product['Images'].first['url_570xN'] if product['Images'].first['url_570xN'].present? 
						@new_response.img_big   = 	product['Images'].first['url_fullxfull'] if product['Images'].first['url_fullxfull'].present?
						@new_response.category  = 	product['category_path'].first if product['category_path'].present?
						# aZn Gem Includes Affiliate Tag In Link by Default.  Let's Strip It And We'll Put It Back in On the Front-End
						if product['url'].present?
							@new_response.link = product['url']
						end
						# Insert into formatted results
							# if Amazon has 10 results, insert Etsy results into every other index
						if @custom_search_results.count > 9
							@custom_search_results.insert(etsyPosition, @new_response)
							# Increment Position of insert by multiple of 2 so that the Etsy listings are evenly distributed amongst results
							etsyPosition = etsyPosition + 2
							# if Amazon has < 10 results, insert Etsy result and shuffle the array
						else
							@custom_search_results << @new_response
							@custom_search_results = @custom_search_results.shuffle
						end
					end
				
			elsif search_retailer == "Amazon"
					# Perform Amazon Search
					amazonClient = A2z::Client.new(key: ENV["AMAZON_PAAPI_KEY"], secret: ENV["AMAZON_PAAPI_SECRET"], tag: ENV["AMAZON_PAAPI_TAG"])
					# Because there are thousands of items in each search index, ItemSearch requires that you specify the value for at least one parameter in addition to a search index.
					@AMAZONresults = amazonClient.item_search do
			  			 keywords search_keywords
			  			 category 'All'
			  			 # item_page 2
			  			 response_group 'Small, Images, OfferListings'
			        end
			        # Amazon - Filter & Add Products
			        @AMAZONresults.items.each do |product|
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
						# aZn Gem Includes Affiliate Tag In Link by Default.  Let's Strip It And We'll Put It Back in On the Front-End
						if product.links.first.url.present?
							@new_response.link = product.links.first.url.gsub! "%26tag%3Dmedley01-20", ""
						end
						@custom_search_results  << @new_response
					end
			elsif search_retailer == "Etsy"
					# Check if they entered in an Etsy Store ID/Name
					if etsy_store_id.present?
						if search_keywords.present?
							etsyClient =  HTTParty.get "https://openapi.etsy.com/v2/shops/" + URI.escape(etsy_store_id) + "/listings/active.json?keywords=" + URI.escape(search_keywords) + "&limit=20&includes=Images:1&api_key=fidmluour59jmlqcxfvq5k7u"
						else
							etsyClient =  HTTParty.get "https://openapi.etsy.com/v2/shops/" + URI.escape(etsy_store_id) + "/listings/active.json?limit=40&includes=Images:1&api_key=fidmluour59jmlqcxfvq5k7u"
						end
						puts etsyClient
						case etsyClient.code
						  when 200
						    puts "Etsy shop ID is valid..."
						  when 404
						    puts "Etsy shop ID is NOT valid..."
						    render :json => { :errors => "Etsy Store Does Not Exist" }, :status => 422
						    return false
						  when 500...600
						    puts "ZOMG ERROR #{response.code}"
						end
					else
						etsyClient =  HTTParty.get "https://openapi.etsy.com/v2/listings/active.json?keywords=" + URI.escape(search_keywords) + "&limit=20&includes=Images:1&api_key=fidmluour59jmlqcxfvq5k7u"
					end
					@ETSYresults = etsyClient.parsed_response['results']
					etsyPosition = 1
					@ETSYresults.each do |product|
						@new_response    		= 	OpenStruct.new(:source => "etsy")
						@new_response.id 		= 	product['listing_id'].to_s if product['listing_id'].present?  
						@new_response.title 	= 	truncate(product['title'], :length => 70) if product['title'].present? 
						if product['price'].present? 
							@new_response.price = 	product['price']
						else
							@new_response.price =   "No Price"
						end
						@new_response.img_small = 	product['Images'].first['url_570xN'] if product['Images'].first['url_570xN'].present? 
						@new_response.img_big   = 	product['Images'].first['url_fullxfull'] if product['Images'].first['url_fullxfull'].present?
						@new_response.category  = 	product['category_path'].first if product['category_path'].present?
						# aZn Gem Includes Affiliate Tag In Link by Default.  Let's Strip It And We'll Put It Back in On the Front-End
						if product['url'].present?
							@new_response.link = product['url']
						end
						# Insert into formatted results
						@custom_search_results << @new_response
						@custom_search_results = @custom_search_results.shuffle
					end
			end

			if @custom_search_results.count === 0
				render :json => []
			end

	end # Product_search

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

	def username_validation
		@username = params[:username]
		@user = User.where('LOWER(username) = ?', @username.downcase) unless params[:username].blank?
		if @user.present?
			@result        =   OpenStruct.new(:valid => true)
			@result
		else
			@result        =   OpenStruct.new(:valid => false)
			@result
		end
	end

	def email_validation
		@email = params[:email]
		@user = User.where('LOWER(email) = ?', @email.downcase) unless params[:email].blank?
		if @user.present?
			@result        =   OpenStruct.new(:valid => true)
			@result
		else
			@result        =   OpenStruct.new(:valid => false)
			@result
		end
	end

	def medley_title_validation
		@title  = params[:title]
		@medley = Medley.where('LOWER(title) = ?', @title.downcase)
		if @medley.present?
			@result = OpenStruct.new(
				:valid => false,
				:message => 'This title is already taken.  Try something else.')
		else
			@result = OpenStruct.new(:valid => true)
		end
	end 

	def medley_uniqueness_validation 
		@result = OpenStruct.new()
		if Medley.exists?(:title => params[:title])
			@result.title_unique = false
		else
			@result.title_unique = true
		end
		item_ids = params[:item_ids]["ids"]
		conditions = []
		values = {}
		item_ids.each_with_index do |t,i|
		   arg_id = "term#{i}".to_sym
		   conditions << "(i1_id = :#{arg_id} OR i2_id = :#{arg_id} OR i3_id = :#{arg_id} OR i4_id = :#{arg_id} OR i5_id = :#{arg_id} OR i6_id = :#{arg_id} OR i7_id = :#{arg_id} OR i8_id = :#{arg_id} OR i9_id = :#{arg_id} OR i10_id = :#{arg_id} OR i11_id = :#{arg_id} OR i12_id = :#{arg_id} OR i13_id = :#{arg_id} OR i14_id = :#{arg_id} OR i15_id = :#{arg_id} OR i16_id = :#{arg_id})"
		   values[arg_id] = t
		end
		@existing_medleys = Medley.where(conditions.join(' AND '), values).collect {|m| [m.i1_id, m.i2_id, m.i3_id, m.i4_id, m.i5_id, m.i6_id, m.i7_id, m.i8_id, m.i9_id, m.i10_id, m.i11_id, m.i12_id, m.i13_id, m.i4_id, m.i15_id, m.i16_id].compact! }
		
		if @existing_medleys.length > 0
			remainders_array = []
			@existing_medleys.each do |m|
				m = m - item_ids
				length = m.length
				remainders_array.push(length)
			end

			if remainders_array.include? 0
					@result.medley_unique = false
					puts @result
					return @result
			else
					@result.medley_unique = true
					puts @result
					return @result
			end
		else 
			@result.medley_unique = true
			puts @result
			return @result
		end
	end # End medley_uniquness_validation

	def create_medley
		# Find or Create Tags used in this Medley
			# @tag_one     =   Tag.find_by_tag(params[:tag_one].downcase.to_s)   || Tag.create(:tag => params[:tag_one].downcase.to_s) 
			# @tag_two     =   Tag.find_by_tag(params[:tag_two].downcase.to_s)   || Tag.create(:tag => params[:tag_two].downcase.to_s)
			# @tag_three   =   Tag.find_by_tag(params[:tag_three].downcase.to_s) || Tag.create(:tag => params[:tag_three].downcase.to_s)
			# items_array  =   params[:items]

		@medley = Medley.new()
		if current_user
			@medley.user_id = current_user.id
		else
			@medley.user_id = 1
		end
		@medley.remix_of 					= params[:remix_of]           									if params[:remix_of].present?
		@medley.title 						= params[:title].downcase.split.map(&:capitalize).join(' ') 	if params[:title].present?
		@medley.description			    	= params[:description].mb_chars.strip.normalize 				if params[:description].present?
		@medley.votes				    	= 0

		if @medley.save
			render :json => @medley
		else
			render :json => "Something went wrong and the Medley could not be saved"
		end
	end

	def medley_create_items
		@medley 	 =   Medley.find(params[:id])
		items_array  =   params[:items] 			if params[:items].present?

		if items_array[0].present? 
			@medley.i1_r					= items_array[0]["r"] 	   			if items_array[0]["r"].present?
			@medley.i1_c			        = items_array[0]["c"] 	   			if items_array[0]["c"].present?
	  		@medley.i1_x			   	 	= items_array[0]["x"] 	   			if items_array[0]["x"].present?
	  		@medley.i1_y			    	= items_array[0]["y"] 	   			if items_array[0]["y"].present?
	  		@medley.i1_id			        = items_array[0]["id"]	   	   		if items_array[0]["id"].present?
	  		@medley.i1_title			    = items_array[0]["title"]	   		if items_array[0]["title"].present?
	  		@medley.i1_price			    = items_array[0]["price"]	   		if items_array[0]["price"].present?
	  		@medley.i1_img_small			= items_array[0]["img_small"]	   	if items_array[0]["img_small"].present?
			@medley.i1_img_big				= items_array[0]["img_big"]	   		if items_array[0]["img_big"].present?
			@medley.i1_category			    = items_array[0]["category"]   		if items_array[0]["category"].present?
			@medley.i1_source			    = items_array[0]["source"]   	    if items_array[0]["source"].present?
			@medley.i1_link			        = items_array[0]["link"]  	        if items_array[0]["link"].present?
		end
		
		if items_array[1].present? 
			@medley.i2_r					= items_array[1]["r"] 	   			if items_array[1]["r"].present?
			@medley.i2_c			        = items_array[1]["c"] 	   			if items_array[1]["c"].present?
	  		@medley.i2_x			   	 	= items_array[1]["x"] 	   			if items_array[1]["x"].present?
	  		@medley.i2_y			    	= items_array[1]["y"] 	   			if items_array[1]["y"].present?
	  		@medley.i2_id			        = items_array[1]["id"]	   	   		if items_array[1]["id"].present?
	  		@medley.i2_title			    = items_array[1]["title"]	   		if items_array[1]["title"].present?
	  		@medley.i2_price			    = items_array[1]["price"]	   		if items_array[1]["price"].present?
	  		@medley.i2_img_small			= items_array[1]["img_small"]	   	if items_array[1]["img_small"].present?
			@medley.i2_img_big				= items_array[1]["img_big"]	   		if items_array[1]["img_big"].present?
			@medley.i2_category			    = items_array[1]["category"]   		if items_array[1]["category"].present?
			@medley.i2_source			    = items_array[1]["source"]   	    if items_array[1]["source"].present?
			@medley.i2_link			        = items_array[1]["link"]  	        if items_array[1]["link"].present?
		end

		if items_array[2].present?
			@medley.i3_r					= items_array[2]["r"] 	   			if items_array[2]["r"].present?
			@medley.i3_c			        = items_array[2]["c"] 	   			if items_array[2]["c"].present?
	  		@medley.i3_x			   	 	= items_array[2]["x"] 	   			if items_array[2]["x"].present?
	  		@medley.i3_y			    	= items_array[2]["y"] 	   			if items_array[2]["y"].present?
	  		@medley.i3_id			        = items_array[2]["id"]	   	   		if items_array[2]["id"].present?
	  		@medley.i3_title			    = items_array[2]["title"]	   		if items_array[2]["title"].present?
	  		@medley.i3_price			    = items_array[2]["price"]	   		if items_array[2]["price"].present?
	  		@medley.i3_img_small			= items_array[2]["img_small"]	   	if items_array[2]["img_small"].present?
			@medley.i3_img_big				= items_array[2]["img_big"]	   		if items_array[2]["img_big"].present?
			@medley.i3_category			    = items_array[2]["category"]   		if items_array[2]["category"].present?
			@medley.i3_source			    = items_array[2]["source"]   	    if items_array[2]["source"].present?
			@medley.i3_link			        = items_array[2]["link"]  	        if items_array[2]["link"].present?
		end

		if items_array[3].present?
			@medley.i4_r					= items_array[3]["r"] 	   			if items_array[3]["r"].present?
			@medley.i4_c			        = items_array[3]["c"] 	   			if items_array[3]["c"].present?
	  		@medley.i4_x			   	 	= items_array[3]["x"] 	   			if items_array[3]["x"].present?
	  		@medley.i4_y			    	= items_array[3]["y"] 	   			if items_array[3]["y"].present?
	  		@medley.i4_id			        = items_array[3]["id"]	   	   		if items_array[3]["id"].present?
	  		@medley.i4_title			    = items_array[3]["title"]	   		if items_array[3]["title"].present?
	  		@medley.i4_price			    = items_array[3]["price"]	   		if items_array[3]["price"].present?
	  		@medley.i4_img_small			= items_array[3]["img_small"]	   	if items_array[3]["img_small"].present?
			@medley.i4_img_big				= items_array[3]["img_big"]	   		if items_array[3]["img_big"].present?
			@medley.i4_category			    = items_array[3]["category"]   		if items_array[3]["category"].present?
			@medley.i4_source			    = items_array[3]["source"]   	    if items_array[3]["source"].present?
			@medley.i4_link			        = items_array[3]["link"]  	        if items_array[3]["link"].present?
		end

		if items_array[4].present?
			@medley.i5_r					= items_array[4]["r"] 	   			if  items_array[4]["r"].present?
			@medley.i5_c			        = items_array[4]["c"] 	   			if  items_array[4]["c"].present?
	  		@medley.i5_x			   	 	= items_array[4]["x"] 	   			if  items_array[4]["x"].present?
	  		@medley.i5_y			    	= items_array[4]["y"] 	   			if  items_array[4]["y"].present?
	  		@medley.i5_id			        = items_array[4]["id"]	   	   		if  items_array[4]["id"].present?
	  		@medley.i5_title			    = items_array[4]["title"]	   		if  items_array[4]["title"].present?
	  		@medley.i5_price			    = items_array[4]["price"]	   		if  items_array[4]["price"].present?
	  		@medley.i5_img_small			= items_array[4]["img_small"]	   	if  items_array[4]["img_small"].present?
			@medley.i5_img_big				= items_array[4]["img_big"]	   		if  items_array[4]["img_big"].present?
			@medley.i5_category			    = items_array[4]["category"]   		if  items_array[4]["category"].present?
			@medley.i5_source			    = items_array[4]["source"]   	    if  items_array[4]["source"].present?
			@medley.i5_link			        = items_array[4]["link"]  	        if  items_array[4]["link"].present?
		end

		if items_array[5].present?
			@medley.i6_r					= items_array[5]["r"] 	   			if  items_array[5]["r"].present?
			@medley.i6_c			        = items_array[5]["c"] 	   			if  items_array[5]["c"].present?
	  		@medley.i6_x			   	 	= items_array[5]["x"] 	   			if  items_array[5]["x"].present?
	  		@medley.i6_y			    	= items_array[5]["y"] 	   			if  items_array[5]["y"].present?
	  		@medley.i6_id			        = items_array[5]["id"]	   	   		if  items_array[5]["id"].present?
	  		@medley.i6_title			    = items_array[5]["title"]	   		if  items_array[5]["title"].present?
	  		@medley.i6_price			    = items_array[5]["price"]	   		if  items_array[5]["price"].present?
	  		@medley.i6_img_small			= items_array[5]["img_small"]	   	if  items_array[5]["img_small"].present?
			@medley.i6_img_big				= items_array[5]["img_big"]	   		if  items_array[5]["img_big"].present?
			@medley.i6_category			    = items_array[5]["category"]   		if  items_array[5]["category"].present?
			@medley.i6_source			    = items_array[5]["source"]   	    if  items_array[5]["source"].present?
			@medley.i6_link			        = items_array[5]["link"]  	        if  items_array[5]["link"].present?
		end

		if items_array[6].present?
			@medley.i7_r					= items_array[6]["r"] 	   			if  items_array[6]["r"].present?
			@medley.i7_c			        = items_array[6]["c"] 	   			if  items_array[6]["c"].present?
	  		@medley.i7_x			   	 	= items_array[6]["x"] 	   			if  items_array[6]["x"].present?
	  		@medley.i7_y			    	= items_array[6]["y"] 	   			if  items_array[6]["y"].present?
	  		@medley.i7_id			        = items_array[6]["id"]	   	   		if  items_array[6]["id"].present?
	  		@medley.i7_title			    = items_array[6]["title"]	   		if  items_array[6]["title"].present?
	  		@medley.i7_price			    = items_array[6]["price"]	   		if  items_array[6]["price"].present?
	  		@medley.i7_img_small			= items_array[6]["img_small"]	   	if  items_array[6]["img_small"].present?
			@medley.i7_img_big				= items_array[6]["img_big"]	   		if  items_array[6]["img_big"].present?
			@medley.i7_category			    = items_array[6]["category"]   		if  items_array[6]["category"].present?
			@medley.i7_source			    = items_array[6]["source"]   	    if  items_array[6]["source"].present?
			@medley.i7_link			        = items_array[6]["link"]  	        if  items_array[6]["link"].present?
		end

		if items_array[7].present?	
			@medley.i8_r					= items_array[7]["r"] 	   			if  items_array[7]["r"].present?
			@medley.i8_c			        = items_array[7]["c"] 	   			if  items_array[7]["c"].present?
	  		@medley.i8_x			   	 	= items_array[7]["x"] 	   			if  items_array[7]["x"].present?
	  		@medley.i8_y			    	= items_array[7]["y"] 	   			if  items_array[7]["y"].present?
	  		@medley.i8_id			        = items_array[7]["id"]	   	   		if  items_array[7]["id"].present?
	  		@medley.i8_title			    = items_array[7]["title"]	   		if  items_array[7]["title"].present?
	  		@medley.i8_price			    = items_array[7]["price"]	   		if  items_array[7]["price"].present?
	  		@medley.i8_img_small			= items_array[7]["img_small"]	   	if  items_array[7]["img_small"].present?
			@medley.i8_img_big				= items_array[7]["img_big"]	   		if  items_array[7]["img_big"].present?
			@medley.i8_category			    = items_array[7]["category"]   		if  items_array[7]["category"].present?
			@medley.i8_source			    = items_array[7]["source"]   	    if  items_array[7]["source"].present?
			@medley.i8_link			        = items_array[7]["link"]  	        if  items_array[7]["link"].present?
		end

		if items_array[8].present?
			@medley.i9_r					= items_array[8]["r"] 	   			if  items_array[8]["r"].present?
			@medley.i9_c			        = items_array[8]["c"] 	   			if  items_array[8]["c"].present?
	  		@medley.i9_x			   	 	= items_array[8]["x"] 	   			if  items_array[8]["x"].present?
	  		@medley.i9_y			    	= items_array[8]["y"] 	   			if  items_array[8]["y"].present?
	  		@medley.i9_id			        = items_array[8]["id"]	   	   		if  items_array[8]["id"].present?
	  		@medley.i9_title			    = items_array[8]["title"]	   		if  items_array[8]["title"].present?
	  		@medley.i9_price			    = items_array[8]["price"]	   		if  items_array[8]["price"].present?
	  		@medley.i9_img_small			= items_array[8]["img_small"]	   	if  items_array[8]["img_small"].present?
			@medley.i9_img_big				= items_array[8]["img_big"]	   		if  items_array[8]["img_big"].present?
			@medley.i9_category			    = items_array[8]["category"]   		if  items_array[8]["category"].present?
			@medley.i9_source			    = items_array[8]["source"]   	    if  items_array[8]["source"].present?
			@medley.i9_link			        = items_array[8]["link"]  	        if  items_array[8]["link"].present?
		end

		if items_array[9].present?
			@medley.i10_r					= items_array[9]["r"] 	   			if  items_array[9]["r"].present?
			@medley.i10_c			        = items_array[9]["c"] 	   			if  items_array[9]["c"].present?
	  		@medley.i10_x			   	 	= items_array[9]["x"] 	   			if  items_array[9]["x"].present?
	  		@medley.i10_y			    	= items_array[9]["y"] 	   			if  items_array[9]["y"].present?
	  		@medley.i10_id			        = items_array[9]["id"]	   	   		if  items_array[9]["id"].present?
	  		@medley.i10_title			    = items_array[9]["title"]	   		if  items_array[9]["title"].present?
	  		@medley.i10_price			    = items_array[9]["price"]	   		if  items_array[9]["price"].present?
	  		@medley.i10_img_small			= items_array[9]["img_small"]	   	if  items_array[9]["img_small"].present?
			@medley.i10_img_big				= items_array[9]["img_big"]	   		if  items_array[9]["img_big"].present?
			@medley.i10_category			= items_array[9]["category"]   		if  items_array[9]["category"].present?
			@medley.i10_source			    = items_array[9]["source"]   	    if  items_array[9]["source"].present?
			@medley.i10_link			    = items_array[9]["link"]  	        if  items_array[9]["link"].present?
		end

		if items_array[10].present?
			@medley.i11_r					= items_array[10]["r"] 	   			if  items_array[10]["r"].present?
			@medley.i11_c			        = items_array[10]["c"] 	   			if  items_array[10]["c"].present?
	  		@medley.i11_x			   	 	= items_array[10]["x"] 	   			if  items_array[10]["x"].present?
	  		@medley.i11_y			    	= items_array[10]["y"] 	   			if  items_array[10]["y"].present?
	  		@medley.i11_id			        = items_array[10]["id"]	   			if  items_array[10]["id"].present?
	  		@medley.i11_title			    = items_array[10]["title"]	   		if  items_array[10]["title"].present?
	  		@medley.i11_price			    = items_array[10]["price"]	   		if  items_array[10]["price"].present?
	  		@medley.i11_img_small			= items_array[10]["img_small"]		if  items_array[10]["img_small"].present?
			@medley.i11_img_big				= items_array[10]["img_big"]		if  items_array[10]["img_big"].present?
			@medley.i11_category			= items_array[10]["category"]   	if  items_array[10]["category"].present?
			@medley.i11_source			    = items_array[10]["source"]   	    if  items_array[10]["source"].present?
			@medley.i11_link			    = items_array[10]["link"]  	    	if  items_array[10]["link"].present?
		end

		if items_array[11].present?
			@medley.i12_r					= items_array[11]["r"] 	   			if  items_array[11]["r"].present?
			@medley.i12_c			        = items_array[11]["c"] 	   			if  items_array[11]["c"].present?
	  		@medley.i12_x			   	 	= items_array[11]["x"] 	   			if  items_array[11]["x"].present?
	  		@medley.i12_y			    	= items_array[11]["y"] 	   			if  items_array[11]["y"].present?
	  		@medley.i12_id			        = items_array[11]["id"]	   	   		if  items_array[11]["id"].present?
	  		@medley.i12_title			    = items_array[11]["title"]	   		if  items_array[11]["title"].present?
	  		@medley.i12_price			    = items_array[11]["price"]	   		if  items_array[11]["price"].present?
	  		@medley.i12_img_small			= items_array[11]["img_small"]		if  items_array[11]["img_small"].present?
			@medley.i12_img_big				= items_array[11]["img_big"]		if  items_array[11]["img_big"].present?
			@medley.i12_category			= items_array[11]["category"]   	if  items_array[11]["category"].present?
			@medley.i12_source			    = items_array[11]["source"]   	    if  items_array[11]["source"].present?
			@medley.i12_link			    = items_array[11]["link"]  	    	if  items_array[11]["link"].present?
		end

		if items_array[12].present?
			@medley.i13_r					= items_array[12]["r"] 	   			if  items_array[12]["r"].present?
			@medley.i13_c			        = items_array[12]["c"] 	   			if  items_array[12]["c"].present?
	  		@medley.i13_x			   	 	= items_array[12]["x"] 	   			if  items_array[12]["x"].present?
	  		@medley.i13_y			    	= items_array[12]["y"] 	   			if  items_array[12]["y"].present?
	  		@medley.i13_id			        = items_array[12]["id"]	   	   		if  items_array[12]["id"].present?
	  		@medley.i13_title			    = items_array[12]["title"]	   		if  items_array[12]["title"].present?
	  		@medley.i13_price			    = items_array[12]["price"]	   		if  items_array[12]["price"].present?
	  		@medley.i13_img_small			= items_array[12]["img_small"]		if  items_array[12]["img_small"].present?
			@medley.i13_img_big				= items_array[12]["img_big"]		if  items_array[12]["img_big"].present?
			@medley.i13_category			= items_array[12]["category"]   	if  items_array[12]["category"].present?
			@medley.i13_source			    = items_array[12]["source"]   	    if  items_array[12]["source"].present?
			@medley.i13_link			    = items_array[12]["link"]  	    	if  items_array[12]["link"].present?
		end

		if @medley.save
			render :json => @medley
		else
			render :json => "Something went wrong and the Medley could not be saved"
		end

	end # medley_create_items

	def add_newsletter_subscriber
		@subscriber = NewsletterSubscriber.new()
		@subscriber.email = params[:email]
		if @subscriber.save
			render :json => @subscriber
		else
			render :json => "New Subscriber Could Not Be Saved"
		end
	end

end
