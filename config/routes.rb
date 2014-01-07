Shopperater::Application.routes.draw do

  # Internal API Routes
  match 'api/current_user',                 :to => 'medley_api#user_information',             :via => [:get]
  match 'api/medleys',                      :to => 'medley_api#medley_search',                :via => [:get]
  match 'api/medleys',                      :to => 'medley_api#create_medley',                :via => [:post]
  match 'api/medley_create_items/:id',      :to => 'medley_api#medley_create_items',          :via => [:put]
  match 'api/medley/:id',                   :to => 'medley_api#medley_show',                  :via => [:get]
  match 'api/medley/:id',                   :to => 'medley_api#update_medley',                :via => [:put]
  match 'api/medleys_most_recent',          :to => 'medley_api#medley_most_recent',           :via => [:get]
  match 'api/medleys_by_user',              :to => 'medley_api#medleys_by_user',              :via => [:get]
  match 'api/product_search',               :to => 'medley_api#product_search',               :via => [:get]
  match 'api/product_lookup',               :to => 'medley_api#product_lookup',               :via => [:get]
  match 'api/username_validation',          :to => 'medley_api#username_validation',          :via => [:get]
  match 'api/email_validation',             :to => 'medley_api#email_validation',             :via => [:get]
  match 'api/medley_title_validation',      :to => 'medley_api#medley_title_validation',      :via => [:get]
  match 'api/medley_uniqueness_validation', :to => 'medley_api#medley_uniqueness_validation', :via => [:get]
  match 'api/add_newsletter_subscriber',    :to => 'medley_api#add_newsletter_subscriber',    :via => [:post]
  match 'api/facebook_login',               :to => 'medley_api#facebook_login',               :via => [:post]

  # External API Routes
  constraints subdomain: 'api' do
    match 'v1/medley/:id',          :to => 'api_external#medley_show',                :via => [:get]
  end

  devise_for :users, :controllers => { :omniauth_callbacks => "users/omniauth_callbacks" }
  devise_scope :users do
    post '/users' => 'registrations#create', :as => 'user_registration'
  end

  # Other Application Routes
  get '/_=_',         to: redirect('/')
  match 'embeds',     :to => 'main#embeds'
  match 'editor',     :to => 'main#editor'
  match '/:id',       :to => 'main#show'
  root                :to => 'main#browser'

end
