class AddSlugToTournaments < ActiveRecord::Migration
  def self.up
    change_table :tournaments do |t|
      t.string :slug
    end
  end

  def self.down
    remove_column :tournaments, :slug
  end
end
