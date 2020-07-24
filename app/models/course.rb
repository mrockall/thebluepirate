class Course < ActiveRecord::Base
  acts_as_paranoid

  has_many :holes, :dependent => :destroy  
end
