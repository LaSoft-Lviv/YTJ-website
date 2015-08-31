class Photoset
  def self.fetch(opts = {})
    albums = []
    flickr.photosets.getList(opts).map do |item|
      flickr.photosets.getPhotos(photoset_id: item['id']).photo.each do |photo|
        if(photo["isprimary"] == "1")
          binding.pry
          albums << { "title"=>item["title"], "url" => FlickRaw.url_b(photo), "id"=>item["id"], "user_id" => "134787160@N07" }
          binding.pry
        end
      end
    end
    albums
  end
end

