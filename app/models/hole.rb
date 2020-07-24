class Hole < ActiveRecord::Base
  acts_as_paranoid

  belongs_to :course

  # Public: Calculates the handicap par for a given player
  def adjusted_par(player)
    self.par + player.handicap/18 + (self.index <= player.handicap%18 ? 1 : 0)
  end
end
