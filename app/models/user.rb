class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :token_authenticatable, :encryptable, :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

  # Setup accessible (or protected) attributes for your model
  attr_accessible :login, :username, :email, :password, :password_confirmation, :remember_me, :affiliate_id

  # Define Relations
  has_many :cart_items, dependent: :destroy
  has_many :authentications, dependent: :destroy

  before_save :set_defaults

  # Validations
  validates_uniqueness_of :username, :case_sensitive => false

  # Virtual attribute for authenticating by either username or email
  # This is in addition to a real persisted field like 'username'
  attr_accessor :login

  def self.find_first_by_auth_conditions(warden_conditions)
      conditions = warden_conditions.dup
      if login = conditions.delete(:login)
        where(conditions).where(["lower(username) = :value OR lower(email) = :value", { :value => login.downcase }]).first
      else
        where(conditions).first
      end
  end

  def apply_omniauth(auth)
      # In previous omniauth, 'user_info' was used in place of 'raw_info'
      self.email = auth['extra']['raw_info']['email']
      self.username = auth['extra']['raw_info']['username']
      self.uid = auth['extra']['raw_info']['id']
      # Again, saving token is optional. If you haven't created the column in authentications table, this will fail
      authentications.build(:provider => auth['provider'], :uid => auth['uid'], :token => auth['credentials']['token'])
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
