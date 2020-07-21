module BluePirate
  class App < Padrino::Application
    use ActiveRecord::ConnectionAdapters::ConnectionManagement
    register ScssInitializer
    register Padrino::Rendering
    register Padrino::Mailer
    register Padrino::Helpers
    register Padrino::Warden::Login
    register Authorization::Padrino
    register BluePirate::HandleJSON

    CONFIG = YAML.load(File.read(File.join(PADRINO_ROOT, 'config', 'blue_pirate.yml')))

    set :css_asset_folder, 'css'
    set :js_asset_folder, 'js'

    set :haml, {:format => :html5}

    Rabl.configure do |config|
      config.include_json_root = false
      config.include_child_root = false
    end

    set :delivery_method, :smtp => { 
      :address              => "smtp.mandrillapp.com",
      :port                 => 587,
      :user_name            => 'mrockall@gmail.com',
      :password             => CONFIG['emails']['api_key'],
      :authentication       => :plain,
      :enable_starttls_auto => true  
    }

    # Disable Omniauth for now. 
    # Going to go with a different login strategy..
    # 
    # use OmniAuth::Builder do
    #   provider :twitter,  '8t2RRALbWML9RhMAeBGSg', 'FMaVBc4E74DWEJqmKsm74WPJfyvlZkCpK7mxeZQ2w'
    #   provider :facebook, 1437118896504791, '77312d65e408231dfcede3e97cb35e0e'
    # end

    ##
    # Routes
    ##
    
    before :except => [] do
      begin
        @current_user = Authorization.current_user = user
      rescue => e
        session.clear
      end
    end

    get :favicon, :map => '/favicon.ico' do
    end
    
    get :index, :map => '/*page', :priority => :low do
      @title = "Blue Pirate"
      render :index
    end
  end
end
