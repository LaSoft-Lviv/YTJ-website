class TeamMembersController < ApplicationController
  before_action :authenticate, only: [:create]

  def index
    render json: {team: TeamMember.all}
  end

  def destroy
  end

  def update
  end

  def create
    @team_member = TeamMember.new( name: params[:name], surname: params[:surname], foto:  params[:file],
                                   is_initiative:true)
    if @team_member.save
      render status: 200,
             json: { success: true, team_member: @team_member, info: 'team member add'}
    else
      render status: false,
             json: { success: false, errors: @team_member.errors }
    end
  end

  def team_member_params
    #params.permit(:name, :surname, :email, :quote, :foto)
  end
end
