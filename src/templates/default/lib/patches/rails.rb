Patcha.on_load("Rails::Generators::Actions") do
  Rails::Generators::Actions.prepend(Module.new do
    # Always run Rails commands inline (we cannot spawn new processes)
    def rails_command(command, options = {})
      super(command, options.merge(inline: true))
    end
  end)
end

# Automatically authenticate a user of first request if the corresponding file is present.
# This way, we can skip the authentication in the second part of the tutorial
Patcha.on_load("Authentication") do
  Authentication.prepend(Module.new do
    def find_session_by_cookie
      return super if $__pre_authenticated

      $__pre_authenticated = true

      session = super

      return session if session

      return unless Rails.root.join("tmp/authenticated-user.txt").exist?

      $_user_email = Rails.root.join("tmp/authenticated-user.txt").read.chomp

      user = User.find_by(email_address: $_user_email)
      return unless user

      start_new_session_for(user)
    end
  end)
end
