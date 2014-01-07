class ChangeUsersForFacebook < ActiveRecord::Migration
  def change
  	change_column :users, :encrypted_password, :string, :limit => 128, :default => "", :null => true
  end
end
