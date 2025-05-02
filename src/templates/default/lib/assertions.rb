def assert_equal(actual, expected, msg = nil)
  raise msg || "Expected #{expected.inspect}, but got #{actual.inspect}" unless expected == actual
end
