# Put all the code required to initialize the Rails Wasm environment

# Bigdecimal doesn't work in Ruby 3.4
$LOADED_FEATURES << $LOAD_PATH.resolve_feature_path("bigdecimal")[1]

# Common Rails shims
require "wasmify/rails/shim"
