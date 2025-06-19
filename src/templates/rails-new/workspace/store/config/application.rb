require_relative "boot"

require "rails/all"

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

module Store
  class Application < Rails::Application
    # Initialize configuration defaults for originally generated Rails version.
    config.load_defaults 8.0

    # Please, add to the `ignore` list any other `lib` subdirectories that do
    # not contain `.rb` files, or that should not be reloaded or eager loaded.
    # Common ones are `templates`, `generators`, or `middleware`, for example.
    config.autoload_lib(ignore: %w[assets tasks])

    # Configuration for the application, engines, and railties goes here.
    #
    # These settings can be overridden in specific environments using the files
    # in config/environments, which are processed later.
    #
    # config.time_zone = "Central Time (US & Canada)"
    # config.eager_load_paths << Rails.root.join("extras")

    # Don't generate system test files.
    config.generators.system_tests = nil

    # TODO: Move this patch to wasmify-rails
    class FixupMiddleware
			def initialize(app) = @app = app

			def call(env)
				env["CONTENT_TYPE"] = env["HTTP_CONTENT_TYPE"]
				status, response_headers, body = *@app.call(env)

				if response_headers["Content-Type"]&.start_with?("image/")
					buffer = []
					body.each { buffer << _1 }
          body = [Base64.strict_encode64(buffer.join)]
        end

        [status, response_headers, body]
			end
		end

		config.middleware.insert_before Rack::Runtime, FixupMiddleware
  end
end
