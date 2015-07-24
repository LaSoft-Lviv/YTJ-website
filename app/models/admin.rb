class Admin < ActiveRecord::Base
  has_secure_password

	VALID_EMAIL_REGEX = /\A[\w+\-.]+@[a-z\d\-.]+\.[a-z]+\z/i

  validates :name, presence: true, length: {minimum:3, maximum: 16 }
  validates :email, presence: true, format: { with: VALID_EMAIL_REGEX }, length: { maximum: 30 },
  uniqueness: { case_sensitive: false }
  validates :password, confirmation: true, length: { minimum: 4 }, on: :create
  validates :password_confirmation, presence: true, on: :create

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
