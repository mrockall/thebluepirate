BluePirate::App.controllers :tournaments do
  get :'/', :provides => :json do
    query = Tournament.includes(course: [], tee_times: [:player])
    query = query.order('created_at DESC')
    @tournament = query.all

    render 'tournaments/one'
  end

  get :'/:id', :provides => :json do
    query = Tournament.includes(course: [], tee_times: [:player])
    query = query.where(id: params[:id])
    
    @tournament = query.first
    error 404 unless @tournament.present?

    render 'tournaments/one'
  end
end
