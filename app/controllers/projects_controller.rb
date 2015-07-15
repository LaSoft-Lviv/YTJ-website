class ProjectsController < ApplicationController
  before_action :authenticate, only: :create

  def index
  end

  def create
    @team_member = TeamMember.find(params[:team_member_id])
    @project = Project.new(name: params[:name], description: params[:description], image: params[:file])

    if @project.save
      @project.team_members_projects.create(coordinator: true, team_member: @team_member)

      render json: { success: true, info: 'The project was added' }, status: 200
    else
      render json: { success: false, errors: @project.errors }, status: false
    end
  end

  def destroy
  end

  def update
  end

end
