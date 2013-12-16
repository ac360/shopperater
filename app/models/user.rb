class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :token_authenticatable, :encryptable, :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable, :recoverable, :rememberable, :trackable, :validatable, :omniauthable, :omniauth_providers => [:facebook, :etsy]

  # Setup accessible (or protected) attributes for your model
  attr_protected

  # Define Relations
  has_many :cart_items, dependent: :destroy
  has_many :authentications, dependent: :destroy

  before_save :set_defaults

  # Validations
  validates_uniqueness_of :username, :case_sensitive => false

  # Virtual attribute for authenticating by either username or email
  # This is in addition to a real persisted field like 'username'
  attr_accessor :login

  def self.find_for_facebook_oauth(auth, signed_in_resource=nil)
      user = User.where(:provider => auth.provider, :uid => auth.uid).first
      unless user
        user = User.create(
           email:auth.info.email,
           username:auth.extra.raw_info.username,
           uid:auth.uid,
           name:auth.extra.raw_info.name,
           first_name:auth.extra.raw_info.first_name,
           last_name:auth.extra.raw_info.last_name,
           location:auth.info.location,
           gender:auth.extra.raw_info.gender,
           timezone:auth.extra.raw_info.timezone,
           image:auth.info.image,
           provider:auth.provider,
           password:Devise.friendly_token[0,20]
        )
      end
      user
  end

  def self.find_for_etsy_oauth(auth, signed_in_resource=nil)
      user = User.where(:provider => auth.provider, :uid => auth.uid).first
      puts "HEERE!"
      unless user
        user = User.create!(
          uid:auth.uid,
          provider:auth.provider,
          username:auth.info.nickname,
          token:auth.info.token,
          email:auth.info.email,
          name:auth.info.name,
          first_name:auth.info.first_name,
          last_name:auth.info.last_name,
          gender:auth.info.gender,
          location:auth.info.location,
          image:auth.info.image, 
          password:Devise.friendly_token[0,20]
        )
      end
      user
  end

  # Update Account Information On Login
  def self.new_with_session(params, session)
    super.tap do |user|
      
      if data = session["devise.facebook_data"] && session["devise.facebook_data"]["extra"]["raw_info"]
        user.email = data["email"]
      elsif data = session["devise.etsy_data"] && session["devise.etsy_data"]["info"]
        user.email = data["email"]
      end
        
    end
  end


  protected

  def set_defaults
      if self.affiliate_id.blank?
          self.affiliate_id = 'medley01-20'
      else
          self.affiliate_id ||= 'medley01-20'
      end
  end

end
