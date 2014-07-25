BluePirate::App.controllers :tournaments do
  
  get :'/' do
    t = Tournament.last
    {
      :tournaments => Rabl.render(t, 'tournaments/view', :view_path => 'app/views', :format => 'hash'),
      :tee_times => Rabl.render(t.tee_times, 'tee_times/view', :view_path => 'app/views', :format => 'hash'),
      :scores => Rabl.render(t.scores, 'scores/view', :view_path => 'app/views', :format => 'hash')
    }.to_json
  end

end