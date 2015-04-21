class Player < ActiveRecord::Base

  belongs_to :user
  has_many :events, :through => :tee_times
  has_many :tee_times
  has_many :identities
  
end