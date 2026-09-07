const express = require('express');
const mongoose = require('mongoose');
const connectDB = require('./config/db');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json({ extended: false }));

app.get('/', (req, res) => res.json({ service: 'devconnector-api', status: 'ok' }));
app.get('/health/live', (req, res) => res.status(200).json({ status: 'ok' }));
app.get('/health/ready', (req, res) => {
  const ready = mongoose.connection.readyState === 1;
  res.status(ready ? 200 : 503).json({ status: ready ? 'ready' : 'not_ready', mongodb: ready ? 'connected' : 'disconnected' });
});

app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/posts', require('./routes/api/posts'));

const start = async () => {
  try {
    await connectDB();
    const server = app.listen(PORT, () => console.log(`API listening on ${PORT}`));
    const shutdown = async (signal) => {
      console.log(`${signal} received; shutting down`);
      server.close(async () => { await mongoose.connection.close(); process.exit(0); });
    };
    process.on('SIGTERM', () => shutdown('SIGTERM'));
    process.on('SIGINT', () => shutdown('SIGINT'));
  } catch (err) {
    console.error(`Startup failed: ${err.message}`);
    process.exit(1);
  }
};

if (require.main === module) start();
module.exports = app;
