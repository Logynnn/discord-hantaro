const { connect, model, Types } = require('mongoose');
const { readdirSync } = require('fs');
module.exports = class MongoDB {
    constructor(client) {
        this.client = client;
        this._connected = false;

        this.loadSchemas();
        this.connect(require('../Assets/Config').mongoDB.url);
    }

    connect(login = '') {
        connect(login, { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
            if (err) return console.log(`[MongoDB] Falha ao conectar!\n${err}`);
            console.log(`[MongoDB] Conectado com sucesso!`);
            this.connected = true;
        });
    }

    loadSchemas() {
        const files = readdirSync('./util/Schemas/').map(file => file.split('.')[0]);
        for(var i = 0, length = files.length; i < length; i++) {
            const file = files[i];
            const schema = model(file, require(`../Schemas/${file}.js`));
            this[file] = schema;
        }
    }

    async findOrCreate(collection = '', finder = {}, options = {}) {
        if(finder === {} || collection === '') return {};

        const check = await this[collection].findOne(finder);
        if(check) return check;

        const _id = options._findOrCreateid || finder._id || Types.ObjectId();
        const toCreate = Object.assign(options, {_id});

        const document = new this[collection](toCreate);
        document.save();

        return document;
    }

    get connected() { return this._connected };
    set connected(value) { this._connected = value };
};