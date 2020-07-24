class Player < ActiveRecord::Base
  acts_as_paranoid

  belongs_to :user
  has_many :events, :through => :tee_times
  has_many :tee_times, :dependent => :destroy  
  has_many :identities, :dependent => :destroy  
  
end