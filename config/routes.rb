Shopperater::Application.routes.draw do

  devise_for :users
  match 'api_test', :to => 'amazon_api#index'
  match 'item_search', :to => 'amazon_api#item_search'
  match 'medlies', :to => 'shopperater_api#create_medley', :via => [:post]

  authenticated :user do
    match 'api/get_cart_items', :to => 'shopperater_api#get_cart_items'
  end
  
  root :to => 'main#index'

end
