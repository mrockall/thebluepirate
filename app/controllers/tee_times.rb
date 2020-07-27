BluePirate::App.controllers :tee_times do
  get :'/:id', :provides => :json do
    query = TeeTime.includes(tournament: {course: [:holes]}, player: [], scores: [:hole])
    query = query.where(id: params[:id])
    @tee_time = query.first
    error 404 unless @tee_time.present?

    rabl 'tee_times/one'
  end
end
