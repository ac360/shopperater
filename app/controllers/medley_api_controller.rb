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

	def medley_most_recent
		@medleys = Medley.last(15).reverse
		@medleys = medley_extra_formatter(@medleys)
	end

	def product_search

			# Convert Search Keywords to string and strip whitespace from beg and end
			search_keywords = params[:keywords].to_s.strip
			search_retailer = params[:retailer].to_s.strip
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
					etsyClient =  HTTParty.get "https://openapi.etsy.com/v2/listings/active.json?keywords=" + URI.escape(search_keywords) + "&limit=20&includes=Images:1&api_key=fidmluour59jmlqcxfvq5k7u"
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
		if Medley.exists?(:title => params[:title])
				@result = OpenStruct.new(:valid => false)
				return @result
		else
				item_ids = params[:item_ids]["ids"]
				conditions = []
				values = {}
				item_ids.each_with_index do |t,i|
				   arg_id = "term#{i}".to_sym
				   conditions << "(i1_id = :#{arg_id} OR i2_id = :#{arg_id} OR i3_id = :#{arg_id} OR i4_id = :#{arg_id} OR i5_id = :#{arg_id} OR i6_id = :#{arg_id} OR i7_id = :#{arg_id} OR i8_id = :#{arg_id} OR i9_id = :#{arg_id} OR i10_id = :#{arg_id} OR i11_id = :#{arg_id} OR i12_id = :#{arg_id} OR i13_id = :#{arg_id} OR i14_id = :#{arg_id} OR i15_id = :#{arg_id} OR i16_id = :#{arg_id})"
				   values[arg_id] = t
				end
				@existing_medleys = Medley.where(conditions.join(' AND '), values).collect {|m| [m.i1_id, m.i2_id, m.i3_id, m.i4_id, m.i5_id, m.i6_id, m.i7_id, m.i8_id, m.i9_id, m.i10_id, m.i11_id, m.i12_id, m.i13_id, m.i4_id, m.i15_id, m.i16_id].compact! }
				
				# render :json => @existing_medleys

				if @existing_medleys.length > 0 

						remainders_array = []
						@existing_medleys.each do |m|
							m = m - item_ids
							length = m.length
							remainders_array.push(length)
						end

						if remainders_array.include? 0
								@result  =   OpenStruct.new(:valid => false)
								@result
						else
								@result  =   OpenStruct.new(:valid => true)
								@result
						end
				else 
					@result     =   OpenStruct.new(:valid => true)
					@result
				end
		end

	end

	def create_medley
		# Find or Create Tags used in this Medley
		@tag_one     =   Tag.find_by_tag(params[:tag_one].downcase.to_s)   || Tag.create(:tag => params[:tag_one].downcase.to_s) 
		@tag_two     =   Tag.find_by_tag(params[:tag_two].downcase.to_s)   || Tag.create(:tag => params[:tag_two].downcase.to_s)
		@tag_three   =   Tag.find_by_tag(params[:tag_three].downcase.to_s) || Tag.create(:tag => params[:tag_three].downcase.to_s)
		# items_array  =   params[:items]

		# TODO - FINISH THE Medley UNIQUENESS CHECK 
		# check_medley_uniqueness(items_array)

		@medley = Medley.new()
		if current_user
			@medley.user_id = current_user.id
		else
			@medley.user_id = 1
		end
		@medley.remix_of 					= params[:remix_of]           									if params[:remix_of].present?
		@medley.title 						= params[:title].downcase.split.map(&:capitalize).join(' ') 	if params[:title].present?
		@medley.description			    	= params[:description].mb_chars.strip.normalize 				if params[:description].present?
		@medley.category			    	= params[:category]        										if params[:category].present?
		@medley.tag_1_id		        	= @tag_one.id
		@medley.tag_2_id		        	= @tag_two.id
		@medley.tag_3_id			    	= @tag_three.id
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
			@medley.i1_r					= items_array[0]["row"] 	   		if items_array[0]["row"].present?
			@medley.i1_c			        = items_array[0]["col"] 	   		if items_array[0]["col"].present?
	  		@medley.i1_x			   	 	= items_array[0]["sizex"] 	   		if items_array[0]["sizex"].present?
	  		@medley.i1_y			    	= items_array[0]["sizey"] 	   		if items_array[0]["sizey"].present?
	  		@medley.i1_id			        = items_array[0]["id"]	   	   		if items_array[0]["id"].present?
	  		@medley.i1_title			    = items_array[0]["title"]	   		if items_array[0]["title"].present?
	  		@medley.i1_price			    = items_array[0]["price"]	   		if items_array[0]["price"].present?
	  		@medley.i1_img_small			= items_array[0]["imagesmall"]	   	if items_array[0]["imagesmall"].present?
			@medley.i1_img_big				= items_array[0]["imagelarge"]	   	if items_array[0]["imagelarge"].present?
			@medley.i1_category			    = items_array[0]["category"]   		if items_array[0]["category"].present?
			@medley.i1_source			    = items_array[0]["source"]   	    if items_array[0]["source"].present?
			@medley.i1_link			        = items_array[0]["link"]  	        if items_array[0]["link"].present?
		end
		
		if items_array[1].present? 
			@medley.i2_r					= items_array[1]["row"] 	   		if items_array[1]["row"].present?
			@medley.i2_c			        = items_array[1]["col"] 	   		if items_array[1]["col"].present?
	  		@medley.i2_x			   	 	= items_array[1]["sizex"] 	   		if items_array[1]["sizex"].present?
	  		@medley.i2_y			    	= items_array[1]["sizey"] 	   		if items_array[1]["sizey"].present?
	  		@medley.i2_id			        = items_array[1]["id"]	   	   		if items_array[1]["id"].present?
	  		@medley.i2_title			    = items_array[1]["title"]	   		if items_array[1]["title"].present?
	  		@medley.i2_price			    = items_array[1]["price"]	   		if items_array[1]["price"].present?
	  		@medley.i2_img_small			= items_array[1]["imagesmall"]	   	if items_array[1]["imagesmall"].present?
			@medley.i2_img_big				= items_array[1]["imagelarge"]	   	if items_array[1]["imagelarge"].present?
			@medley.i2_category			    = items_array[1]["category"]   		if items_array[1]["category"].present?
			@medley.i2_source			    = items_array[1]["source"]   	    if items_array[1]["source"].present?
			@medley.i2_link			        = items_array[1]["link"]  	        if items_array[1]["link"].present?
		end

		if items_array[2].present?
			@medley.i3_r					= items_array[2]["row"] 	   		if items_array[2]["row"].present?
			@medley.i3_c			        = items_array[2]["col"] 	   		if items_array[2]["col"].present?
	  		@medley.i3_x			   	 	= items_array[2]["sizex"] 	   		if items_array[2]["sizex"].present?
	  		@medley.i3_y			    	= items_array[2]["sizey"] 	   		if items_array[2]["sizey"].present?
	  		@medley.i3_id			        = items_array[2]["id"]	   	   		if items_array[2]["id"].present?
	  		@medley.i3_title			    = items_array[2]["title"]	   		if items_array[2]["title"].present?
	  		@medley.i3_price			    = items_array[2]["price"]	   		if items_array[2]["price"].present?
	  		@medley.i3_img_small			= items_array[2]["imagesmall"]	   	if items_array[2]["imagesmall"].present?
			@medley.i3_img_big				= items_array[2]["imagelarge"]	   	if items_array[2]["imagelarge"].present?
			@medley.i3_category			    = items_array[2]["category"]   		if items_array[2]["category"].present?
			@medley.i3_source			    = items_array[2]["source"]   	    if items_array[2]["source"].present?
			@medley.i3_link			        = items_array[2]["link"]  	        if items_array[2]["link"].present?
		end

		if items_array[3].present?
			@medley.i4_r					= items_array[3]["row"] 	   		if items_array[3]["row"].present?
			@medley.i4_c			        = items_array[3]["col"] 	   		if items_array[3]["col"].present?
	  		@medley.i4_x			   	 	= items_array[3]["sizex"] 	   		if items_array[3]["sizex"].present?
	  		@medley.i4_y			    	= items_array[3]["sizey"] 	   		if items_array[3]["sizey"].present?
	  		@medley.i4_id			        = items_array[3]["id"]	   	   		if items_array[3]["id"].present?
	  		@medley.i4_title			    = items_array[3]["title"]	   		if items_array[3]["title"].present?
	  		@medley.i4_price			    = items_array[3]["price"]	   		if items_array[3]["price"].present?
	  		@medley.i4_img_small			= items_array[3]["imagesmall"]	   	if items_array[3]["imagesmall"].present?
			@medley.i4_img_big				= items_array[3]["imagelarge"]	   	if items_array[3]["imagelarge"].present?
			@medley.i4_category			    = items_array[3]["category"]   		if items_array[3]["category"].present?
			@medley.i4_source			    = items_array[3]["source"]   	    if items_array[3]["source"].present?
			@medley.i4_link			        = items_array[3]["link"]  	        if items_array[3]["link"].present?
		end

		if items_array[4].present?
			@medley.i5_r					= items_array[4]["row"] 	   		if  items_array[4]["row"].present?
			@medley.i5_c			        = items_array[4]["col"] 	   		if  items_array[4]["col"].present?
	  		@medley.i5_x			   	 	= items_array[4]["sizex"] 	   		if  items_array[4]["sizex"].present?
	  		@medley.i5_y			    	= items_array[4]["sizey"] 	   		if  items_array[4]["sizey"].present?
	  		@medley.i5_id			        = items_array[4]["id"]	   	   		if  items_array[4]["id"].present?
	  		@medley.i5_title			    = items_array[4]["title"]	   		if  items_array[4]["title"].present?
	  		@medley.i5_price			    = items_array[4]["price"]	   		if  items_array[4]["price"].present?
	  		@medley.i5_img_small			= items_array[4]["imagesmall"]	   	if  items_array[4]["imagesmall"].present?
			@medley.i5_img_big				= items_array[4]["imagelarge"]	   	if  items_array[4]["imagelarge"].present?
			@medley.i5_category			    = items_array[4]["category"]   		if  items_array[4]["category"].present?
			@medley.i5_source			    = items_array[4]["source"]   	    if  items_array[4]["source"].present?
			@medley.i5_link			        = items_array[4]["link"]  	        if  items_array[4]["link"].present?
		end

		if items_array[5].present?
			@medley.i6_r					= items_array[5]["row"] 	   		if  items_array[5]["row"].present?
			@medley.i6_c			        = items_array[5]["col"] 	   		if  items_array[5]["col"].present?
	  		@medley.i6_x			   	 	= items_array[5]["sizex"] 	   		if  items_array[5]["sizex"].present?
	  		@medley.i6_y			    	= items_array[5]["sizey"] 	   		if  items_array[5]["sizey"].present?
	  		@medley.i6_id			        = items_array[5]["id"]	   	   		if  items_array[5]["id"].present?
	  		@medley.i6_title			    = items_array[5]["title"]	   		if  items_array[5]["title"].present?
	  		@medley.i6_price			    = items_array[5]["price"]	   		if  items_array[5]["price"].present?
	  		@medley.i6_img_small			= items_array[5]["imagesmall"]	   	if  items_array[5]["imagesmall"].present?
			@medley.i6_img_big				= items_array[5]["imagelarge"]	   	if  items_array[5]["imagelarge"].present?
			@medley.i6_category			    = items_array[5]["category"]   		if  items_array[5]["category"].present?
			@medley.i6_source			    = items_array[5]["source"]   	    if  items_array[5]["source"].present?
			@medley.i6_link			        = items_array[5]["link"]  	        if  items_array[5]["link"].present?
		end

		if items_array[6].present?
			@medley.i7_r					= items_array[6]["row"] 	   		if  items_array[6]["row"].present?
			@medley.i7_c			        = items_array[6]["col"] 	   		if  items_array[6]["col"].present?
	  		@medley.i7_x			   	 	= items_array[6]["sizex"] 	   		if  items_array[6]["sizex"].present?
	  		@medley.i7_y			    	= items_array[6]["sizey"] 	   		if  items_array[6]["sizey"].present?
	  		@medley.i7_id			        = items_array[6]["id"]	   	   		if  items_array[6]["id"].present?
	  		@medley.i7_title			    = items_array[6]["title"]	   		if  items_array[6]["title"].present?
	  		@medley.i7_price			    = items_array[6]["price"]	   		if  items_array[6]["price"].present?
	  		@medley.i7_img_small			= items_array[6]["imagesmall"]	   	if  items_array[6]["imagesmall"].present?
			@medley.i7_img_big				= items_array[6]["imagelarge"]	   	if  items_array[6]["imagelarge"].present?
			@medley.i7_category			    = items_array[6]["category"]   		if  items_array[6]["category"].present?
			@medley.i7_source			    = items_array[6]["source"]   	    if  items_array[6]["source"].present?
			@medley.i7_link			        = items_array[6]["link"]  	        if  items_array[6]["link"].present?
		end

		if items_array[7].present?	
			@medley.i8_r					= items_array[7]["row"] 	   		if  items_array[7]["row"].present?
			@medley.i8_c			        = items_array[7]["col"] 	   		if  items_array[7]["col"].present?
	  		@medley.i8_x			   	 	= items_array[7]["sizex"] 	   		if  items_array[7]["sizex"].present?
	  		@medley.i8_y			    	= items_array[7]["sizey"] 	   		if  items_array[7]["sizey"].present?
	  		@medley.i8_id			        = items_array[7]["id"]	   	   		if  items_array[7]["id"].present?
	  		@medley.i8_title			    = items_array[7]["title"]	   		if  items_array[7]["title"].present?
	  		@medley.i8_price			    = items_array[7]["price"]	   		if  items_array[7]["price"].present?
	  		@medley.i8_img_small			= items_array[7]["imagesmall"]	   	if  items_array[7]["imagesmall"].present?
			@medley.i8_img_big				= items_array[7]["imagelarge"]	   	if  items_array[7]["imagelarge"].present?
			@medley.i8_category			    = items_array[7]["category"]   		if  items_array[7]["category"].present?
			@medley.i8_source			    = items_array[7]["source"]   	    if  items_array[7]["source"].present?
			@medley.i8_link			        = items_array[7]["link"]  	        if  items_array[7]["link"].present?
		end

		if items_array[8].present?
			@medley.i9_r					= items_array[8]["row"] 	   		if  items_array[8]["row"].present?
			@medley.i9_c			        = items_array[8]["col"] 	   		if  items_array[8]["col"].present?
	  		@medley.i9_x			   	 	= items_array[8]["sizex"] 	   		if  items_array[8]["sizex"].present?
	  		@medley.i9_y			    	= items_array[8]["sizey"] 	   		if  items_array[8]["sizey"].present?
	  		@medley.i9_id			        = items_array[8]["id"]	   	   		if  items_array[8]["id"].present?
	  		@medley.i9_title			    = items_array[8]["title"]	   		if  items_array[8]["title"].present?
	  		@medley.i9_price			    = items_array[8]["price"]	   		if  items_array[8]["price"].present?
	  		@medley.i9_img_small			= items_array[8]["imagesmall"]	   	if  items_array[8]["imagesmall"].present?
			@medley.i9_img_big				= items_array[8]["imagelarge"]	   	if  items_array[8]["imagelarge"].present?
			@medley.i9_category			    = items_array[8]["category"]   		if  items_array[8]["category"].present?
			@medley.i9_source			    = items_array[8]["source"]   	    if  items_array[8]["source"].present?
			@medley.i9_link			        = items_array[8]["link"]  	        if  items_array[8]["link"].present?
		end

		if items_array[9].present?
			@medley.i10_r					= items_array[9]["row"] 	   		if  items_array[9]["row"].present?
			@medley.i10_c			        = items_array[9]["col"] 	   		if  items_array[9]["col"].present?
	  		@medley.i10_x			   	 	= items_array[9]["sizex"] 	   		if  items_array[9]["sizex"].present?
	  		@medley.i10_y			    	= items_array[9]["sizey"] 	   		if  items_array[9]["sizey"].present?
	  		@medley.i10_id			        = items_array[9]["id"]	   	   		if  items_array[9]["id"].present?
	  		@medley.i10_title			    = items_array[9]["title"]	   		if  items_array[9]["title"].present?
	  		@medley.i10_price			    = items_array[9]["price"]	   		if  items_array[9]["price"].present?
	  		@medley.i10_img_small			= items_array[9]["imagesmall"]	   	if  items_array[9]["imagesmall"].present?
			@medley.i10_img_big				= items_array[9]["imagelarge"]	   	if  items_array[9]["imagelarge"].present?
			@medley.i10_category			= items_array[9]["category"]   		if  items_array[9]["category"].present?
			@medley.i10_source			    = items_array[9]["source"]   	    if  items_array[9]["source"].present?
			@medley.i10_link			    = items_array[9]["link"]  	        if  items_array[9]["link"].present?
		end

		if items_array[10].present?
			@medley.i11_r					= items_array[10]["row"] 	   		if  items_array[10]["row"].present?
			@medley.i11_c			        = items_array[10]["col"] 	   		if  items_array[10]["col"].present?
	  		@medley.i11_x			   	 	= items_array[10]["sizex"] 	   		if  items_array[10]["sizex"].present?
	  		@medley.i11_y			    	= items_array[10]["sizey"] 	   		if  items_array[10]["sizey"].present?
	  		@medley.i11_id			        = items_array[10]["id"]	   			if  items_array[10]["id"].present?
	  		@medley.i11_title			    = items_array[10]["title"]	   		if  items_array[10]["title"].present?
	  		@medley.i11_price			    = items_array[10]["price"]	   		if  items_array[10]["price"].present?
	  		@medley.i11_img_small			= items_array[10]["imagesmall"]		if  items_array[10]["imagesmall"].present?
			@medley.i11_img_big				= items_array[10]["imagelarge"]		if  items_array[10]["imagelarge"].present?
			@medley.i11_category			= items_array[10]["category"]   	if  items_array[10]["category"].present?
			@medley.i11_source			    = items_array[10]["source"]   	    if  items_array[10]["source"].present?
			@medley.i11_link			    = items_array[10]["link"]  	    	if  items_array[10]["link"].present?
		end

		if items_array[11].present?
			@medley.i12_r					= items_array[11]["row"] 	   		if  items_array[11]["row"].present?
			@medley.i12_c			        = items_array[11]["col"] 	   		if  items_array[11]["col"].present?
	  		@medley.i12_x			   	 	= items_array[11]["sizex"] 	   		if  items_array[11]["sizex"].present?
	  		@medley.i12_y			    	= items_array[11]["sizey"] 	   		if  items_array[11]["sizey"].present?
	  		@medley.i12_id			        = items_array[11]["id"]	   	   		if  items_array[11]["id"].present?
	  		@medley.i12_title			    = items_array[11]["title"]	   		if  items_array[11]["title"].present?
	  		@medley.i12_price			    = items_array[11]["price"]	   		if  items_array[11]["price"].present?
	  		@medley.i12_img_small			= items_array[11]["imagesmall"]		if  items_array[11]["imagesmall"].present?
			@medley.i12_img_big				= items_array[11]["imagelarge"]		if  items_array[11]["imagelarge"].present?
			@medley.i12_category			= items_array[11]["category"]   	if  items_array[11]["category"].present?
			@medley.i12_source			    = items_array[11]["source"]   	    if  items_array[11]["source"].present?
			@medley.i12_link			    = items_array[11]["link"]  	    	if  items_array[11]["link"].present?
		end

		if items_array[12].present?
			@medley.i13_r					= items_array[12]["row"] 	   		if  items_array[12]["row"].present?
			@medley.i13_c			        = items_array[12]["col"] 	   		if  items_array[12]["col"].present?
	  		@medley.i13_x			   	 	= items_array[12]["sizex"] 	   		if  items_array[12]["sizex"].present?
	  		@medley.i13_y			    	= items_array[12]["sizey"] 	   		if  items_array[12]["sizey"].present?
	  		@medley.i13_id			        = items_array[12]["id"]	   	   		if  items_array[12]["id"].present?
	  		@medley.i13_title			    = items_array[12]["title"]	   		if  items_array[12]["title"].present?
	  		@medley.i13_price			    = items_array[12]["price"]	   		if  items_array[12]["price"].present?
	  		@medley.i13_img_small			= items_array[12]["imagesmall"]		if  items_array[12]["imagesmall"].present?
			@medley.i13_img_big				= items_array[12]["imagelarge"]		if  items_array[12]["imagelarge"].present?
			@medley.i13_category			= items_array[12]["category"]   	if  items_array[12]["category"].present?
			@medley.i13_source			    = items_array[12]["source"]   	    if  items_array[12]["source"].present?
			@medley.i13_link			    = items_array[12]["link"]  	    	if  items_array[12]["link"].present?
		end

		if items_array[13].present?
			@medley.i14_r					= items_array[13]["row"] 	   		if  items_array[13]["row"].present?
			@medley.i14_c			        = items_array[13]["col"] 	   		if  items_array[13]["col"].present?
	  		@medley.i14_x			   	 	= items_array[13]["sizex"] 	   		if  items_array[13]["sizex"].present?
	  		@medley.i14_y			    	= items_array[13]["sizey"] 	   		if  items_array[13]["sizey"].present?
	  		@medley.i14_id			        = items_array[13]["id"]	   	   		if  items_array[13]["id"].present?
	  		@medley.i14_title			    = items_array[13]["title"]	   		if  items_array[13]["title"].present?
	  		@medley.i14_price			    = items_array[13]["price"]	   		if  items_array[13]["price"].present?
	  		@medley.i14_img_small			= items_array[13]["imagesmall"]		if  items_array[13]["imagesmall"].present?
			@medley.i14_img_big				= items_array[13]["imagelarge"]		if  items_array[13]["imagelarge"].present?
			@medley.i14_category			= items_array[13]["category"]  		if  items_array[13]["category"].present?
			@medley.i14_source			    = items_array[13]["source"]   	    if  items_array[13]["source"].present?
			@medley.i14_link			    = items_array[13]["link"]  			if  items_array[13]["link"].present?
		end

		if items_array[14].present?	
			@medley.i15_r					= items_array[14]["row"] 	   		if  items_array[14]["row"].present?
			@medley.i15_c			        = items_array[14]["col"] 	   		if  items_array[14]["col"].present?
	  		@medley.i15_x			   	 	= items_array[14]["sizex"] 	   		if  items_array[14]["sizex"].present?
	  		@medley.i15_y			    	= items_array[14]["sizey"] 	   		if  items_array[14]["sizey"].present?
	  		@medley.i15_id			        = items_array[14]["id"]	   	   		if  items_array[14]["id"].present?
	  		@medley.i15_title			    = items_array[14]["title"]	   		if  items_array[14]["title"].present?
	  		@medley.i15_price			    = items_array[14]["price"]	   		if  items_array[14]["price"].present?
	  		@medley.i15_img_small			= items_array[14]["imagesmall"]		if  items_array[14]["imagesmall"].present?
			@medley.i15_img_big				= items_array[14]["imagelarge"]		if  items_array[14]["imagelarge"].present?
			@medley.i15_category			= items_array[14]["category"]   	if  items_array[14]["category"].present?
			@medley.i15_source			    = items_array[14]["source"]   	    if  items_array[14]["source"].present?
			@medley.i15_link			    = items_array[14]["link"]  	   		if  items_array[14]["link"].present?
		end

		if items_array[15].present?
			@medley.i16_r					= items_array[15]["row"] 	   		if  items_array[15]["row"].present?
			@medley.i16_c			        = items_array[15]["col"] 	   		if  items_array[15]["col"].present?
	  		@medley.i16_x			   	 	= items_array[15]["sizex"] 	   		if  items_array[15]["sizex"].present?
	  		@medley.i16_y			    	= items_array[15]["sizey"] 	   		if  items_array[15]["sizey"].present?
	  		@medley.i16_id			        = items_array[15]["id"]	   	   		if  items_array[15]["id"].present?
	  		@medley.i16_title			    = items_array[15]["title"]	   		if  items_array[15]["title"].present?
	  		@medley.i16_price			    = items_array[15]["price"]	   		if  items_array[15]["price"].present?
	  		@medley.i16_img_small			= items_array[15]["imagesmall"]		if  items_array[15]["imagesmall"].present?
			@medley.i16_img_big				= items_array[15]["imagelarge"]		if  items_array[15]["imagelarge"].present?
			@medley.i16_category			= items_array[15]["category"]  		if  items_array[15]["category"].present?
			@medley.i16_source			    = items_array[15]["source"]   	    if  items_array[15]["source"].present?
			@medley.i16_link			    = items_array[15]["link"]  			if  items_array[15]["link"].present?
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
