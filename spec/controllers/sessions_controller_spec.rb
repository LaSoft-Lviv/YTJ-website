require 'rails_helper'

RSpec.describe SessionsController, type: :controller do

  describe "GET #new" do
    it "returns http success" do
      get :new
      expect(response).to have_http_status(:success)
    end
  end

  describe "GET #crreate" do
    it "returns http success" do
      get :crreate
      expect(response).to have_http_status(:success)
    end
  end

end
