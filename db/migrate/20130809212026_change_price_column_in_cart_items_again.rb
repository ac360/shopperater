class ChangePriceColumnInCartItemsAgain < ActiveRecord::Migration
  
	def change
    	remove_column :cart_items, :product_price
    	add_column :cart_items, :product_price, :string
  	end

end
