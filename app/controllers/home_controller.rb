require 'google/api_client'
require 'json'

class HomeController < ApplicationController
  before_action :collect_data_objects, if: :format_json?
  respond_to :json

  def index
      respond_to do |format|
      format.json { render json: { projects: @projects, team: @team_member, slides: @slides, playlistItems: get_playlist_items} }
      format.html
     end
  end

  private
    def get_authenticated_service
     @client = Google::APIClient.new(
          :application_name => $PROGRAM_NAME,
          :application_version => '1.0.0'
      )
     @youtube = @client.discovered_api('youtube', 'v3')
     @client.authorization = nil
    end

    def get_playlist_items
      get_authenticated_service
      playlist_item = @client.execute(
          :key => "AIzaSyAON91YCc5EgOeG4qWC8JBk32P4lWijyNo",
          :api_method => @youtube.playlist_items.list,
          :parameters => {
              :playlistId => 'PLSNJTlTtyhuHP_DsDyLz2iQP6dpy6vIgE',
              :part => 'contentDetails,snippet'
          }
      )
      playlist_item.data.items
    end

  def collect_data_objects
    @projects = Project.all.order("created_at DESC")
    @team_member = TeamMember.where(is_initiative: true)
    @slides = Slide.all().order("created_at DESC")
  end

  def format_json?
    request.format.json?
  end

end
