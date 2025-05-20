# Set up Rack handler
ENV["RACK_HANDLER"] = "external"

# Rackup handler to launch the external web server
class WASIServer
  def self.run(app, **options)
    require "rack/wasi/incoming_handler"
    port = options[:Port]

    $incoming_handler = Rack::WASI::IncomingHandler.new(app)

    ::JS::ExternalCommands.server(port)
  end
end

Patcha.on_load("Rackup::Handler") do
  Rackup::Handler.register(:external, WASIServer)
end

Patcha.on_load("Rails::Server") do
  Rails::Server.prepend(Module.new do
    def initialize(options)
      # disable pid files
      options.delete(:pid)
      super
    end

    # Change the after_stop_callback logic
    def start(after_stop_callback = nil)
      Kernel.at_exit(&after_stop_callback) if after_stop_callback
      super()
    end
  end)
end
