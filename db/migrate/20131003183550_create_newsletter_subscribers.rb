class CreateNewsletterSubscribers < ActiveRecord::Migration
  def change
    create_table :newsletter_subscribers do |t|
      t.string :email
      t.string :first_name
      t.timestamps
    end
  end
end
