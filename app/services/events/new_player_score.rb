# NewPlayerScore class
# 
# This event is triggered whenever a score is entered.
# 
module Events
  class NewPlayerScore < BaseService

    def initialize score
      @score = score
    end

    def execute

      message = ""
      
    end
  end
end
