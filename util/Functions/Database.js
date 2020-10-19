const mongoose = require('mongoose');
module.exports = class MongoDB {
    constructor(client) {
        this.client = client;
        this._connected = false;
        this._promise = null;

        this.connect(require('../Assets/Config').mongoDB.url);
        mongoose.set('useFindAndModify', false);
        mongoose.Promise = global.Promise;
    }

    connect(login = '') {
        mongoose.connect(login, { 
            useNewUrlParser: true, 
            useUnifiedTopology: true,
            autoIndex: false,
            reconnectTries: Number.MAX_VALUE,
            reconnectInterval: 500,
            poolSize: 5,
            connectTimeoutMS: 10000,
            family: 4
        }, (err) => {
            if (err) return console.log(`[MongoDB] Falha ao conectar!\n${err}`);
            console.log(`[MongoDB] Conectado com sucesso!`);
            this.connected = true;
        });
    }

    get connected() { return this._connected };
    set connected(value) { this._connected = value };
};