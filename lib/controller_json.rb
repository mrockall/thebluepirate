module BluePirate
  module HandleJSON
    def handle_json(*args)
      condition do
        begin
          json_params = JSON.parse(request.body.read) if defined?(request)
          json_params.recursively_symbolize_keys!
        rescue JSON::ParserError => e
          json_params = {}
        end

        if defined?(params) && json_params.present?
          params.merge!(json_params)
        else
          params = json_params
        end
      end
    end
  end
end
