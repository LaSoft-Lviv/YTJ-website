class CreateTeamMembersProjects < ActiveRecord::Migration
  def change
    create_table :team_members_projects do |t|
      t.boolean :coordinator
      t.belongs_to :team_member, index: true
      t.belongs_to :project, index: true
      t.timestamps null: false
    end
  end
end
