const errorHandler = (err, req, res, next) => {
    console.error(err.stack); // Log the error stack trace for debugging

    // Determine error status and message
    const status = err.status || 500;
    const message = err.message || 'Internal Server Error';

    res.status(status).json({
        success: false,
        error: {
            message,
            ...(process.env.NODE_ENV === 'development' && { stack: err.stack }) // Include stack trace in development
        }
    });
};

export default errorHandler;
