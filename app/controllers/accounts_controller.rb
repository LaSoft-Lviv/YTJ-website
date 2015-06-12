class AccountsController < ApplicationController
  before_action :set_admin, only: [:show, :edit, :update, :destroy]
  def index
    respond_with Admin.all
  end


  def create
    @admin = Admin.new()

    if @admin.save
      render :json => @admin;
      #session[:user_id] = @admin.id
     # respond_with @admin
     # redirect_to '/'
    else
      #redirect_to '/signup'
    end

  end

  def update
    if @admin.update_attributes(user_params)
      flash[:success] = "Profile updated"
      respond_with @admin
      redirect_to '/'
    else
      render 'edit'
    end
  end

  private

  def user_params
    params.require(:accounts).permit(:name, :email, :password, :password_confirmation)
  end




  def show
  end

  private
  def set_admin
    @admin = current_admin
  end
end
