const express = require('express');
const cors = require('cors');
const { dbconnection } = require('./src/database/config');

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT || 3000;
        this.paths = {
            auth: '/api/auth',
            inbox: '/api/email'
        }

        this.database();
        this.middlewares();
        this.routes();
    }

    async database() {
        await dbconnection();
    }

    middlewares() {
        this.app.use(cors());
        this.app.use(express.json());
    }

    routes() {
        this.app.use(this.paths.auth, require('./src/routes/auth'));
        this.app.use(this.paths.inbox, require('./src/routes/email'));
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Server running on port ${this.port}.`);
        })
    }
}

module.exports = Server;