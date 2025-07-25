# Patch Rails app generator to use pglite as a database adapter
Wasmify::Patcha.on_load("Rails::AppBuilder") do
  Rails::AppBuilder.prepend(Module.new do
    def database_yml
      create_file "config/database.yml" do
        <<-YAML
default: &default
  adapter: pglite
  pool: <%= ENV.fetch("RAILS_MAX_THREADS") { 5 } %>
  timeout: 5000

development:
  <<: *default
  database: store_development

# Warning: The database defined as "test" will be erased and
# re-generated from your development database when you run "rake".
# Do not set this db to the same as development or production.
test:
  <<: *default
  database: store_test

production:
  primary:
    <<: *default
    # database: path/to/persistent/storage/production.sqlite3
  cache:
    <<: *default
    # database: path/to/persistent/storage/production_cache.sqlite3
    migrations_paths: db/cache_migrate
  queue:
    <<: *default
    # database: path/to/persistent/storage/production_queue.sqlite3
    migrations_paths: db/queue_migrate
  cable:
    <<: *default
    # database: path/to/persistent/storage/production_cable.sqlite3
    migrations_paths: db/cable_migrate
        YAML
      end
    end
  end)
end
