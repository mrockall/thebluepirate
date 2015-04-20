# Defines our constants
RACK_ENV = ENV['RACK_ENV'] ||= 'development'  unless defined?(RACK_ENV)
PADRINO_ROOT = File.expand_path('../..', __FILE__) unless defined?(PADRINO_ROOT)

# Load our dependencies
require 'rubygems' unless defined?(Gem)
require 'bundler/setup'
Bundler.require(:default, RACK_ENV)

##
# Add your before (RE)load hooks here
#
Padrino.before_load do
  ActiveRecord::Base.include_root_in_json = false
  
  Padrino.set_load_paths(Padrino.root('app', 'services'))
  Padrino.dependency_paths << Padrino.root('app', 'services', '**/**.rb')
end

##
# Add your after (RE)load hooks here
#
Padrino.after_load do
end

Padrino.load!
