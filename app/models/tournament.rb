class Tournament < ActiveRecord::Base
  acts_as_paranoid

  belongs_to :course
  has_many :events, :dependent => :destroy  
  has_many :tee_times, :dependent => :destroy  
  has_many :players, through: :tee_times
  has_many :scores, through: :tee_times
  
end
