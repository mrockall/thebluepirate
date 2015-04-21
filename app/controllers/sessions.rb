BluePirate::App.controllers :sessions, conditions: { handle_json: true }  do

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

  # Try to login
  post '/', :provides => :json do
    error 400, {message: "Missing parameters"}.to_json unless params.has_key?(:feeling) && params.has_key?(:colour) && params.has_key?(:animal)

    identity = Identity.find_by_provider_and_uid('triple_option_string', "#{params[:feeling]} #{params[:colour]} #{params[:animal]}")
    error 400, {message: "Authentication failed"}.to_json if identity.nil?

    error 404, {message: "Not found"}.to_json unless identity.player.present?

    tee_time = TeeTime.where(tournament_id: Tournament.last.id, player_id: identity.player.id).first
    error 404, {message: "No tee time found"}.to_json unless tee_time.present?

    Authorization.current_user = tee_time
    authenticate(:teetime)    

    tee_time.to_json
  end
end
