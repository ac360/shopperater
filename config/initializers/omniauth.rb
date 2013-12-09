Rails.application.config.middleware.use OmniAuth::Builder do
  # The following is for facebook
  provider :facebook, ENV['FACEBOOK_KEY'], ENV['FACEBOOK_SECRET'],
  		   :scope => 'email, read_stream, user_birthday, read_friendlists, friends_likes, friends_status, offline_access, publish_actions', 
  		   :display => 'page'
  # If you want to also configure for additional login services, they would be configured here.
end