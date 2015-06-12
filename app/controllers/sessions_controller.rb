class SessionsController < ApplicationController
  def new
  end

  def create
    @admin = Admin.where(:email => params[:session][:email]).first
   #@accounts = Admin.find_by_email(params[:session][:email])
    if @admin && @admin.authenticate(params[:session][:password])
      session[:user_id] = @admin.id
      redirect_to '/'
    else
      redirect_to '/login'
    end
  end

  def destroy
    session[:user_id] = nil
    redirect_to '/'
  end


end
