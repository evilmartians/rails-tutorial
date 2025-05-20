module JS
  module ExternalCommands
    class << self
      attr_reader :command

      def server(port)
        raise ArgumentError, "Command already defined: #{command}" if command

        ::JS.global[:externalCommands].server(port)
        @command = __method__
      end

      def any? = !!command
    end
  end
end
