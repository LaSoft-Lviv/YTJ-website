require 'rails_helper'

RSpec.describe AccountsController, type: :controller do

  describe "GET #new" do
    it "returns http success" do
      get :new
      expect(response).to have_http_status(:success)
    end
  end

  describe "GET #create" do
    it "returns http success" do
      get :create
      expect(response).to have_http_status(:success)
    end
  end

  describe "GET #email" do
    it "returns http success" do
      get :email
      expect(response).to have_http_status(:success)
    end
  end

  describe "GET #password" do
    it "returns http success" do
      get :password
      expect(response).to have_http_status(:success)
    end
  end

  describe "GET #name" do
    it "returns http success" do
      get :name
      expect(response).to have_http_status(:success)
    end
  end

  describe "GET #update" do
    it "returns http success" do
      get :update
      expect(response).to have_http_status(:success)
    end
  end

  describe "GET #show" do
    it "returns http success" do
      get :show
      expect(response).to have_http_status(:success)
    end
  end

end
