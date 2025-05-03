import initVM from "../server/ruby.js";

const vm = await initVM();

vm.eval(`
  begin
    Dir.glob("/project/**/*_test.rb").each { load _1 }

    puts "Nanotest run (#{RUBY_DESCRIPTION})...\n\n"
    Nanotest.autorun
  rescue SyntaxError, NameError => e
    puts "Error loading test file: #{e.message}"
  end
`)
