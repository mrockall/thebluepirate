class AddPlayerIdToIdentities < ActiveRecord::Migration
  def self.up
    change_table :identities do |t|
      t.integer :player_id
    end
  end

  def self.down
    remove_column :identities, :player_id
  end
end
