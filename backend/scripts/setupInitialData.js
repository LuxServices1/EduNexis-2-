require('dotenv').config();
const mongoose = require('mongoose');
const User = require('../models/User');
const connectDB = require('../config/db');

const initialUsers = [
  {
    firstName: 'Admin',
    lastName: 'User',
    email: 'admin@edunexis.com',
    password: 'Admin123!',
    role: 'admin',
    school: 'EduNexis Academy',
    subscription: 'premium'
  },
  {
    firstName: 'John',
    lastName: 'Doe',
    email: 'teacher@edunexis.com',
    password: 'Teacher123!',
    role: 'teacher',
    school: 'EduNexis Academy',
    department: 'Mathematics',
    subscription: 'premium'
  },
  {
    firstName: 'Jane',
    lastName: 'Smith',
    email: 'student@edunexis.com',
    password: 'Student123!',
    role: 'student',
    school: 'EduNexis Academy',
    grade: 10,
    subscription: 'basic'
  },
  // Test accounts
  {
    firstName: 'Test',
    lastName: 'Student1',
    email: 'test.student@edu.com',
    password: 'test',
    role: 'student',
    school: 'EduNexis Academy',
    grade: 11,
    subscription: 'premium'
  },
  {
    firstName: 'Test',
    lastName: 'Student2',
    email: 'test.student2@edunexis.com',
    password: 'Test123!',
    role: 'student',
    school: 'EduNexis Academy',
    grade: 12,
    subscription: 'free'
  },
  {
    firstName: 'Test',
    lastName: 'Teacher',
    email: 'test.teacher@edunexis.com',
    password: 'Test123!',
    role: 'teacher',
    school: 'EduNexis Academy',
    department: 'Science',
    subscription: 'premium'
  }
];

const setupInitialData = async () => {
  try {
    console.log('Connecting to database...');
    await connectDB();

    // Clear existing users
    console.log('Clearing existing users...');
    await User.deleteMany({});
    console.log('All existing users removed');

    // Create new users
    console.log('Creating new users...');
    for (const userData of initialUsers) {
      const user = await User.create(userData);
      console.log(`Created ${user.role}: ${user.email}`);
    }

    console.log('\nInitial data setup completed successfully!');
    console.log('\nTest Accounts:');
    console.log('--------------------------------------------------');
    initialUsers.forEach(user => {
      console.log(`${user.role.toUpperCase()}:`);
      console.log(`Email: ${user.email}`);
      console.log(`Password: ${user.password}`);
      console.log('--------------------------------------------------');
    });

    process.exit(0);
  } catch (error) {
    console.error('Error setting up initial data:', error);
    process.exit(1);
  }
};

setupInitialData();
