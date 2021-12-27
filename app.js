const express = require('express');
const cors = require('cors');
const contactsRouter = require('./routes/contacts')

class App {
    constructor() {
      this.app = express();
      this.middlewares();
      this.routes();
    }
  
    middlewares() {
      this.app.use(express.json());
      this.app.use(cors());

    }
  
    
    routes() {
        this.app.use('/contacts', contactsRouter);
    }

}

module.exports = new App().app;