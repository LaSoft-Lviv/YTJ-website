class Project < ActiveRecord::Base
  has_many :team_members_projects,  dependent: :destroy
  has_many :team_members, -> { select 'team_members.*, team_members_projects.coordinator as coordinator' }, :through => :team_members_projects
  validates :name, :description , presence: true, length:{ minimum: 3 }
  validates :name, length: {maximum: 50}
  validates :description, length: {maximum: 150}
  validates :facebook_link, format: {with: /(?:http:\/\/)?(?:www\.)?facebook\.com\/(?:(?:\w)*#!\/)?(?:pages\/)?(?:[\w\-]*\/)*([\w\-]*)/ }, allow_blank: true
  validates :image , presence: true
  mount_uploader :image, ImageUploader
  def as_json(options={})
    super(options.merge(:include => {:team_members => {:only => [:id, :name, :surname, :position, :phone, :facebook_link, :coordinator]}},
                        :only => [:id, :name, :description, :date_of, :image, :facebook_link]))
  end

end
