class ProjectsController < ApplicationController
  before_action :authenticate, only: [:create]

  def index
  end

  def create
      @team_member = TeamMember.find(params[:team_member_id])
      @project = Project.new( name: params[:name], description: params[:description], image:  params[:file])
      if @project.save
        @project.team_members_projects.create(coordinator: true, team_member:@team_member)
        render status: 200,
               json: { success: true, info: "project add"}
      else
        render status: false,
               json: { success: false, errors: @project.errors }
      end

  end

  def edit
    @project = Project.find(params[:id])
    render json:  {success: true, project: @project }
  end


  def update
    @project = Project.find(params[:id]);
    @project.update(name: params[:name], description: params[:description], image: params[:file]);

    if(params[:team_member_prev_id])
      @project.team_members_projects.find_by_team_member_id(params[:team_member_prev_id])
                                        .update(team_member_id: params[:team_member_id])
    end
    render json: {status:true, success: true, info: "project add"}
  end

  def destroy
    @project = Project.find(params[:id])
    @project.destroy();
    render json:  {success: true, project: @project }
  end

  private
  def project_params
    params.require(:project).permit(:name, :description, :file)
  end



end
