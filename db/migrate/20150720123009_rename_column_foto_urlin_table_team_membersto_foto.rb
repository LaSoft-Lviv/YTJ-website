class RenameColumnFotoUrlinTableTeamMemberstoFoto < ActiveRecord::Migration
  def change
    rename_column :team_members, :foto_url, :foto
  end
end
