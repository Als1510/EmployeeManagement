const mongoose = require('mongoose')
const config = require('config');
const { application } = require('express');
require('dotenv').config()

const connectDB = async () => {
  try{
    await mongoose.connect(process.env.mongoURI);
    console.log('MongoDB Connected...');
  } catch(error) {
    console.error(error.message);
    process.exit();
  }
}

module.exports = connectDB;