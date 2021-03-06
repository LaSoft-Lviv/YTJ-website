class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  #protect_from_forgery with: :exception
  rescue_from ::ActiveRecord::RecordNotFound, with: :record_not_found
  rescue_from ::ActiveRecord::RecordInvalid, with: :error_invalid
  before_action :set_locale
  
  protected
  def set_locale
    I18n.locale = params[:locale] || I18n.default_locale
  end

  def record_not_found(exception)
    render json: { success: false, error: exception.message }.to_json, status: 404
    return #TODO I can't understand why need use return
  end

  def error_occurred(exception)
    render json: { success: false, error: exception.message }.to_json, status: 500
    return #TODO I can't understand why need use return
  end

  def authenticate
    authenticate_token || render_unauthorized
  end

  def authenticate_token
    authenticate_with_http_token do |token, options|
      @current_admin = Admin.find_by(auth_token: token)
    end
  end

  def render_unauthorized
    self.headers['WWW-Authenticate'] = 'Token realm="Application"'

    render status: 401, json: { success: false, info: "Bad credentials or don't register" }
  end
end
