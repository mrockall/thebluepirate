# BaseService class
#
# Should be extended by every service in the system.
# Adds common methods and helper objects that may be of use to
# the service.
#
# Ex.
#   class InitializeConference < BaseService
#   end
#
class BaseService

  private

  # Sudo wrapper
  def sudo! &block
    ExordoApp.sudo
    yield
    ExordoApp.unsudo
  end

  # Sudo wrapper
  def self.sudo! &block
    ExordoApp.sudo
    yield
    ExordoApp.unsudo
  end

  # Return the base success object
  def self.success(success_data = {})
    success_data.merge({
      error: false,
      status: :success
    })
  end

  # Return the base error object
  def self.error(message, code)
    {
      error: true,
      status: :error,
      message: message,
      code: code
    }
  end
end
