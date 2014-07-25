module Padrino
  module Warden
    module Login
      def self.registered(app)
        app.register Padrino::Warden

        # ------------------------------------
        #              OMNIAUTH
        # ------------------------------------
        ::Warden::Strategies.add(:omniauth) do
          def valid?
            Authorization.current_user.present?
          end

          def authenticate!
            success! Authorization.current_user
          end
        end

        # ------------------------------------
        #              TEETIME
        # ------------------------------------
        ::Warden::Strategies.add(:teetime) do
          def valid?
            Authorization.current_user.present?
          end

          def authenticate!
            success! Authorization.current_user
          end
        end

        app.use ::Warden::Manager do |manager|
          manager.serialize_into_session {|obj| [obj.class.name, obj.id] }
          manager.serialize_from_session {|details|
            case details[0]
            when 'User'
              obj = User.find(details[1])
            when 'TeeTime'
              obj = TeeTime.find(details[1])
            end
            obj
          }
        end
      end
    end
  end
end
