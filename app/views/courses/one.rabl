object @course

attributes :id, 
  :name

when_expanded(:holes, locals) do |expansion_locals|
  child :holes do
    extends 'holes/one', :locals => expansion_locals, :unless => :deleted?
  end
end
