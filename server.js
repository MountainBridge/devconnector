const express = require('express');
const connectDB = require('./config/db');

if (!process.env.JWT_SECRET) {
  throw new Error('JWT_SECRET is required. Set it in the environment before starting the server.');
}

const app = express();
connectDB();
const PORT = process.env.PORT || 5000;

app.use(express.json({ extended: false }));
app.get('/', (req, res) => res.send('API running'));
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/posts', require('./routes/api/posts'));

app.listen(PORT, () => console.log(`App started at ${PORT}`));
