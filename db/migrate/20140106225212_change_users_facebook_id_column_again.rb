class ChangeUsersFacebookIdColumnAgain < ActiveRecord::Migration
  def change
  	change_column :users, :facebook_id, :string, :uniqueness => true
  end
end
