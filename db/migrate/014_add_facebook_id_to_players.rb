class AddFacebookIdToPlayers < ActiveRecord::Migration
  def self.up
    change_table :players do |t|
      t.string :facebook_id
    end
  end

  def self.down
    change_table :players do |t|
      t.remove :facebook_id
    end
  end
end
