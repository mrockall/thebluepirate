class Identity < ActiveRecord::Base

  PROVIDERS = {
    :twitter => 'twitter',
    :facebook => 'facebook',
    :identity => 'identity'
  }

  belongs_to :user

  def is?(provider)
    self.provider == PROVIDERS[provider]
  end

  def self.create_with_omniauth(auth)
    create! do |account|
      account.provider = auth["provider"]
      account.uid      = auth["uid"]
    end
  end
end