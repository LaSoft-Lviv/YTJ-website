require 'google/api_client'
class YoutubeVideosFetcher

  def initialize
    @client = Google::APIClient.new(
        :application_name => $PROGRAM_NAME,
        :application_version => '1.0.0'
    )
    @youtube = @client.discovered_api('youtube', 'v3')
    @client.authorization = nil
  end

  @@instance = YoutubeVideosFetcher.new

  def self.instance
    return @@instance
  end

  def get_playlist_items
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

  private_class_method :new
end