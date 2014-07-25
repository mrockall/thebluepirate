BluePirate::App.controllers :sessions do
  
  get :login, :map => 'login' do
    @title = "Login"
    render :login
  end

  get :logout, :map => 'logout' do
    logout
    redirect '/'
  end

  get :tee_time_auth, :map => '/auth/:slug', :provides => :json do
    teetime = TeeTime.find_by_login_slug params[:slug]
    redirect '/login' if teetime.nil?

    logout if authenticated?

    Authorization.current_user = teetime
    authenticate(:teetime)

    redirect '/'
  end

  get :auth, :map => '/auth/:provider/callback' do
    auth = request.env["omniauth.auth"]

    # Create an Identity with the 
    identity = Identity.find_by_provider_and_uid(auth["provider"], auth["uid"]) || 
               Identity.create_with_omniauth(auth)

    # Find or create the user associated with this identity.
    user = User.find_or_create_with_identity(identity, auth)

    Authorization.current_user = user
    authenticate(:omniauth)

    redirect '/'
  end

end
