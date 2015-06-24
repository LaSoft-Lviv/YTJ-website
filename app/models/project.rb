class Project < ActiveRecord::Base
  has_many :team_members_projects
  has_many :team_members, through: :team_members_projects
end
