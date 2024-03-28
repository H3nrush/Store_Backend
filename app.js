const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const app = express();
require('dotenv').config()

// Middleware
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

// Routes
const commentsRouter = require('./routes/commentsRoutes');
const usersRouter = require('./routes/usersRoutes');
const likesRouter = require('./routes/likesRoutes');
const postRouter = require('./routes/postRoutes');
const tokensRouter = require('./routes/tokensRoutes');
const customerRouter = require('./routes/customerRoutes');
const offerRouter = require('./routes/offerRoutes');

// Mounting routes
app.use('/api/comments', commentsRouter);
app.use('/api/users', usersRouter);
app.use('/api/likes', likesRouter);
app.use('/api/post', postRouter);
app.use('/api/tokens', tokensRouter);
app.use('/api/customers', customerRouter);
app.use('/api/offers', offerRouter);

// Default route
app.get('/', (req, res) => {
  res.json({ message: 'Hello from the API!' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal Server Error' });
});

const port = process.env.PORT || 4040;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
