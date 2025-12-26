const express = require('express');
const dotenv = require('dotenv').config();
const cors = require('cors');
const connectDB = require('./config/db');
const port = process.env.PORT || 5000;
const authmiddleware = require('./middleware/authmiddleware');
connectDB();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url} ${Date.now()}`);
    next();
})

app.use('/api/answers', require('./routes/answerRoutes'));
app.use('/api/users', require('./routes/authRoutes'));
app.use('/api/communities', require('./routes/communityRoutes'));
app.use('/api/profiles', require('./routes/profileRoutes'));
app.use('/api/questions', require('./routes/questionRoutes'));



app.listen(port, () => console.log(`Server started on port ${port}`));
