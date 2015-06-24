class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  #protect_from_forgery with: :exception

  private

  def authenticate
    authenticate_token || render_unauthorized
  end

  def authenticate_token
    #params[:auth_token].present? && Admin.find_by(auth_token: params[:auth_token])
    authenticate_with_http_token do |token, options|
      @current_admin = Admin.find_by(auth_token: token)
    end
  end

  def render_unauthorized
    self.headers['WWW-Authenticate'] = 'Token realm="Application"'
    render json: 'Bad credentials', status: 401
  end
end
