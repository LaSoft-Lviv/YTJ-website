class SessionsController < ApplicationController
  before_action :authenticate, except: [:new, :create]

  def new
  end

  def create
    @admin = Admin.find_by(email: params[:session][:email])
    @admin.set_auth_token

    if @admin.authenticate(params[:session][:password])
      render :json => { :user => @admin, :status => 'success' }
    else
      render :json => { status: 'false', errors: @admin.errors }
    end
  end

  def destroy
    @current_admin.set_null_auth_token
    render :status => 200,
           :json => { :success => true,
                      :info => "Logged out",
           }

  end

end
