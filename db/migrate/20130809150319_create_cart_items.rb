class CreateCartItems < ActiveRecord::Migration
  def change
    create_table :cart_items do |t|

      t.string :product_name
      t.string :product_id
      t.string :product_source
      t.string :product_price
      t.string :product_image
      t.string :product_category
      t.string :product_referral_link
      t.integer :user_id	
      t.timestamps
    end
  end
end
