namespace :blue_pirate do
  desc "Builds a new tournament"
  task :setup_bp4 => :environment do
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

    def find_or_create_player(name, handicap, facebook_id = nil)
      player = Player.find_by_name name

      player = Player.create do |player|
        player.name = name
        player.handicap = handicap
        player.facebook_id = facebook_id
      end if player.nil?

      player
    end

    def create_tee_times(tournament)
      tournament.tee_times.create([{
        :player => find_or_create_player('George Rahmani', 28, 691342540),
        :time => '09:00:00'
      },{
        :player => find_or_create_player('David Flanagan', 22, 539111621),
        :time => '09:00:00'
      },{
        :player => find_or_create_player('Jack Buckley', 8, 1445472060),
        :time => '09:00:00'
      },{
        :player => find_or_create_player('Cathal Finn', 22, 788368593),
        :time => '09:10:00'
      },{
        :player => find_or_create_player('Steve Horgan', 21, 1336303403),
        :time => '09:10:00'
      },{
        :player => find_or_create_player('Brendan Considine', 20, 1818997307),
        :time => '09:10:00'
      },{
        :player => find_or_create_player('Liam Rockall', 18, 1826322379),
        :time => '09:20:00'
      },{
        :player => find_or_create_player('Rob Kennedy', 23, 100000018897181),
        :time => '09:20:00'
      },{
        :player => find_or_create_player('John O\'Connor', 24, 100001593662663),
        :time => '09:20:00'
      },{
        :player => find_or_create_player('Mike Rockall', 16, 786518139),
        :time => '09:20:00'
      }])
      
      # Guys who won't be playing..
      find_or_create_player 'Ryan Kelly', 28, 820247714
      find_or_create_player 'Danny Finn', 26
      find_or_create_player 'Daire Greene', 28, 100001378112229
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

  task :setup_bp5 => :environment do
    def create_cregmore_course
      course = Course.create({:name => "Cregmore Golf Club"})

      course.holes.create([{
        :number => 1,
        :par => 5,
        :index => 14,
        :length => 498
      },{
        :number => 2,
        :par => 3,
        :index => 16,
        :length => 167
      },{
        :number => 3,
        :par => 5,
        :index => 12,
        :length => 517
      },{
        :number => 4,
        :par => 4,
        :index => 4,
        :length => 391
      },{
        :number => 5,
        :par => 4,
        :index => 10,
        :length => 398
      },{
        :number => 6,
        :par => 3,
        :index => 18,
        :length => 145
      },{
        :number => 7,
        :par => 4,
        :index => 8,
        :length => 401
      },{
        :number => 8,
        :par => 4,
        :index => 2,
        :length => 416
      },{
        :number => 9,
        :par => 4,
        :index => 6,
        :length => 383
      },{
        :number => 10,
        :par => 5,
        :index => 17,
        :length => 483
      },{
        :number => 11,
        :par => 4,
        :index => 9,
        :length => 371
      },{
        :number => 12,
        :par => 3,
        :index => 15,
        :length => 163
      },{
        :number => 13,
        :par => 4,
        :index => 13,
        :length => 349
      },{
        :number => 14,
        :par => 4,
        :index => 1,
        :length => 409
      },{
        :number => 15,
        :par => 4,
        :index => 5,
        :length => 393
      },{
        :number => 16,
        :par => 3,
        :index => 7,
        :length => 151
      },{
        :number => 17,
        :par => 5,
        :index => 11,
        :length => 514
      },{
        :number => 18,
        :par => 4,
        :index => 3,
        :length => 425
      }])

      course
    end

    def find_or_create_player(name, handicap, facebook_id = '')
      player = Player.find_by_name name

      if player.nil?
        player = Player.create do |player|
          player.name = name
          player.handicap = handicap
          player.facebook_id = facebook_id
        end
      else 
        player.update_attributes({
            :handicap => handicap,
            :facebook_id => facebook_id
          })
      end

      player
    end

    def create_tee_times(tournament)
      tournament.tee_times.create([{
        :player => find_or_create_player("Phil Staunton", 18, 788629318),
        :time => '10:02:00'
      },{
        :player => find_or_create_player('Jack Buckley', 9, 1445472060),
        :time => '10:02:00'
      },{
        :player => find_or_create_player("Conor O'Hagan", 28, 572455127),
        :time => '10:02:00'
      },{
        :player => find_or_create_player('Mike Rockall', 16, 786518139),
        :time => '10:10:00'
      },{
        :player => find_or_create_player('Ciaran Considine', 28, 1184451214),
        :time => '10:10:00'
      },{
        :player => find_or_create_player('Liam Rockall', 20, 1826322379),
        :time => '10:10:00'
      },{
        :player => find_or_create_player('Danny Finn', 26),
        :time => '10:18:00'
      },{
        :player => find_or_create_player('David Flanagan', 20, 539111621),
        :time => '10:18:00'
      },{
        :player => find_or_create_player('George Rahmani', 28, 691342540),
        :time => '10:18:00'
      },{
        :player => find_or_create_player('Ryan Kelly', 28, 820247714),
        :time => '10:18:00'
      },{
        :player => find_or_create_player('Alan Dempsey', 20, 1102887886),
        :time => '10:26:00'
      },{
        :player => find_or_create_player('Seamus Keane', 25, 605055151),
        :time => '10:26:00'
      },{
        :player => find_or_create_player('Steve Horgan', 21, 1336303403),
        :time => '10:26:00'
      },{
        :player => find_or_create_player('Brendan Considine', 20, 1818997307),
        :time => '10:26:00'
      }])

      find_or_create_player 'Cathal Finn', 22, 788368593
      find_or_create_player 'Steve Horgan', 21, 1336303403
      find_or_create_player 'Brendan Considine', 20, 1818997307
      find_or_create_player 'Liam Rockall', 18, 1826322379
      find_or_create_player 'Rob Kennedy', 23, 100000018897181
      find_or_create_player 'John O\'Connor', 24, 100001593662663
      find_or_create_player 'Mike Rockall', 16, 786518139
      find_or_create_player 'Jack Buckley', 8, 1445472060
      find_or_create_player 'David Flanagan', 22, 539111621
      find_or_create_player 'George Rahmani', 28, 691342540
      find_or_create_player 'Ryan Kelly', 28, 820247714
      find_or_create_player 'Danny Finn', 26
      find_or_create_player 'Daire Greene', 28, 100001378112229
    end

    course = Course.find_by_name "Cregmore Golf Club"
    course = create_cregmore_course if course.nil?

    tournament = Tournament.create do |t|
      t.name = "Test"
      t.course = course
      t.date = "2014-08-23"
    end

    create_tee_times tournament
  end

  task :setup_bp6 => :environment do
    def create_elm_green
      course = Course.create({:name => "Elm Green"})

      course.holes.create([{
        :number => 1,
        :par => 4,
        :index => 10,
        :length => 274
      },{
        :number => 2,
        :par => 3,
        :index => 18,
        :length => 111
      },{
        :number => 3,
        :par => 4,
        :index => 8,
        :length => 320
      },{
        :number => 4,
        :par => 4,
        :index => 2,
        :length => 367
      },{
        :number => 5,
        :par => 4,
        :index => 14,
        :length => 304
      },{
        :number => 6,
        :par => 4,
        :index => 16,
        :length => 308
      },{
        :number => 7,
        :par => 5,
        :index => 6,
        :length => 465
      },{
        :number => 8,
        :par => 3,
        :index => 12,
        :length => 162
      },{
        :number => 9,
        :par => 4,
        :index => 4,
        :length => 364
      },{
        :number => 10,
        :par => 5,
        :index => 9,
        :length => 437
      },{
        :number => 11,
        :par => 4,
        :index => 17,
        :length => 282
      },{
        :number => 12,
        :par => 3,
        :index => 15,
        :length => 108
      },{
        :number => 13,
        :par => 4,
        :index => 3,
        :length => 363
      },{
        :number => 14,
        :par => 3,
        :index => 11,
        :length => 140
      },{
        :number => 15,
        :par => 4,
        :index => 13,
        :length => 264
      },{
        :number => 16,
        :par => 3,
        :index => 7,
        :length => 179
      },{
        :number => 17,
        :par => 4,
        :index => 5,
        :length => 336
      },{
        :number => 18,
        :par => 4,
        :index => 1,
        :length => 385
      }])

      course
    end

    def find_or_create_player(name, handicap, facebook_id = '')
      player = Player.find_by_name name

      if player.nil?
        player = Player.create do |player|
          player.name = name
          player.handicap = handicap
          player.facebook_id = facebook_id
        end
      else 
        player.update_attributes({
            :handicap => handicap,
            :facebook_id => facebook_id
          })
      end

      player
    end

    def create_tee_times(tournament)
      tournament.tee_times.create([{
        :player => find_or_create_player('Brendan Considine', 18, 1818997307),
        :time => '09:00:00'
      },{
        :player => find_or_create_player('John Power', 18, 1445472060),
        :time => '09:00:00'
      },{
        :player => find_or_create_player("Ronan O'Sullivan", 18, 572455127),
        :time => '09:00:00'
      },{
        :player => find_or_create_player('Mike Rockall', 16, 786518139),
        :time => '09:10:00'
      },{
        :player => find_or_create_player('Eoghan Considine', 28, 1184451214),
        :time => '09:10:00'
      },{
        :player => find_or_create_player('Liam Rockall', 19, 1826322379),
        :time => '09:10:00'
      },{
        :player => find_or_create_player('Danny Finn', 26),
        :time => '09:10:00'
      },{
        :player => find_or_create_player('David Flanagan', 19, 539111621),
        :time => '09:20:00'
      },{
        :player => find_or_create_player('Ciaran Considine', 28, 1184451214),
        :time => '09:20:00'
      },{
        :player => find_or_create_player("Phil Staunton", 18, 788629318),
        :time => '09:20:00'
      },{
        :player => find_or_create_player('Ruaidhri Molloy', 28, 1102887886),
        :time => '09:20:00'
      }])
    end

    course = Course.find_by_name "Elm Green"
    course = create_elm_green if course.nil?

    tournament = Tournament.create do |t|
      t.name = "Blue Pirate #6"
      t.course = course
      t.date = "2014-10-17"
    end

    create_tee_times tournament
  end
end