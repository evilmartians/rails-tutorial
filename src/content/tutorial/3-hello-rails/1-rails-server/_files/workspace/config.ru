run ->(env) {
  puts "Hello, Rails!"

  [200, {"Content-Type" => "text/plain"}, ["Hello, Rails!"]]
}
