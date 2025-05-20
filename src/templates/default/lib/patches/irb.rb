Patcha.on_load("Rails::Console::IRBConsole") do
  Rails::Console::IRBConsole.prepend(Module.new do
    def start
      ::JS::ExternalCommands.console
    end
  end)
end
