import express, { Application } from 'express';
import dotenv from 'dotenv';
import sequelize from './database';
import accountRoutes from './routes/accountRoutes';
import firebaseAccountRoutes from './routes/firebaseAccountRoute';

// Load environment variables from .env file
dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());

// Routes
app.use('/api', accountRoutes);

// Firebase Route
app.use('/firebase',firebaseAccountRoutes);

// Test database connection and sync models
sequelize.authenticate()
  .then(() => {
    console.log('Database connected...');
    return sequelize.sync();
  })
  .then(() => {
    console.log('Database synchronized...');
    // Start the server
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error: any) => {
    console.error('Unable to connect to the database:', error);
  });
