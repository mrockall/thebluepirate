class TeeTime < ActiveRecord::Base

  default_scope order("points desc, score desc, time asc")

  belongs_to :player
  belongs_to :tournament
  has_many :scores

  after_create :create_scores, :if => ->(r) { self.player.present? }
  after_create :generate_login_slug, :if => ->(r) { self.login_slug.nil? }
  before_save :set_defaults

  def create_scores
    tournament.course.holes.each do |h|
      Score.create({
          :tee_time => self,
          :hole => h,
          :player => self.player
        })
    end
  end

  def set_defaults
    self.through ||= 0
    self.score ||= 0
    self.points ||= 0
  end

  def update_scores
    self.score = self.scores.map(&:score).reject {|s| s.nil? }.reduce(:+)
    self.points = self.scores.map(&:points).reject {|s| s.nil? }.reduce(:+)
    self.through = self.scores.map {|s| s.score.nil? ? nil : s.hole.number }.reject {|s| s.nil? }.max
    self.save
  end

  def position
    event_tee_times = TeeTime.find_all_by_tournament_id self.tournament_id
    (event_tee_times.find_index { |t| t.id == self.id }) + 1
  end

  def get_scores
    self.scores.map { |s| {
      :hole_id => s.hole_id,
      :score => s.score,
      :points => s.points,
      :result => s.result?
    }}
  end

  def generate_login_slug
    begin
      self.login_slug = ('a'..'z').to_a.shuffle[0,4].join
    end while self.class.exists?(login_slug: login_slug)
    
    self.save
  end

end
