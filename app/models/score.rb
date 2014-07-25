class Score < ActiveRecord::Base
  attr_accessor :result

  ##
  # Relationships
  ## 
  belongs_to :tee_time
  belongs_to :hole
  belongs_to :player
  has_one :event, through: :tee_time

  ##
  # Hooks
  ## 
  before_save :calculate_points, :if => ->(s) { s.score_changed? }
  after_save :update_tee_time

  # before_save: Figures out how many points this player gets for his score.
  def calculate_points
    s = self.hole.adjusted_par(self.player) - self.score + 2
    self.points = s >= 0 ? s : 0
  end

  # after_save: Update the tee time with the totals
  def update_tee_time
    self.tee_time.update_scores
  end

  # Public: Returns the name of the score achieved
  def result
    return "" if self.score.nil?
    
    if (self.score || 0) == self.hole.adjusted_par(self.player)
      "par"
    elsif (self.score || 0) + 1 == self.hole.adjusted_par(self.player)
      "birdie"
    elsif (self.score || 0) < self.hole.adjusted_par(self.player)
      "eagle"
    elsif (self.score || 0) - 1 == self.hole.adjusted_par(self.player)
      "bogey"
    else
      "dbl_bogey"
    end
  end

end