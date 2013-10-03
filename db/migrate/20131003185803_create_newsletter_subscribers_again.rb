class CreateNewsletterSubscribersAgain < ActiveRecord::Migration
	def change
	    create_table :newsletter_subscribers do |t|
	        t.string :email, :null => false, :unique => true
	        t.timestamps
	    end
    end
end
