class ChangeUsersFacebookIdColumn < ActiveRecord::Migration
  def change
  	change_column :users, :facebook_id, :string, :unique => true
  end
end
r