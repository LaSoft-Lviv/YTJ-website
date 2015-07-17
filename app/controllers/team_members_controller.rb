class TeamMembersController < ApplicationController
  def index
    render json: {team: TeamMember.all}
  end

  def destroy
  end

  def update
  end

  def create

  end

end
