module.exports = {
    server: {
        PORT: process.env.PORT || 3000,
        SECRET_KEY: process.env.SECRET_KEY
    },
    mongodb: {
        CNN: process.env.MONGODB_CNN
    }
}