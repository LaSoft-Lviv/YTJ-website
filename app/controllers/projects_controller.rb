class ProjectsController < ApplicationController
  def index
  end

  def createtest
      @team_member = TeamMember.find(params[:project][:team_member_id])
      @project = Project.create( name: params[:project][:name], description: params[:project][:description])
      if @project.invalid?
        render json: { status: false, errors: @project.errors }
      else
        @project.team_members_projects.create(coordinator: true, team_member:@team_member)
        render json: { status: true }
      end

  end

  def create
    project = Project.new(name:'image', description: 'image')

    project.image = params[:file]
    project.save
    render json: { status: true }
  end


  def destroy
  end

  def update

  end


end
