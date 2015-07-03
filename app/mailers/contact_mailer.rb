class ContactMailer < ActionMailer::Base
    default from: 'sofia.nabivanec@gmail.com'

    def contact_email(contact)
      @contact= contact
      mail( to: 'sofia.nabivanec@gmail.com', subject: @contact.subject)
    end
end