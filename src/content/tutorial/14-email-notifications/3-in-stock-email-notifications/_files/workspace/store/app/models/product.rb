class Product < ApplicationRecord
  has_one_attached :featured_image
  has_rich_text :description
  has_many :subscribers, dependent: :destroy
  validates :name, presence: true
  validates :inventory_count, numericality: { greater_than_or_equal_to: 0 }
end