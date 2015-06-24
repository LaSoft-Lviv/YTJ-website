class TeamMember< ActiveRecord::Base
  has_many :team_members_projects
  has_many :projects, through: :team_members_projects
  validates :name, :surname , presence: true, length:{ maximum: 16 }, format: { with: /\A[a-zA-Z]+\z/}
  #validates :facebook_link, format: URI::regexp(%w(http https)), allow_blank: true
  validates :facebook_link, format: { with: /\A(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-=\?]*)*\/?\z/}
  validates :phone, format: { with: /\A[0-9]+\z/ }, allow_blank: true
end
