require 'flickraw'
class FlickrAlbumsFetcher
  def self.fetch(opts = {})
    albums = []
    flickr.photosets.getList(opts).map do |item|
      flickr.photosets.getPhotos(photoset_id: item['id']).photo.each do |photo|
        if(photo["isprimary"] == "1")
          albums << { "title"=>item["title"], "url" => FlickRaw.url_b(photo), "id"=>item["id"], "user_id" => "134787160@N07" }
        end
      end
    end
    albums
  end
end

