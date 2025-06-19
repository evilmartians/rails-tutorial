# Create products that we should have created in the previous lessons
Product.create(name: "T-Shirt").destroy
Product.create(name: "Pants")

# For authentication
User.create!(
  email_address: "you@example.org",
  password: "s3cr3t",
  password_confirmation: "s3cr3t"
) unless User.where(email_address: "you@example.org").exists?
