BluePirate::App.controllers :tournaments do
  
  get :'/' do
    t = Tournament.includes(:tee_times, :scores).last
    {
      :tournaments => Rabl.render(t, 'tournaments/view', :view_path => 'app/views', :format => 'hash'),
      :tee_times => Rabl.render(t.tee_times, 'tee_times/view', :view_path => 'app/views', :format => 'hash'),
      :scores => Rabl.render(t.scores, 'scores/view', :view_path => 'app/views', :format => 'hash')
    }.to_json
  end

  get :tee_times, :map => '/tee_times', :provides => :json do
    t = Tournament.last
    @tee_times = t.tee_times
    render 'tee_times/view'
  end

  get :scores, :map => '/scores/:tee_time_id', :provides => :json do
    @score = Score.find_all_by_tee_time_id params[:tee_time_id]
    render 'scores/view'
  end
end