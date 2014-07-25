class AddPuttsAndFairwaysToTeeTime < ActiveRecord::Migration
  def self.up
    change_table :tee_times do |t|
      t.integer :putts, :default => 0
      t.integer :fairways, :default => 0
    end
  end

  def self.down
    change_table :tee_times do |t|
      t.remove :putts
      t.remove :fairways
    end
  end
end
