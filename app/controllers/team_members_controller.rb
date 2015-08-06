class TeamMembersController < ApplicationController
  before_action :authenticate, only: [:create, :edit, :destroy, :update ]

  def index
    render json: {team: TeamMember.all}
  end

  def create
    @team_member = TeamMember.new(team_member_params)
    if @team_member.save
      render status: 200,
             json: { success: true, team_member: @team_member, info: 'team member add'}
    else
      render status: false,
             json: { success: false, errors: @team_member.errors }
    end
  end

  def edit
    @team_member = TeamMember.find(params[:id]);
    render json: { success: true, team_member: @team_member}
  end

  def update
    @team_member = TeamMember.find(params[:id])
   if  @team_member.update(team_member_params)
    render json: {success: true, team_member: @team_member}
   else
     render json: {success: false, errors: @team_member.errors}
   end
  end

  def destroy
    @team_member = TeamMember.find(params[:id])
    @team_member.destroy
    render json:  {success: true, team_member: @team_member}
  end

  def team_member_params
    params.permit(:name, :surname, :email, :quote, :foto, :phone, :position, :facebook_link, :is_initiative)
  end
end
