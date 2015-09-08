require 'json'

class HomeController < ApplicationController
  before_action :collect_data_objects, if: :format_json?
  respond_to :json

  def index
      respond_to do |format|
      format.json { render json: { projects: @projects, team: @team_member, slides: @slides, playlistItems: YoutubeVideosFetcher.instance.get_playlist_items, albums: get_flickr_albums } }
      format.html
     end
  end

  private
    def get_youtube_playlist
      YoutubeVideosFetcher.instance.get_playlist_items
    end

  def get_flickr_albums
    FlickrAlbumsFetcher.fetch(user_id: '134787160@N07')
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