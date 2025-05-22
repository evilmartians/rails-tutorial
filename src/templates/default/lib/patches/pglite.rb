Patcha.on_load("ActiveRecord::ConnectionAdapters::PGliteAdapter") do
  ActiveRecord::ConnectionAdapters::PGliteAdapter::ExternalInterface.prepend(Module.new do
    def initialize(config)
      # Set up the database in JS and get the idenfier back
      config[:js_interface] = JS.global[:pglite].create_interface(config[:database]).await.to_s
      super(config)
    end

    def finished? = true
  end)
end

Patcha.on_load("ActiveRecord::Tasks::DatabaseTasks") do
  module ActiveRecord
    module Tasks # :nodoc:
      class PGliteDatabaseTasks # :nodoc:
        def self.using_database_configurations?
          true
        end

        attr_reader :db_config, :configuration_hash

        def initialize(db_config)
          @db_config = db_config
          @configuration_hash = db_config.configuration_hash
        end

        def create(connection_already_established = false)
          JS.global[:pglite].create_interface(db_config.database).await
        end

        def purge(...)
          # skip for now
        end
      end
    end
  end

  ActiveRecord::Tasks::DatabaseTasks.register_task(/pglite/, "ActiveRecord::Tasks::PGliteDatabaseTasks")
end
