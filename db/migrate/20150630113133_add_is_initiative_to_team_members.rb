class AddIsInitiativeToTeamMembers < ActiveRecord::Migration
  def change
    add_column :team_members, :is_initiative, :boolean
  end
end
