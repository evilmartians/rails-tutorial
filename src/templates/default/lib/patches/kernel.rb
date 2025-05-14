module Kernel
  @@at_exit_hooks = []

  def at_exit(&block)
    @@at_exit_hooks << block
  end

  def execute_at_exit_hooks
    @@at_exit_hooks.reverse_each { _1.call }
  end
end
