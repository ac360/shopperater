Shopperater::Application.routes.draw do

  devise_for :users
  match 'api_test', :to => 'amazon_api#index'
  root :to => 'main#index'

end
