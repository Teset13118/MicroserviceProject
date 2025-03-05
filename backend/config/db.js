// config/db.js
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`);

  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1); // ปิดโปรแกรมถ้าเชื่อมต่อไม่ได้
  }
};

module.exports = connectDB;

