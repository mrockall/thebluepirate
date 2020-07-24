class User < ActiveRecord::Base
  acts_as_paranoid

  has_many :players, :dependent => :destroy  
  has_many :identities, :dependent => :destroy  

  def self.find_or_create_with_identity(identity, auth)
    return identity.user if identity.user.present?

    user = create! do |account|
      
      if identity.is? :twitter
        account.name  = auth["info"]["name"]
        account.email = auth["info"]["email"]
        account.image_url = auth["info"]["image"]

      elsif identity.is? :facebook
        account.name  = auth["info"]["name"]
        account.email = auth["info"]["email"]
        account.image_url = auth["info"]["image"]
      end
    end

    identity.user = user
    identity.save
    user
  end
end
