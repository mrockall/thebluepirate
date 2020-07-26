object @tournament

attributes :id, 
  :course_id, 
  :name, 
  :slug, 
  :date

when_expanded(:course, locals) do |expansion_locals|
  child :course do
    extends 'courses/one', :locals => expansion_locals, :unless => :deleted?
  end
end

when_expanded(:events, locals) do |expansion_locals|
  child :events do
    extends 'events/one', :locals => expansion_locals, :unless => :deleted?
  end
end

when_expanded(:tee_times, locals) do |expansion_locals|
  child :tee_times do
    extends 'tee_times/one', :locals => expansion_locals, :unless => :deleted?
  end
end

when_expanded(:players, locals) do |expansion_locals|
  child :players do
    extends 'players/one', :locals => expansion_locals, :unless => :deleted?
  end
end

when_expanded(:scores, locals) do |expansion_locals|
  child :scores do
    extends 'scores/one', :locals => expansion_locals, :unless => :deleted?
  end
end
