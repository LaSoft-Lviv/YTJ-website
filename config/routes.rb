Rails.application.routes.draw do

	root 'home#index'

  #resources :admins
  post 'account' => 'account#create'
  post 'login' => 'sessions#create'
  delete 'logout' => 'sessions#destroy'
  patch 'account' => 'account#update', :as => 'account/update'
  get 'home/index'
  post 'contact' => 'contact#create'
#  get 'sessions/new'
#  get 'sessions/crreate'

#  get 'signup' => 'account#create'
#  get 'account/create'
#  get 'account/edit'=>'account#edit'
#  get 'account/:id/name' => 'account#name'
  #get 'account/update'
 # post 'account/update' => 'account#update'
 # patch "account/update" => "account#update"
 # put "account/update" => "account#update"
  #PATCH/PUT '/admins/:id' => 'account#update'
#  patch "account/update" => "account#update", :as => "account/update"
#  get 'account/email'
#  get 'account/password'
#  get 'account/name'

#  get 'account/show'

#  post 'login' => 'sessions#create'
#  get 'login' =>'sessions#new'
#  delete 'logout' => 'sessions#destroy'
#  get 'logout' => 'sessions#destroy'




  #match '/admins' => 'account#create', via: :post;
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
  #   namespace :account do
  #     # Directs /account/products/* to Admin::ProductsController
  #     # (app/controllers/account/products_controller.rb)
  #     resources :products
  #   end
end
