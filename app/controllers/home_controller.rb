require 'google/api_client'
require 'json'
require 'flickraw'


class HomeController < ApplicationController
  before_action :collect_data_objects, if: :format_json?
  respond_to :json

  def index


    FlickRaw.api_key='de20579bcddd55b6c8d3d726bd2a95c7'
    FlickRaw.shared_secret= 'e6fd79528e637279'

    #@photosets = flickr.photosets.getList(user_id: '134787160@N07').map do |set|
     # flickr.photosets.getPhotos(photoset_id: set['id']).photo.map do |photo|
      #if(photo['isprimary'])
       # FlickRaw.url_b(photo)
      #end
      #end
    #end
    @list = flickr.photosets.getList(user_id: "134787160@N07")
      respond_to do |format|
      format.json { render json: { projects: @projects, team: @team_member, slides: @slides, playlistItems: get_playlist_items, albums: @list} }
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
          :key => "AIzaSyDw1IEoAMW7hmnF4cqs9CDZT6yaF-mKn88",
          :api_method => @youtube.playlist_items.list,
          :parameters => {
              :playlistId => 'PLSDUgz1LExyhmsosgHF0CTbmTSri0jf2H',
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
