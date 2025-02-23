const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    trim: true
  },
  lastName: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['student', 'teacher', 'admin'],
    default: 'student'
  },
  school: {
    type: String,
    required: true,
    trim: true
  },
  grade: {
    type: Number,
    required: function() { return this.role === 'student'; },
    min: 1,
    max: 12
  },
  department: {
    type: String,
    required: function() { return this.role === 'teacher'; }
  },
  subscription: {
    type: String,
    enum: ['free', 'basic', 'premium'],
    default: 'free'
  },
  canvasIntegration: {
    isConnected: {
      type: Boolean,
      default: false
    },
    apiKey: {
      type: String,
      select: false // For security, API key won't be returned in queries by default
    },
    institutionUrl: {
      type: String,
      trim: true
    },
    lastSync: {
      type: Date
    }
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Method to compare password
userSchema.methods.comparePassword = async function(candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

// Method to check if user is admin
userSchema.methods.isAdmin = function() {
  return this.role === 'admin';
};

// Method to check if user is teacher
userSchema.methods.isTeacher = function() {
  return this.role === 'teacher';
};

const User = mongoose.model('User', userSchema);
module.exports = User;
