// Catches errors thrown anywhere in the app (including multer errors)
// and sends back a consistent JSON response instead of an HTML crash page
const errorHandler = (err, req, res, next) => {
  console.error(err.stack);

  const statusCode = res.statusCode && res.statusCode !== 200 ? res.statusCode : 500;

  res.status(statusCode).json({
    message: err.message || "Something went wrong on the server",
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
};

// Handles requests to routes that don't exist
const notFound = (req, res, next) => {
  res.status(404).json({ message: `Route not found: ${req.originalUrl}` });
};

module.exports = { errorHandler, notFound };
