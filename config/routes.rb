Rails.application.routes.draw do
	root 'sessions#new'

  #resources :admins
  post "accounts" => "accounts#create"
  post 'login' => 'sessions#create'
  delete 'logout' => 'sessions#destroy'
  patch "accounts" => "accounts#update", :as => "accounts/update"

#  get 'sessions/new'
#  get 'sessions/crreate'

#  get 'signup' => 'accounts#create'
#  get 'accounts/create'
#  get 'accounts/edit'=>'accounts#edit'
#  get 'accounts/:id/name' => 'accounts#name'
  #get 'accounts/update'
 # post 'accounts/update' => 'accounts#update'
 # patch "accounts/update" => "accounts#update"
 # put "accounts/update" => "accounts#update"
  #PATCH/PUT '/admins/:id' => 'accounts#update'
#  patch "accounts/update" => "accounts#update", :as => "accounts/update"
#  get 'accounts/email'
#  get 'accounts/password'
#  get 'accounts/name'

#  get 'accounts/show'

#  post 'login' => 'sessions#create'
#  get 'login' =>'sessions#new'
#  delete 'logout' => 'sessions#destroy'
#  get 'logout' => 'sessions#destroy'




  #match '/admins' => 'accounts#create', via: :post;
  # The priority is based upon order of creation: first created -> highest priority.
  # See how all your routes lay out with "rake routes".

  # You can have the root of your site routed with "root"
  # root 'welcome#index'

  # Example of regular route:
  #   get 'products/:id' => 'catalog#view'

  # Example of named route that can be invoked with purchase_url(id: product.id)
  #   get 'products/:id/purchase' => 'catalog#purchase', as: :purchase

  # Example resource route (maps HTTP verbs to controller actions automatically):
  #   resources :products

  # Example resource route with options:
  #   resources :products do
  #     member do
  #       get 'short'
  #       post 'toggle'
  #     end
  #
  #     collection do
  #       get 'sold'
  #     end
  #   end

  # Example resource route with sub-resources:
  #   resources :products do
  #     resources :comments, :sales
  #     resource :seller
  #   end

  # Example resource route with more complex sub-resources:
  #   resources :products do
  #     resources :comments
  #     resources :sales do
  #       get 'recent', on: :collection
  #     end
  #   end

  # Example resource route with concerns:
  #   concern :toggleable do
  #     post 'toggle'
  #   end
  #   resources :posts, concerns: :toggleable
  #   resources :photos, concerns: :toggleable

  # Example resource route within a namespace:
  #   namespace :accounts do
  #     # Directs /accounts/products/* to Admin::ProductsController
  #     # (app/controllers/accounts/products_controller.rb)
  #     resources :products
  #   end
end
