Rails.application.routes.draw do
  resource :session
  resources :passwords, param: :token
  resources :products do
    resources :subscribers, only: [ :create ]
  end

  # Defines the root path route ("/")
  root "products#index"
end
