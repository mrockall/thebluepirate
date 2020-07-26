object @tee_time

attributes :id, 
  :tournament_id, 
  :player_id, 
  :time, 
  :through, 
  :points, 
  :score

when_expanded(:player, locals) do |expansion_locals|
  child :player do
    extends 'players/one', :locals => expansion_locals, :unless => :deleted?
  end
end

when_expanded(:tournament, locals) do |expansion_locals|
  child :tournament do
    extends 'tournaments/one', :locals => expansion_locals, :unless => :deleted?
  end
end

when_expanded(:scores, locals) do |expansion_locals|
  child :scores do
    extends 'scores/one', :locals => expansion_locals, :unless => :deleted?
  end
end

