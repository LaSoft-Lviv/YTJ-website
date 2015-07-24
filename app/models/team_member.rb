class TeamMember< ActiveRecord::Base
  has_many :team_members_projects
  has_many :projects, through: :team_members_projects

  VALID_EMAIL_REGEX = /\A[\w+\-.]+@[a-z\d\-.]+\.[a-z]+\z/i
  validates :name, :surname , presence: true, length:{in: 4..16 }, format: { with: /\A[a-zA-Z]+\z/}
  validates :foto, :quote, presence: true
  validates :email, format: { with: VALID_EMAIL_REGEX }, length: { maximum: 30 },uniqueness: { case_sensitive: false }
  validates :facebook_link, format: URI::regexp(%w(http https)), allow_blank: true
  #validates :facebook_link, format: { with: /\A(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-=\?]*)*\/?\z/}
  validates :phone, format: { with: /\A\+?[0-9]{6,13}\z/ }, allow_blank: true
  mount_uploader :foto, ImageUploader
end
