class ChangeAffiliateIdColumnInUsersAgain < ActiveRecord::Migration
  def change
    remove_column :users, :affiliate_id
    add_column    :users, :affiliate_id, :string, :null => false, :default => 'medley01-20'
  end
end
