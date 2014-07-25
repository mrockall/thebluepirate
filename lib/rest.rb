module Padrino
  module Rest
    module Helpers
      def rest(method, api, action, params={})
        require "rest_client"
        require "json"

        begin
          json = {:content_type => :json, :accept => :json}

          logger.info "#{method.upcase}: #{api}#{action}"
          logger.info "Params: #{params}"

          case method.to_sym
          when :get
              response = RestClient.get "#{api}#{action}", json.merge({:params => params})
          when :post
              response = RestClient.post "#{api}#{action}", params, json
          when :put
              response = RestClient.put "#{api}#{action}", params, json
          when :delete
              response = RestClient.delete "#{api}#{action}", json.merge({:params => params})
          else
              response = "Invalid rest method"
          end

          if (200..299) === response.code
            logger.info "Response: #{response}"
            return JSON.parse(response)
          else
            logger.error "Response: #{response}"
            return {:error => true, :response => response}
          end
        rescue => e
          logger.error e.message
          logger.error response.inspect
          logger.error e.backtrace.join("\n")
          return {:error => true, :response => response}
        end
      end
    end

    def self.registered(app)
      app.helpers Helpers
    end
  end
end
