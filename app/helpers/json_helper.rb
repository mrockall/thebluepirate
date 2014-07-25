BluePirate::App.helpers do
  def json_content
    JSON.parse(request.body.read)
    rescue JSON::ParserError => e
    {}
  end
end