class AccountsController < ApplicationController
  before_action :authenticate, except: :create

  def show
    if @current_admin
      render json: { status: true, user: @current_admin, permission: :isAdministrator }
    else
      render json: { status: false, errors: @current_admin.errors }
    end
  end
  def edit
    if @current_admin
     render json: { status: true, user: @current_admin }
    else
      render json: { status: false, errors: @current_admin.errors }
    end
  end

  def create
    @current_admin = Admin.new(account_params)
    if @current_admin.save
      render json: { status: true, user: @current_admin}
    else
      render json: { status: false, errors: @current_admin.errors }
    end
  end

  def update
    if @current_admin.update_attributes(account_params)
      render json: { status: true, user: @current_admin }
    else
      render json: { status: false, errors: @current_admin.errors }
    end
  end

  private

  def account_params
    params.require(:account).permit(:name, :email, :password, :password_confirmation)
  end
end
