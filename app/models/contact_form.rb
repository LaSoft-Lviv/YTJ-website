class ContactForm
  include ActiveModel::Model
  include ActiveModel::Validations

  attr_accessor :name,  :subject, :email, :message
  validates :name, :subject, :message, :email, presence: true
end