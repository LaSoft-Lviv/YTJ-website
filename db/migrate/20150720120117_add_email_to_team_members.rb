class AddEmailToTeamMembers < ActiveRecord::Migration
  def change
    add_column :team_members, :email, :string
  end
end
