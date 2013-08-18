Shopperater::Application.routes.draw do

  devise_for :users

  # API Routes
  match 'retailer/product_search', :to => 'retailer_api#product_search', :via => [:get]
  match 'retailer/product_lookup', :to => 'retailer_api#product_lookup', :via => [:get]
  match 'medley/medlies', :to => 'shopperater_api#create_medley', :via => [:post]

  authenticated :user do
    match 'api/get_cart_items', :to => 'shopperater_api#get_cart_items'
  end
  
  # Application Routes
  match 'editor', :to => 'main#editor'
  root :to => 'main#browser'

end
