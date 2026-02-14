#!/bin/bash
# Database Migration Guide for Schema Update
# Run these commands if you have existing products in your database

# MongoDB Migration Steps

# Step 1: Backup your current database (recommended)
# mongodump --db your_db_name --out ./backup

# Step 2: Add missing fields to existing products
# db.products.updateMany(
#   {},
#   {
#     $set: {
#       description: "No description provided",
#       city: "Not specified",
#       imageUrl: "",
#       available: true,
#       maxDuration: 7,
#       reviews: []
#     }
#   }
# )

# Step 3: Migrate image field to imageUrl
# db.products.updateMany(
#   { image: { $exists: true } },
#   [
#     {
#       $set: {
#         imageUrl: {
#           $concat: [
#             "http://localhost:5000/uploads/",
#             "$image"
#           ]
#         }
#       }
#     }
#   ]
# )

# Step 4: Add missing fields to existing users
# db.users.updateMany(
#   {},
#   {
#     $set: {
#       firstName: "User",
#       lastName: "Profile",
#       profileDescription: "",
#       profileImage: "",
#       city: "Not specified",
#       averageRating: 0,
#       totalReviews: 0
#     }
#   }
# )

# How to run in MongoDB:

=== MONGODB COMPASS OR MONGO SHELL ===

# 1. Open MongoDB Compass or connect with mongo shell
# 2. Select your database
# 3. Run these commands in order:

# For Products collection:
db.products.updateMany(
  {},
  {
    $set: {
      description: "No description provided",
      city: "Not specified",
      available: true,
      maxDuration: 7,
      reviews: []
    }
  }
)

# Verify products were updated:
db.products.findOne()

# For Users collection:
db.users.updateMany(
  {},
  {
    $set: {
      firstName: "User",
      lastName: "Profile",
      profileDescription: "",
      city: "Not specified",
      averageRating: 0,
      totalReviews: 0
    }
  }
)

# Verify users were updated:
db.users.findOne()

=== IF STARTING FRESH ===

# No migration needed! Simply:
# 1. Delete existing database (optional)
# 2. Restart backend server
# 3. New products will use the new schema automatically

=== TROUBLESHOOTING ===

# If duplicate key error on email:
db.users.collection.dropIndex("email_1")
db.users.createIndex({ email: 1 }, { unique: true })

# If you need to remove all data and start fresh:
db.dropDatabase()
# Then restart your backend server

# To check current document structure:
db.products.find().limit(1)
db.users.find().limit(1)

# To add owner field to orphaned products:
# First get a valid user ID from your database
db.users.findOne() // Copy the _id

# Then update products:
db.products.updateMany(
  { owner: { $exists: false } },
  {
    $set: {
      owner: ObjectId("PASTE_USER_ID_HERE")
    }
  }
)
