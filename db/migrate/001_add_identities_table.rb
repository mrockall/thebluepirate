class AddIdentitiesTable < ActiveRecord::Migration
  def self.up
    create_table :identities do |t|
      t.integer :id
      t.integer :user_id
      t.string :provider
      t.string :uid
      t.timestamps
    end
  end

  def self.down
    drop_table :identities
  end
end
