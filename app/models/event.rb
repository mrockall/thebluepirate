# encoding: utf-8
# 
# Events are the items that populate the home screen tab. The system
# should be smart enough to generate these news items when events happen
# throughout the tournament.
# 
class Event < ActiveRecord::Base

  belongs_to :tournament
  belongs_to :score

  validates_presence_of :tournament, :score, :message

end
