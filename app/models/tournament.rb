class Tournament < ActiveRecord::Base

  belongs_to :course
  has_many :events
  has_many :tee_times
  has_many :players, through: :tee_times
  has_many :scores, through: :tee_times
  
end
