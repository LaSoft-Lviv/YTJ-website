CarrierWave.configure do |config|
	config.fog_credentials = {
    provider:               'AWS',       # required
    aws_access_key_id:      'AKIAIYHGJZAOJSXUEYZQ',       # required
    aws_secret_access_key:  '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',       # required
    region:                 'us-west-2'
  }

  config.fog_directory  = 'youthtojesus'                     # required
  config.fog_public     = true
  config.fog_attributes = { 'Cache-Control'=>'max-age=315576000' }  # optional, defaults to {}

	if Rails.env.production?
		config.fog_credentials = {
      provider:               'AWS',       # required
      aws_access_key_id:      ENV['S3_KEY'],
      aws_secret_access_key:  ENV['S3_SECRET'],
      region:                 ENV['S3_REGION']
    }

	  config.fog_directory  = ENV['S3_BUCKET_NAME']
		config.s3_access_policy = :public_read
		config.fog_host         = "#{ENV['S3_ASSET_URL']}/#{ENV['S3_BUCKET_NAME']}"
	end

	config.cache_dir = "#{Rails.root}/tmp/uploads"
	config.storage = :fog
end
