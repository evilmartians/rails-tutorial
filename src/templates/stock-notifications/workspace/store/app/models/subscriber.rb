class Subscriber < ApplicationRecord
  belongs_to :product
  generates_token_for :unsubscribe
end
