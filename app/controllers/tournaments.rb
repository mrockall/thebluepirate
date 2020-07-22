BluePirate::App.controllers :tournaments do
  get :'/', :provides => :json do
    @tournament = Tournament.includes(:tee_times).order('created_at DESC')
    render 'tournaments/one'
  end
end
