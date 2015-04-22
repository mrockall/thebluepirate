# SeedTournament class
# 
# Used to seed a brand new tournament with all of the tee time
# and player data..
# 
# Expects data in this form:
#   {
#     name: 'Blue Pirate #7',
#     date: '2015-04-20',
#     course: {
#       name: 'Bearna Golf Club'
#       holes: [{
#         number: 1,
#         par: 4,
#         index: 10,
#         length: 274
#       }, {...}, ...]
#     },
#     tee_times: [{
#       player: {
#         email: 'mrockall@gmail.com',
#         name: 'Mike Rockall',
#         handicap: 16
#       },
#       time: '09:00:00'
#     }, {...}, ...]
#   }
# 
class SeedTournament < BaseService

  # Store the data passed on initialize
  def initialize data
    @data = data
  end

  def execute
    unless all_data_present?
      logger.info "Not all of the information was present"
      logger.info "We require the tournament name and data, the course and at least one tee_time."
      return false
    end

    find_or_create_course

    create_tournament

    create_tee_times

    send_welcome_emails

  end

  private

  def find_or_create_course
    @course = Course.find_by_name @data[:course][:name]
    return @course if @course.present?

    # Create the course brand new..
    @course = Course.create({
      name: @data[:course][:name]
    })

    # Create the holes for this course..
    @course.holes.create @data[:course][:holes]
  end

  def create_tournament
    @tournament = Tournament.create do |t|
      t.name = @data[:name]
      t.date = @data[:date]
      t.course = @course
    end
  end

  def create_tee_times
    tee_times = @data[:tee_times].map do |tee_time|
      {
        player: find_or_create_player(tee_time[:player]),
        time: tee_time[:time]
      }
    end

    @tournament.tee_times.create tee_times
  end

  def find_or_create_player player_data
    player = Player.find_by_name player_data[:name]

    if player.nil?
      player = Player.create player_data.only(:name, :handicap, :facebook_id, :email)
    else 
      player.update_attributes player_data.only(:handicap, :facebook_id, :email)
    end

    Identity.find_or_create_triple_option_identity_for_player(player)

    player
  end

  def send_welcome_emails
    if @tournament.valid?
      @tournament.players.each do |player|
        BluePirate::App.deliver(:tournament, :new_tee_time, @tournament, player) if player.email.present?
      end
    end
  end

  def all_data_present?
    @data.has_key?(:name) && @data.has_key?(:date) && @data.has_key?(:course) && @data.has_key?(:tee_times)
  end
end