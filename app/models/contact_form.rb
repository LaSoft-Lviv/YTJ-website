class ContactForm
  include ActiveModel::Model
  include ActiveModel::Validations

  attr_accessor :name,  :subject, :email, :message

  VALID_EMAIL_REGEX = /\A[\w+\-.]+@[a-z\d\-.]+\.[a-z]+\z/i
  validates :name, :subject, :message, :email, presence: true
  validates :name, length: {in: 3..16}
  validates :subject, length: {minimum: 3}
  validates :email, presence: true, format: { with: VALID_EMAIL_REGEX }, length: { maximum: 30 }
end