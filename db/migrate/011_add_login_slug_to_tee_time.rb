class AddLoginSlugToTeeTime < ActiveRecord::Migration
  def self.up
    change_table :tee_times do |t|
      t.string :login_slug
    end

    TeeTime.all.each do |tt|
      tt.generate_login_slug
    end
  end

  def self.down
    remove_column :tee_times, :login_slug
  end
end
