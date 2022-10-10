const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
const app = express();
require('dotenv').config()

app.use(express.json({extended: false}));

const corsOptions = {
  origin: ["http://localhost:3000", "https://employee-management1.netlify.app"]
}

app.use(cors(corsOptions))
connectDB();

app.get('/', (req, res)=> {
  res.send('API running')
})

app.use('/api/users', require('./routes/api/users'));

const PORT = process.env.PORT || 5000; 

app.listen(PORT, ()=> console.log(`Server running on port ${PORT}`))
