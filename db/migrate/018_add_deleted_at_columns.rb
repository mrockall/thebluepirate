class AddDeletedAtColumns < ActiveRecord::Migration
  def self.up
    add_column :courses, :deleted_at, :datetime
    add_column :events, :deleted_at, :datetime
    add_column :holes, :deleted_at, :datetime
    add_column :identities, :deleted_at, :datetime
    add_column :players, :deleted_at, :datetime
    add_column :scores, :deleted_at, :datetime
    add_column :tee_times, :deleted_at, :datetime
    add_column :tournaments, :deleted_at, :datetime
    add_column :users, :deleted_at, :datetime
  end

  def self.down
    remove_column :courses, :deleted_at, :datetime
    remove_column :events, :deleted_at, :datetime
    remove_column :holes, :deleted_at, :datetime
    remove_column :identities, :deleted_at, :datetime
    remove_column :players, :deleted_at, :datetime
    remove_column :scores, :deleted_at, :datetime
    remove_column :tee_times, :deleted_at, :datetime
    remove_column :tournaments, :deleted_at, :datetime
    remove_column :users, :deleted_at, :datetime
  end
end
