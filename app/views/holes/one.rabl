object @tee_times

attributes :id, 
  :course_id, 
  :number, 
  :par, 
  :index, 
  :length

when_expanded(:course, locals) do |expansion_locals|
  child :course do
    extends 'courses/one', :locals => expansion_locals, :unless => :deleted?
  end
end
