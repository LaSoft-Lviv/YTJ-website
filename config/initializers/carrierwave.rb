class Configuration
  def self.fog(config)
    config.fog_directory  = 'youthtojesus'                     # required
    config.fog_public     = true
    config.fog_attributes = { 'Cache-Control'=>'max-age=315576000' }  # optional, defaults to {}
  end
end

CarrierWave.configure do |config|
	if Rails.env.production?
    Configuration.fog(config)

		config.fog_credentials = {
      provider:               'AWS',       # required
      aws_access_key_id:      ENV['S3_KEY'],
      aws_secret_access_key:  ENV['S3_SECRET'],
      region:                 ENV['S3_REGION']
    }

	  config.fog_directory  = ENV['S3_BUCKET_NAME']
		#config.s3_access_policy = :public_read
		#config.fog_host         = "#{ENV['S3_ASSET_URL']}/#{ENV['S3_BUCKET_NAME']}"
    config.storage = :fog
	end

	if Rails.env.test? || Rails.env.development?
    Configuration.fog(config)

    config.fog_credentials = {
      provider:               'AWS',       # required
      aws_access_key_id:      '',       # required
      aws_secret_access_key:  '',       # required
      region:                 ''
    }
		config.storage = :file
		config.enable_processing = true
    config.cache_dir = "#{Rails.root}/tmp/uploads"
	end
end

