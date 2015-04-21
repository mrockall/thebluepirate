class Identity < ActiveRecord::Base

  PROVIDERS = {
    :twitter => 'twitter',
    :facebook => 'facebook',
    :triple_option_str => 'triple_option_string',
    :identity => 'identity'
  }

  FEELINGS = [
    'Angry', 'Delighted', 'Excited', 'Scared', 'Motivated',
    'Surprised', 'Confused', 'Happy', 'Anxious', 'Encouraged'
  ]

  COLOURS = [
    'Blue', 'Red', 'Yellow', 'Green', 'Purple',
    'Pink', 'Brown', 'Black', 'Orange', 'Indigo'
  ]

  ANIMALS = [
    'Lion', 'Dog', 'Rhino', 'Horse', 'Snake',
    'Cat', 'Giraffe', 'Tiger', 'Pig', 'Duck'
  ]

  belongs_to :user
  belongs_to :player

  def is?(provider)
    self.provider == PROVIDERS[provider]
  end

  def self.create_with_omniauth(auth)
    create! do |account|
      account.provider = auth["provider"]
      account.uid      = auth["uid"]
    end
  end

  def self.find_or_create_triple_option_identity_for_player(player)
    identity = self.find_by_player_id_and_provider player.id, PROVIDERS[:triple_option_str]
    return identity if identity.present?
    
    begin
      triple_option = "#{FEELINGS.sample} #{COLOURS.sample} #{ANIMALS.sample}"
    end while self.exists?(uid: triple_option)

    create! do |account|
      account.provider = PROVIDERS[:triple_option_str]
      account.uid = triple_option
      account.player_id = player.id
    end
  end
end