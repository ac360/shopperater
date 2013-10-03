class NewsletterSubscriber < ActiveRecord::Base
  attr_accessible :email
  validates :email, uniqueness: true
end
