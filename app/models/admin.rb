class Admin < ActiveRecord::Base
  before_create :set_auth_token
  has_secure_password

  validates :name, presence: true, length:{ maximum: 16 }

  VALID_EMAIL_REGEX = /\A[\w+\-.]+@[a-z\d\-.]+\.[a-z]+\z/i

  validates :email, presence: true, format: { with: VALID_EMAIL_REGEX },
  uniqueness: { case_sensitive: false }

  validates :password, confirmation: true, length: { minimum: 4 }, on: :create
  validates :password_confirmation, presence: true,on: :create


  def set_auth_token
    self.update_attributes(auth_token: generate_auth_token)
  end

  def set_null_auth_token
    self.update_attributes(auth_token: nil)
  end
  private

  def generate_auth_token
    SecureRandom.uuid.gsub(/\-/,'')
  end

end
