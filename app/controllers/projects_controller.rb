class ProjectsController < ApplicationController
  before_action :authenticate, only: [:create, :edit, :destroy, :update ]

  def create
      @team_member = TeamMember.find(params[:team_member_id])
      @project = Project.new(project_params)
      if @project.save
        @project.team_members_projects.create(coordinator: true, team_member:@team_member)
        render json: { success: true, project: @project}
      else
        render json: { success: false, errors: @project.errors.full_messages }
      end
  end

  def edit
    @project = Project.find(params[:id])
    if @project
      render json:  {success: true, project: @project }
    else
     render json: { success: false, errors: 'not found' }
    end
  end


  def destroy
 	  @project = Project.find(params[:id])
    @project.destroy();
    render json:  {success: true, project: @project }
  end

  def update
 	  @project = Project.find(params[:id]);
   if  @project.update(project_params);
     add_team_member
    render json: {success: true, project: @project }
   else
     render json: {success: false, errors:@project.errors.full_messages }
   end

  end

 private
  def add_team_member
    if(params[:team_member_prev_id] && params[:team_member_id])
      @project.team_members_projects.find_by_team_member_id(params[:team_member_prev_id])
          .update(team_member_id: params[:team_member_id])
    elsif(params[:team_member_id])
      @project.team_members_projects.create(team_member_id: params[:team_member_id], coordinator: true)
    end
   end

  def project_params
    params.permit(:id, :name, :description, :image, :facebook_link)
  end

end
