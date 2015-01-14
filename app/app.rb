module BluePirate
  class App < Padrino::Application
    register CompassInitializer
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

    # Load OmniAuth
    use OmniAuth::Builder do
      provider :twitter,  '8t2RRALbWML9RhMAeBGSg', 'FMaVBc4E74DWEJqmKsm74WPJfyvlZkCpK7mxeZQ2w'
      provider :facebook, 1437118896504791, '77312d65e408231dfcede3e97cb35e0e'
    end

    ##
    # Routes
    ##
    
    before :except => [] do
      begin
        @authenticated = authenticated?
        @current_user = Authorization.current_user = user
      rescue => e
        session.clear
      end
    end

    get :bootstrap, :provides => :json do
      t = Tournament.last
      {
        :tournaments => Rabl.render(t, 'tournaments/view', :view_path => 'app/views', :format => 'hash'),
        :tee_times => Rabl.render(t.tee_times, 'tee_times/view', :view_path => 'app/views', :format => 'hash'),
        :courses => Rabl.render(t.course, 'courses/view', :view_path => 'app/views', :format => 'hash'),
        :holes => Rabl.render(t.course.holes, 'holes/view', :view_path => 'app/views', :format => 'hash'),
        :scores => Rabl.render(t.scores, 'scores/view', :view_path => 'app/views', :format => 'hash'),
        :players => Rabl.render(t.players, 'players/view', :view_path => 'app/views', :format => 'hash')
      }.to_json
    end
    
    get :index, :map => '/*page', :priority => :low do
      t = Tournament.last
      @tournaments = Rabl.render(t, 'tournaments/view', :view_path => 'app/views', :format => 'json')
      @tee_times = Rabl.render(t.tee_times, 'tee_times/view', :view_path => 'app/views', :format => 'json')
      @players = Rabl.render(t.players, 'players/view', :view_path => 'app/views', :format => 'json')
      @courses = Rabl.render(t.course, 'courses/view', :view_path => 'app/views', :format => 'json')
      @holes = Rabl.render(t.course.holes, 'holes/view', :view_path => 'app/views', :format => 'json')
      @scores = Rabl.render(t.scores, 'scores/view', :view_path => 'app/views', :format => 'json')
      render :index
    end
  end
end
