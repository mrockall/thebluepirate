class CreateEvents < ActiveRecord::Migration
  def self.up
    create_table :events do |t|
      t.integer :tournament_id
      t.integer :player_id
      t.integer :hole_id
      t.string :message
      t.timestamps
    end
  end

  def self.down
    drop_table :events
  end
end
