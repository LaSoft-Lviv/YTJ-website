class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception
  #respond_to :json

  helper_method :current_admin

  private

  def current_admin
    @current_admin ||= Admin.find(session[:user_id]) if session[:user_id]
  end
end
