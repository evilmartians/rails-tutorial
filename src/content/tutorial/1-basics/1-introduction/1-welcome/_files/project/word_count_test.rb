require "word_count"

class WordCountTest < Nanotest::Test
  def test_word_count
    assert_equal word_count("one two three"), 3
  end

  def test_empty_string
    assert_equal word_count(""), 0
  end

  # add more test cases yourself
end
