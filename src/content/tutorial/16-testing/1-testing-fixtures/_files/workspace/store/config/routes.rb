Rails.application.routes.draw do
  resources :products do
    resources :subscribers, only: [ :create ]
  end

  # Defines the root path route ("/")
  root "products#index"
end