class TeeTime < ActiveRecord::Base

  # Default order for the leaderboard
  default_scope order("points desc, score desc, time asc")

  ##
  # Relationships
  ## 
  belongs_to :player
  belongs_to :tournament
  has_many :scores

  ##
  # Hooks
  ## 
  after_create :create_scores, :if => ->(r) { self.player.present? }
  after_create :generate_login_slug, :if => ->(r) { self.login_slug.nil? }
  before_save :set_defaults

  # after_create: We need a blank score record for each hole
  def create_scores
    tournament.course.holes.each do |h|
      Score.create({
          :tee_time => self,
          :hole => h,
          :player => self.player
        })
    end
  end

  # after_create: Generate a random login slug for this teetime
  def generate_login_slug
    begin
      self.login_slug = ('a'..'z').to_a.shuffle[0,4].join
    end while self.class.exists?(login_slug: login_slug)
    
    self.save
  end

  # before_save
  def set_defaults
    self.through ||= 0
    self.score ||= 0
    self.points ||= 0
    self.putts ||= 0
    self.fairways ||= 0
  end

  # Public: Updates the cached scores on the tee time
  def update_scores
    self.score = self.scores.map(&:score).reject {|s| s.nil? }.reduce(:+) || 0
    self.points = self.scores.map(&:points).reject {|s| s.nil? }.reduce(:+) || 0
    self.putts = self.scores.map(&:putts).reject {|s| s.nil? }.reduce(:+) || 0
    self.through = self.scores.map {|s| s.score.nil? ? nil : s.hole.number }.reject {|s| s.nil? }.max || 0
    self.fairways = self.scores.map{|s|
      s.fairway ? 1 : 0
    }.reject {|s| s.nil? }.reduce(:+) || 0
    self.save
  end

  # Public: Determines the position within the leaderboard
  def position
    event_tee_times = TeeTime.find_all_by_tournament_id self.tournament_id
    (event_tee_times.find_index { |t| t.id == self.id }) + 1
  end

  # Public: Counts the amount of fairways played (excludes par 3)
  def fairways_played
    self.scores.map {|score|
      1 if score.hole.par != 3 and !score.fairway.nil?
    }.reject {|s| s.nil? }.reduce(:+) || 0
  end

  # Public: Counts the amount of fairways hit (excludes par 3)
  def fairways_hit
    self.scores.map {|score|
      (score.fairway ? 1 : 0) if score.hole.par != 3
    }.reject {|s| s.nil? }.reduce(:+) || 0
  end

  # Public: Counts the amount of greens played (only par 3)
  def greens_played
    self.scores.map {|score|
      1 if score.hole.par == 3 and !score.fairway.nil?
    }.reject {|s| s.nil? }.reduce(:+) || 0
  end

  # Public: Counts the amount of greens hit (only par 3)
  def greens_hit
    self.scores.map {|score|
      (score.fairway ? 1 : 0) if score.hole.par == 3
    }.reject {|s| s.nil? }.reduce(:+) || 0
  end

end
