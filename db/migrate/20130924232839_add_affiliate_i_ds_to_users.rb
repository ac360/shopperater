class AddAffiliateIDsToUsers < ActiveRecord::Migration
  def change
  	add_column :users, :affiliate_id, :string
  end
end
