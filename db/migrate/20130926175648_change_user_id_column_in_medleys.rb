class ChangeUserIdColumnInMedleys < ActiveRecord::Migration
    remove_column :medleys, :user_id
    add_column    :medleys, :user_id, :integer, :default => 1
end
