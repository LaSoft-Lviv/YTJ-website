class TeamMember< ActiveRecord::Base
  has_many :team_members_projects
  has_many :projects, through: :team_members_projects

  VALID_EMAIL_REGEX = /\A[\w+\-.]+@[a-z\d\-.]+\.[a-z]+\z/i
  validates :name, :surname , presence: true, length:{in: 4..16 }, format: { with: /\A[a-zA-ZА-Яа-яІі]+\z/}
  validates :foto, :quote, presence: true
  validates :email, format: { with: VALID_EMAIL_REGEX }, length: { maximum: 30 },uniqueness: { case_sensitive: false }
  validates :facebook_link, format: {with: /(?:http:\/\/)?(?:www\.)?facebook\.com\/(?:(?:\w)*#!\/)?(?:pages\/)?(?:[\w\-]*\/)*([\w\-]*)/}, allow_blank: true
  validates :phone, format: { with:  /\A\+38\(\d{3}\)\d{3}-\d{2}-\d{2}\z/ }, allow_blank: true
  mount_uploader :foto, ImageUploader
end
