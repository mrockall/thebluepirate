class AddEmailToPlayers < ActiveRecord::Migration
  def self.up
    change_table :players do |t|
      t.string :email
    end
  end

  def self.down
    remove_column :players, :email
  end
end
