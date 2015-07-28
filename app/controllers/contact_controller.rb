class ContactController < ApplicationController
  def create
    @contact = ContactForm.new( name: params[:contact][:name],
                                email: params[:contact][:email],
                                subject: params[:contact][:subject],
                                message: params[:contact][:message])
    if @contact.valid?
      ContactMailer.contact_email(@contact).deliver_now
      render json: { status: true }
    else
      render json: { errors: @contact.errors }
    end
  end

  private

  def contact_params
    params.require(:contact).permit(:name, :email, :subject, :message)
  end
end
