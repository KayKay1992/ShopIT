const notFound = (req, res, next) => {
    const error = new Error(`Not Found: ${req.originalUrl}`);
    res.status(404);
    next(error);
}

const errorHandler = (err, req, res, next) => {
    let statusCode = err.statusCode === 200 ? 500 : res.statusCode;
    let message = err.message
    
    //Check for mongoose bad ObjectId
    if(err.name === 'CastError' && err.kind === 'ObjectId'){
        message = 'Invalid product ID'
        statusCode = 404
    }
    res.status(statusCode).json({ message,
        stack: process.env.NODE_ENV === 'production' ? '' : err.stack  // only show stack in development mode
    })
}

export { notFound, errorHandler }