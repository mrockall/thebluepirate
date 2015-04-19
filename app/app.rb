module BluePirate
  class App < Padrino::Application
    use ActiveRecord::ConnectionAdapters::ConnectionManagement
    register ScssInitializer
    register Padrino::Rendering
    register Padrino::Mailer
    register Padrino::Helpers
    register Padrino::Warden::Login
    register Authorization::Padrino

    set :css_asset_folder, 'css'
    set :js_asset_folder, 'js'

    set :haml, {:format => :html5}

    Rabl.configure do |config|
      config.include_json_root = false
      config.include_child_root = false
    end

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
      t = Tournament.includes(:players, :scores => [:hole, :player], :tee_times => [:scores]).last
      c = Course.includes(:holes).find_by_id(t.course_id)

      @tournaments = Rabl.render(t, 'tournaments/view', :view_path => 'app/views', :format => 'json')
      @tee_times = Rabl.render(t.tee_times, 'tee_times/view', :view_path => 'app/views', :format => 'json')
      @players = Rabl.render(t.players, 'players/view', :view_path => 'app/views', :format => 'json')
      @scores = Rabl.render(t.scores, 'scores/view', :view_path => 'app/views', :format => 'json')
      @courses = Rabl.render(c, 'courses/view', :view_path => 'app/views', :format => 'json')
      @holes = Rabl.render(c.holes, 'holes/view', :view_path => 'app/views', :format => 'json')
      
      @title = "Blue Pirate"
      render :index
    end
  end
end
