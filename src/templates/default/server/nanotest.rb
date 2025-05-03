module Nanotest
  class << self
    def autorun
      total = runnables.sum(&:run)
      if total > 0
        puts "Total tests run: #{total}"
      else
        puts "No tests found"
      end
    end

    def runnables = @runnables ||= []
  end

  class Test
    class << self
      def inherited(klass)
        Nanotest.runnables << klass
      end

      def run
        instance = new

        count = 0
        instance.public_methods.each do |method|
          next unless method.start_with?("test_")

          count += 1
          print "#{method}: "
          begin
            instance.send(method)
            puts " ✅"
          rescue => e
            puts " 💥"
            puts "  ↳ #{e.message}"
          end
          puts "\n"
        end

        count
      end
    end

    private

    def assert_equal(actual, expected, msg = nil)
      raise msg || "Expected #{expected.inspect}, but got #{actual.inspect}" unless expected == actual
    end
  end
end
