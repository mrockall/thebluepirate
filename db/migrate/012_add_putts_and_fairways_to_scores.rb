class AddPuttsAndFairwaysToScores < ActiveRecord::Migration
  def self.up
    change_table :scores do |t|
      t.integer :putts
      t.boolean :fairway
    end
  end

  def self.down
    change_table :scores do |t|
      t.remove :putts
      t.remove :fairway
    end
  end
end
