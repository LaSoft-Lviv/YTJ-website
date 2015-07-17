class AccountsController < ApplicationController
  before_action :authenticate, except: :create

  def index #Need delete
    render json: { admins: Admin.all }
  end

  def show
  end

  def create
    @current_admin = Admin.new(account_params)
    if @current_admin.save
      render json: { status: 'success' }
    else
      render json: { status: 'false', errors: @admin.errors }
    end
  end

  def update
    if @current_admin.update_attributes(account_params)
      render json: { user: @current_admin, status: 'success'}
    else
      render json: { status: 'false', errors: @current_admin.errors }
    end
  end

  private

  def account_params
    params.require(:account).permit(:name, :email, :password, :password_confirmation)
  end
end
