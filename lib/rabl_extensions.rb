module Rabl
  class Engine
    def when_expanded(key, locals, &block)
      raise ArgumentError.new("No block given") unless block_given?

      return if locals[:__expansions].nil?
      return unless locals[:__expansions].include?(key)

      next_level_expansions = {}
      
      if locals[:__expansions].is_a?(Hash)
        next_level_expansions = locals[:__expansions][key]
      end

      yield({
        __expansions: next_level_expansions
      })
    end
  end
end
