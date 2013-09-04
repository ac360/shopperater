Shopperater::Application.routes.draw do

  # API Routes
  match 'api/product_search', :to => 'medley_api#product_search', :via => [:get]
  match 'api/product_lookup', :to => 'medley_api#product_lookup', :via => [:get]
  match 'medley/medlies',     :to => 'shopperater_api#create_medley', :via => [:post]

  authenticated :user do
    match 'api/get_cart_items', :to => 'shopperater_api#get_cart_items'
    # Authenticated API Routes
    match 'api/current_user',   :to => 'medley_api#current_user',   :via => [:get]
  end
  devise_for :users
  devise_scope :user do
    get '/login'    => 'devise/sessions#new'
    get '/register' => 'devise/registrations#new'
    get 'logout'    => 'devise/sessions#destroy'
  end
  
  # Application Routes
  match 'editor',   :to => 'main#editor'
  root              :to => 'main#browser'

end
