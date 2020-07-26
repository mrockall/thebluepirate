object @player

attributes :id, 
  :name, 
  :handicap, 
  :facebook_id

when_expanded(:user, locals) do |expansion_locals|
  child :user do
    extends 'users/one', :locals => expansion_locals, :unless => :deleted?
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
