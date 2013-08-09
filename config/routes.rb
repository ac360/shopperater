Shopperater::Application.routes.draw do

  devise_for :users
  match 'api_test', :to => 'amazon_api#index'
  match 'item_search', :to => 'amazon_api#item_search'
  match 'item_search_image_response', :to => 'amazon_api#item_search_image_response'
  root :to => 'main#index'

end
