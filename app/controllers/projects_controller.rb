class ProjectsController < ApplicationController
  def index
  end

  def create
      @team_member = TeamMember.find(params[:team_member_id])
      @project = Project.new( name: params[:name], description: params[:description], image:  params[:file])

      if @project.save
        @project.team_members_projects.create(coordinator: true, team_member:@team_member)
        render json: { status: true }
      else
        render json: { status: false, errors: @project.errors }
      end

  end



  def destroy
  end

  def update

  end


end
