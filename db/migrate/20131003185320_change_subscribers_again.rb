class ChangeSubscribersAgain < ActiveRecord::Migration
  def changes
  	remove_column :newsletter_subscribers, :email
  	add_column :newsletter_subscribers, :email, :string, :null => false, :unique => true
  	remove_column :newsletter_subscribers, :first_name
  end
end
