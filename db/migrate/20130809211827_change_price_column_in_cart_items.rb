class ChangePriceColumnInCartItems < ActiveRecord::Migration
    
  def change
    remove_column :cart_items, :product_price
    add_column :cart_items, :product_price, :integer
  end

end
