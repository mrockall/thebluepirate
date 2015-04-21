class Hash
  def except(*blacklist)
    self.reject {|key, value| blacklist.include?(key) }
  end

  def only(*whitelist)
    self.reject {|key, value| !whitelist.include?(key) }
  end
  
  def recursively_symbolize_keys!
    symbolize_keys!

    each do |key, value|
      if value.is_a?(Hash)
        value.recursively_symbolize_keys!
      elsif value.is_a?(Array)
        value.each do |v|
          v.recursively_symbolize_keys! if v.is_a?(Hash)
        end
      end
    end

    self
  end
end
