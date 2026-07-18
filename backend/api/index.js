require("dotenv").config();
const app = require("../src/app");
const connectDB = require("../src/config/db");

// Serverless functions can be re-invoked on a "warm" instance that already
// has a DB connection open. We track that with a flag so we don't waste
// time (and connections) reconnecting to MongoDB on every single request.
let isConnected = false;

module.exports = async (req, res) => {
  if (!isConnected) {
    await connectDB();
    isConnected = true;
  }
  return app(req, res);
};
