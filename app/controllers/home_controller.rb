class HomeController < ApplicationController
  respond_to :json

  def index
    @projects = Project.all.order("created_at DESC")
    @team_member = TeamMember.where(is_initiative: true)

    respond_to do |format|
      format.json { render json: { projects: @projects, team: @team_member } }
      format.html
    end
	  #TODO Need change team -> team_member (back-end, front-end)
  end
end
