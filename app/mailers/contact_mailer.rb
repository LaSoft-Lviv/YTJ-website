class ContactMailer < ActionMailer::Base
    default from: 'ytjcontact@gmail.com'


    def contact_email(contact)
      @contact= contact
      mail( to: 'ytjcontact@gmail.com', subject: @contact.subject)
    end
end