class CartItems < ActiveRecord::Base
  
  attr_protected

  belongs_to :user
  
end
