require('dotenv').config();
const mongoose = require('mongoose');
const User = require('../models/User');
const connectDB = require('../config/db');

const createInitialAccounts = async () => {
  try {
    await connectDB();

    const accounts = [
      {
        firstName: 'Admin',
        lastName: 'User',
        email: 'admin@edunexis.com',
        password: 'adminPass123!',
        role: 'admin',
        school: 'EduNexis Academy',
        grade: 12
      },
      {
        firstName: 'Teacher',
        lastName: 'Demo',
        email: 'teacher@edunexis.com',
        password: 'teacherPass123!',
        role: 'teacher',
        school: 'EduNexis Academy',
        department: 'Mathematics'
      },
      {
        firstName: 'Student',
        lastName: 'Demo',
        email: 'student@edunexis.com',
        password: 'studentPass123!',
        role: 'student',
        school: 'EduNexis Academy',
        grade: 10
      }
    ];

    for (const account of accounts) {
      const existingUser = await User.findOne({ email: account.email });
      if (!existingUser) {
        await User.create(account);
        console.log(`Created ${account.role} account:`, account.email);
      }
    }

    console.log('Initial accounts setup completed');
    process.exit(0);
  } catch (error) {
    console.error('Error creating initial accounts:', error);
    process.exit(1);
  }
};

createInitialAccounts();
