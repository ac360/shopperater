class ShopperaterApiController < ApplicationController

	def get_cart_items

		@cart_items = CartItems.where("user_id =?", current_user.id)
		render :json => @cart_items

	end

end
