const mongoose = require('mongoose');
require('dotenv').config();

const Product = require('./models/Product');
const User = require('./models/User');

async function fixProducts() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Connected to MongoDB');

    // Get first user
    const user = await User.findOne();
    if (!user) {
      console.error('❌ No users found in database');
      process.exit(1);
    }

    console.log('👤 Using user:', user._id, user.email);

    // Find all products
    const allProducts = await Product.find();
    console.log('📦 Total products:', allProducts.length);

    // Fix products without owner
    let fixed = 0;
    for (let product of allProducts) {
      if (!product.owner) {
        product.owner = user._id;
        await product.save();
        console.log('✅ Fixed product:', product._id, product.title);
        fixed++;
      }
    }

    console.log('✅ Fixed products:', fixed);

    // Show final count
    const finalProducts = await Product.find().select('_id title owner');
    console.log('📊 Final product count:', finalProducts.length);
    finalProducts.forEach(p => {
      console.log('  ✓', p._id, '-', p.title, '(owner:', p.owner, ')');
    });

    await mongoose.disconnect();
    console.log('✅ Done!');
  } catch (err) {
    console.error('❌ Error:', err.message);
    process.exit(1);
  }
}

fixProducts();
