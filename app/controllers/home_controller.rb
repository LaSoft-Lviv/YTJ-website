class HomeController < ApplicationController
  respond_to :json

  def index
    respond_to do |format|
      format.json { render json:  {projects: Project.all.order("created_at DESC") ,team: TeamMember.where(is_initiative: true) } }
      format.html
      end


  end
end
