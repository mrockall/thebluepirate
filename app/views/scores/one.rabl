object @score

attributes :id, 
  :tee_time_id, 
  :hole_id, 
  :player_id, 
  :score, 
  :points, 
  :result

when_expanded(:tee_time, locals) do |expansion_locals|
  child :tee_time do
    extends 'tee_times/one', :unless => :deleted?
  end
end

when_expanded(:hole, locals) do |expansion_locals|
  child :hole do
    extends 'holes/one', :unless => :deleted?
  end
end

when_expanded(:player, locals) do |expansion_locals|
  child :player do
    extends 'players/one', :unless => :deleted?
  end
end

when_expanded(:event, locals) do |expansion_locals|
  child :event do
    extends 'events/one', :unless => :deleted?
  end
end
