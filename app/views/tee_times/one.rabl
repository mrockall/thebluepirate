object @tee_times

attributes :id, 
  :tournament_id, 
  :player_id, 
  :time, 
  :through, 
  :points, 
  :score

child :player do
  extends 'players/one', :unless => :deleted?
end
