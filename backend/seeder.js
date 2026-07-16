const mongoose = require('mongoose');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const User = require('./models/User');
const bcrypt = require('bcryptjs');

// Load env vars
dotenv.config();

// Connect to DB
connectDB();

const seedAdmin = async () => {
  try {
    const adminEmail = 'admin-haldummulla@gmail.com';
    const adminPassword = 'admin@1234'; // In real app, don't hardcode plain text passwords here if committing

    // Check if admin already exists
    const existingAdmin = await User.findOne({ email: adminEmail });
    if (existingAdmin) {
      console.log('Admin user already exists!');
      process.exit();
    }

    // Create the admin user
    // The pre('save') hook in the User model will automatically hash this password
    const adminUser = await User.create({
      name: 'Haldummulla Admin',
      email: adminEmail,
      password: adminPassword,
      role: 'admin',
    });

    console.log(`Admin user seeded successfully with ID: ${adminUser._id}`);
    process.exit();
  } catch (error) {
    console.error(`Error seeding admin: ${error.message}`);
    process.exit(1);
  }
};

seedAdmin();
