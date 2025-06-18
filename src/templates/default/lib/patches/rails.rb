Patcha.on_load("Rails::Generators::Actions") do
  Rails::Generators::Actions.prepend(Module.new do
    # Always run Rails commands inline (we cannot spawn new processes)
    def rails_command(command, options = {})
      super(command, options.merge(inline: true))
    end
  end)
end
