class ChangeAffiliateIdColumnInUsers < ActiveRecord::Migration
  def change
    remove_column :users, :affiliate_id
    add_column :users, :affiliate_id, :string, :default => 'medley01-20'
  end
end
