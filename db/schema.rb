# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended to check this file into your version control system.

ActiveRecord::Schema.define(:version => 17) do

  create_table "courses", :force => true do |t|
    t.string   "name"
    t.datetime "created_at", :null => false
    t.datetime "updated_at", :null => false
  end

  create_table "events", :force => true do |t|
    t.integer  "tournament_id"
    t.integer  "player_id"
    t.integer  "hole_id"
    t.string   "message"
    t.datetime "created_at",    :null => false
    t.datetime "updated_at",    :null => false
  end

  create_table "holes", :force => true do |t|
    t.integer  "course_id"
    t.integer  "number"
    t.integer  "par"
    t.integer  "index"
    t.integer  "length"
    t.datetime "created_at", :null => false
    t.datetime "updated_at", :null => false
  end

  create_table "identities", :force => true do |t|
    t.integer  "user_id"
    t.string   "provider"
    t.string   "uid"
    t.datetime "created_at", :null => false
    t.datetime "updated_at", :null => false
    t.integer  "player_id"
  end

  create_table "players", :force => true do |t|
    t.string   "name"
    t.integer  "handicap"
    t.datetime "created_at",                  :null => false
    t.datetime "updated_at",                  :null => false
    t.string   "facebook_id", :default => "", :null => false
    t.string   "email"
  end

  create_table "scores", :force => true do |t|
    t.integer  "tee_time_id"
    t.integer  "hole_id"
    t.integer  "player_id"
    t.integer  "score"
    t.integer  "points"
    t.datetime "created_at",  :null => false
    t.datetime "updated_at",  :null => false
    t.integer  "putts"
    t.boolean  "fairway"
  end

  create_table "tee_times", :force => true do |t|
    t.integer  "tournament_id"
    t.integer  "player_id"
    t.time     "time"
    t.integer  "through"
    t.integer  "score"
    t.integer  "points"
    t.datetime "created_at",                   :null => false
    t.datetime "updated_at",                   :null => false
    t.string   "login_slug"
    t.integer  "putts",         :default => 0
    t.integer  "fairways",      :default => 0
  end

  create_table "tournaments", :force => true do |t|
    t.string   "name"
    t.integer  "course_id"
    t.date     "date"
    t.datetime "created_at", :null => false
    t.datetime "updated_at", :null => false
    t.string   "slug"
  end

  create_table "users", :force => true do |t|
    t.string   "name"
    t.string   "email"
    t.string   "image_url"
    t.datetime "created_at", :null => false
    t.datetime "updated_at", :null => false
  end

end
