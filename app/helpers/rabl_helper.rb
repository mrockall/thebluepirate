BluePirate::App.helpers do
  def rabl(template)
    params[:__expansions] = parse_expansions_list(params[:expand])

    render(template, locals: params)
  end

  # protected: Parses an expansions list into a complete hash of expansions
  #
  # process_expansions_list('paper_authors.user,paper_authors.organisation,track')
  # => {
  #   :paper_authors => [:user, :organisation],
  #   :track => []
  # }
  def parse_expansions_list(expansions_list_string)
    return {} unless expansions_list_string.present?
    
    expansions = process_expansions_list(expansions_list_string)

    # Perform some final processing on the expansions list.
    # 1) Symbolize all the keys so we're consistent with the data
    #   and it'll fit better inside the system.
    #
    # 2) Find any keys that contain only empty subexpansions
    #   and replace them with arrays, as they're the final branch on the tree.
    #
    # Symbolizing at this point effectively symbolizes the entire data set,
    # since we'll be transforming it after this point. At this point we
    # only have hashes nested inside hashes.
    expansions.recursively_symbolize_keys!

    transform_empty_hashes_into_arrays_of_keys!(expansions)

    expansions
  end

  # protected: Process an entire expansions list as a String.
  # process_expansions_list('paper_authors.user,paper_authors.organisation,track')
  # # => {
  #   "paper_authors" => ["user", "organisation"],
  #   "track" => []
  # }
  def process_expansions_list(expansions_list_string)
    initial_expansions = split_and_group_expansions(expansions_list_string)

    initial_expansions.each do |expansion_name, subexpansions|
      modified_subexpansions = subexpansions.map do |subexpansion|
        # Recurse into each expansion so we can expand
        # everything down the chain.
        process_expansions_list(subexpansion)
      end

      # Combine all the hashes of the different subexpansions
      # into a single subexpansion containing them all.
      if modified_subexpansions.any?
        if modified_subexpansions.all? { |expansion| expansion.is_a?(Hash) }
          # Deep merge ensures that we're going to keep all sub-expansions
          # in place down the entire chain, while a merge would discard them.
          modified_subexpansions = modified_subexpansions.reduce(:deep_merge)
        end
      end

      initial_expansions[expansion_name] = modified_subexpansions
    end

    initial_expansions
  end

  # protected: Split up a list of expansions and group them
  # by expansion and subexpansion.
  #
  # split_and_group_expansions('paper_authors.user,paper_authors.organisation,track')
  #   # => {
  #     'paper_authors' => ['paper_authors.user', 'paper_authors.organisation'],
  #     'track'         => []
  #   }
  def split_and_group_expansions(expansions_list_string)
    expansions = expansions_list_string.split(',').map do |expansion|
      expansion_segments = expansion.split('.')

      # Reconstitute the segments as arrays of their first
      # part (the association to expand) and the remaining parts
      # (any expansions on those associations) in a similar syntax as the source data.
      [expansion_segments[0], expansion_segments[1..-1].join('.')]
    end

    split_and_grouped = expansions.group_by(&:first)
    split_and_grouped.each do |expansion, subexpansions|
      subexpansions.each do |subexpansion|
        # We don't want this data. It's only there as it was left over from
        # the grouping process. 
        subexpansion.delete(expansion)

        ## We don't want an empty subexpansion.
        ## An empty list is preferred, so we'll remove any of the empties.
        subexpansion.delete_if { |value| value == "" }
      end

      split_and_grouped[expansion] = subexpansions.flatten
    end

    split_and_grouped
  end

  # protected: Traverses a hash and transforms hashes
  # containing only empty keys into an array of those keys.
  #
  # transform_empty_hashes_into_arrays_of_keys!({
  #   :child => { :grandchild => [], :other_grandchild => []
  #   :other_child => { :grandchild => { :great_grandchild => {...} }}
  # })
  #
  # => { :child => [:grandchild, :other_grandchild], :other_child => {...}]}
  def transform_empty_hashes_into_arrays_of_keys!(hash)
    hash.each do |key, data|
      next unless data.is_a?(Hash)

      # Recurse into the next level so that we can get all of the data
      # along the chain.
      result = transform_empty_hashes_into_arrays_of_keys!(data)

      if data.values.all? { |value| value.is_a?(Array) && value.empty? }
        # If all of the result is empty hashes then it's the end
        # of the chain. In this case we just want to use an array of 
        # the keys, which is what's being expanded one up the chain.
        hash[key] = result.keys
      else
        hash[key] = result
      end
    end
  end
end