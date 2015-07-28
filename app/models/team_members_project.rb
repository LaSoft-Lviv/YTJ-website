class TeamMembersProject < ActiveRecord::Base
  belongs_to :team_member
  belongs_to :project
end
