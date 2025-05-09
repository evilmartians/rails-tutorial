# Put all the code required to initialize the Rails Wasm environment

# Common Rails shims
require "wasmify/rails/shim"

# Patch Bundler.require to only require precompiled deps
# (We don't want to deal with group: :wasm here)
def Bundler.require(*groups)
  %w[
    rails
    wasmify-rails
    propshaft
    importmap-rails
    turbo-rails
    stimulus-rails
    jbuilder
    bcrypt
    solid_cache
    solid_queue
    solid_cable
    image_processing
    tzinfo/data
  ].each do |gem_name|
    Kernel.require gem_name
  end
end
