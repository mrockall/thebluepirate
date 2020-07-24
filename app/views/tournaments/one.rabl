object @tournament

attributes :id, 
  :course_id, 
  :name, 
  :slug, 
  :date

child :course do
  extends 'courses/one', :unless => :deleted?
end

child :tee_times do
  extends 'tee_times/one', :unless => :deleted?
end
