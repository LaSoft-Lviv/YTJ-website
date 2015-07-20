class HomeController < ApplicationController
  respond_to :json

  def index
    respond_to do |format|
      format.json { render json:  {projects: Project.all,team: TeamMember.where(is_initiative: true) } }
      format.html
      end


  end

  def new

  end
end
