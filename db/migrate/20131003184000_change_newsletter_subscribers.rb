class ChangeNewsletterSubscribers < ActiveRecord::Migration
  def changes
  	remove_column :newsletter_subscribers, :email
  	add_column :newsletter_subscribers, :email, :string, :null => false, :unique => true
  end
end
