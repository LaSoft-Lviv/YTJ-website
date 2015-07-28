class SessionsController < ApplicationController
  before_action :authenticate, except: :create

  def create
    @admin = Admin.find_by(email: params[:session][:email])

    if @admin && @admin.authenticate(params[:session][:password])
      @admin.set_auth_token
      render json: { status: 'success', user: @admin }
    else
      render json: { status: false, errors: 'Invalid email or password' }
    end
  end

  def destroy
    @current_admin.set_null_auth_token

    render json: { status: 'success' }
  end
end
