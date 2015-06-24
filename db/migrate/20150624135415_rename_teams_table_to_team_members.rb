class RenameTeamsTableToTeamMembers < ActiveRecord::Migration
  def change
      rename_table :teams, :team_members
  end
end
