Rails.application.routes.draw do
  resource :session
  resources :passwords, param: :token
  resources :products do
    resources :subscribers, only: [ :create ]
  end
  resource :unsubscribe, only: [ :show ]

  # Defines the root path route ("/")
  root "products#index"
end
