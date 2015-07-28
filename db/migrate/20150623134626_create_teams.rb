class CreateTeams < ActiveRecord::Migration
  def change
    create_table :teams do |t|
      t.string :name
      t.string :surname
      t.string :position
      t.string :quote
      t.string :foto_url
      t.string :phone
      t.string :facebook_link

      t.timestamps null: false
    end
  end
end
