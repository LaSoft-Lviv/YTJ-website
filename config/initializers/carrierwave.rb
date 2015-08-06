CarrierWave.configure do |config|
  config.fog_credentials = {
      provider:               'AWS',       # required
      aws_access_key_id:      'AKIAIYHGJZAOJSXUEYZQ',       # required
      aws_secret_access_key:  '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',       # required
      :region                 => 'us-west-2'
  }

  config.cache_dir = "#{Rails.root}/tmp/uploads"
  config.fog_directory  = 'youthtojesus'                     # required
  config.storage = :fog
  config.fog_public     = true
  config.fog_attributes = {'Cache-Control'=>'max-age=315576000'}  # optional, defaults to {}
end
