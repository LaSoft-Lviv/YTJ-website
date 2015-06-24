class TeamMembersProject < ActiveRecord::Base
  belongs_to :team_members
  belongs_to :projects
end
