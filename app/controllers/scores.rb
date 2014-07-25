BluePirate::App.controllers :scores do
  
  put :'/:id' do
    @json = json_content
    score = Score.find_by_id @json['id']
    error 404 if score.nil?

    is_valid = score.update_attributes @json
    error 400, score.errors.to_json unless score.valid?
    score.to_json
  end

end