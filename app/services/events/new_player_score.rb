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

      # Find any existing event for this score?
      
      # If found, then we need to update that.

      # Otherwise, we need to create a brand new one.
      
    end
  end
end
