BluePirate::App.controllers :scores do
  
  put :'/:id' do
    @json = json_content
    score = Score.find_by_id @json['id']
    error 404 if score.nil?

    is_valid = score.update_attributes @json
    error 400, score.errors.to_json unless score.valid?
    { :points => score.points, :result => score.result }.to_json
  end

  post :multi, :provides => :json do
    @scores = json_content.map do |json|
      score = Score.includes(:hole, :tee_time).find_by_id(json['id'])
      score.update_attributes(json)
      Rabl.render(score, 'scores/view', :view_path => 'app/views', :format => 'hash')
    end

    @scores.to_json
  end
end