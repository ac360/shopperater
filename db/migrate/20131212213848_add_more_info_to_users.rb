class AddMoreInfoToUsers < ActiveRecord::Migration
  def change
  	def change
	  	add_column :users, :name, :string
	  	add_column :users, :first_name, :string
	  	add_column :users, :last_name, :string
	  	add_column :users, :location, :string
	  	add_column :users, :gender, :string
	  	add_column :users, :timezone, :string
	  	add_column :users, :image, :string
	  end
  end
end
