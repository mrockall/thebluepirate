BluePirate::App.controllers :tournaments do
  get :'/', :provides => :json do
    @tournament = Tournament.includes(:tee_times).order('created_at DESC')
    render 'tournaments/one'
  end

  get :'/:id', :provides => :json do
    query = Tournament.includes(:tee_times)
    query = query.where(id: params[:id])
    @tournament = query.first
    error 404 unless @tournament.present?

    render 'tournaments/one'
  end
end
