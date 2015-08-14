class ContactController < ApplicationController
  def create
    @contact = ContactForm.new(contact_params)
    if @contact.valid?
      ContactMailer.contact_email(@contact).deliver_now
      render json: { status: true }
    else
      render json: { status: false, errors: @contact.errors }
    end
  end

  private

  def contact_params
    params.permit(:name, :email, :subject, :message)
  end
end
