object @tee_times

attributes :id, :tournament_id, :player_id, :time, :through, :points, :score, :position
node :time_parsed do |t|
  t.time.strftime("%l:%M")
end