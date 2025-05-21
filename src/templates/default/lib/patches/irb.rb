Patcha.on_load("Rails::Console::IRBConsole") do
  Rails::Console::IRBConsole.prepend(Module.new do
    def start
      # Disable default IRB behaviour but keep the configuration around
      IRB::Irb.prepend(Module.new { def run(*); end })
      super
      ::JS::ExternalCommands.console
    end
  end)
end
