class Admin < ActiveRecord::Base

  #attr_accessible :password_confirmation
  has_secure_password

  validates :name, presence: true, length:{ maximum: 16 }

  VALID_EMAIL_REGEX = /\A[\w+\-.]+@[a-z\d\-.]+\.[a-z]+\z/i

  validates :email, presence: true, format: { with: VALID_EMAIL_REGEX },
  uniqueness: { case_sensitive: false }

  validates :password, confirmation: true, length: { minimum: 4 }, on: :create
  validates :password_confirmation, presence: true,on: :create

end
