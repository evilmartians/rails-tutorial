Rails.application.routes.draw do
  resource :session
  resources :passwords, param: :token
  resources :products

  # Defines the root path route ("/")
  root "products#index"
end
