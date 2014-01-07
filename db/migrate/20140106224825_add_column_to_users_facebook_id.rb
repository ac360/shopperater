class AddColumnToUsersFacebookId < ActiveRecord::Migration
  def change
    add_column :users, :facebook_id, :string, :unique => truer
  end
end
