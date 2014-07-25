namespace :blue_pirate do
  desc "Builds a new tournament"
  task :setup_bp5 => :environment do
    def create_gort_course
      course = Course.create({:name => "Gort Golf Club"})

      course.holes.create([{
        :number => 1,
        :par => 4,
        :index => 13,
        :length => 339
      },{
        :number => 2,
        :par => 4,
        :index => 5,
        :length => 397
      },{
        :number => 3,
        :par => 4,
        :index => 3,
        :length => 370
      },{
        :number => 4,
        :par => 4,
        :index => 11,
        :length => 325
      },{
        :number => 5,
        :par => 3,
        :index => 15,
        :length => 126
      },{
        :number => 6,
        :par => 4,
        :index => 17,
        :length => 271
      },{
        :number => 7,
        :par => 4,
        :index => 1,
        :length => 407
      },{
        :number => 8,
        :par => 3,
        :index => 9,
        :length => 151
      },{
        :number => 9,
        :par => 5,
        :index => 7,
        :length => 478
      },{
        :number => 10,
        :par => 4,
        :index => 10,
        :length => 308
      },{
        :number => 11,
        :par => 4,
        :index => 2,
        :length => 360
      },{
        :number => 12,
        :par => 4,
        :index => 14,
        :length => 295
      },{
        :number => 13,
        :par => 3,
        :index => 6,
        :length => 160
      },{
        :number => 14,
        :par => 5,
        :index => 16,
        :length => 482
      },{
        :number => 15,
        :par => 4,
        :index => 8,
        :length => 303
      },{
        :number => 16,
        :par => 3,
        :index => 18,
        :length => 151
      },{
        :number => 17,
        :par => 5,
        :index => 12,
        :length => 440
      },{
        :number => 18,
        :par => 4,
        :index => 4,
        :length => 344
      }])

      course
    end

    def find_or_create_player(name, handicap)
      player = Player.find_by_name name

      player = Player.create do |player|
        player.name = name
        player.handicap = handicap
      end if player.nil?

      player
    end

    def create_tee_times(tournament)
      tournament.tee_times.create([{
        :player => find_or_create_player('George Rahmani', 28),
        :time => '09:00:00'
      },{
        :player => find_or_create_player('David Flanagan', 22),
        :time => '09:00:00'
      },{
        :player => find_or_create_player('Jack Buckley', 8),
        :time => '09:00:00'
      },{
        :player => find_or_create_player('Cathal Finn', 22),
        :time => '09:10:00'
      },{
        :player => find_or_create_player('Steve Horgan', 21),
        :time => '09:10:00'
      },{
        :player => find_or_create_player('Brendan Considine', 20),
        :time => '09:10:00'
      },{
        :player => find_or_create_player('Liam Rockall', 18),
        :time => '09:20:00'
      },{
        :player => find_or_create_player('Rob Kennedy', 23),
        :time => '09:20:00'
      },{
        :player => find_or_create_player('John O\'Connor', 24),
        :time => '09:20:00'
      },{
        :player => find_or_create_player('Mike Rockall', 16),
        :time => '09:20:00'
      }])
      
      # Guys who won't be playing..
      find_or_create_player 'Ryan Kelly', 28
      find_or_create_player 'Danny Finn', 26
      find_or_create_player 'Daire Greene', 28
    end

    course = Course.find_by_name "Gort Golf Club"
    course = create_gort_course if course.nil?

    tournament = Tournament.create do |t|
      t.name = "Blue Pirate #5"
      t.course = course
      t.date = "2014-07-26"
    end

    create_tee_times tournament
  end
end