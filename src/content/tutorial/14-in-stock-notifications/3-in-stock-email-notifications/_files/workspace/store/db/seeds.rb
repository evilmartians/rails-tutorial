# Create products that we should have created in the previous lessons
Product.create!(name: "T-Shirt", inventory_count: 2).destroy
Product.create!(name: "Pants", inventory_count: 22)

# For authentication
User.create!(
  email_address: "you@example.org",
  password: "s3cr3t",
  password_confirmation: "s3cr3t"
) unless User.where(email_address: "you@example.org").exists?

# Create a new product with description and logo attached
logo = File.open(Rails.root.join("app/assets/images/logo.png"))

product = Product.create!(name: "Rails Tutorial", featured_image: logo, inventory_count: 13)
product.description = "<h2>Rails Tutorial Shirt</h2><p>A high-quality shirt featuring the <strong>official Rails logo</strong>.</p><ul><li>100% cotton</li><li>Available in multiple sizes</li><li>Machine washable</li></ul>"
product.save!
