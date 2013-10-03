class DeleteNewsletterSubscribers < ActiveRecord::Migration
  def up
  	drop_table :newsletter_subscribers
  end

  def down
  end
end
