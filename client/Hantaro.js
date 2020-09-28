const { Client } = require('discord.js');
const { Config, Base, Constants, Functions: { Database, Register } } = require('../util/index');

module.exports = class Hantaro extends Client {
    constructor(options = {}) {
        super();

        this._config = Config;
        this._token = options.token;
        this._owner = options.owner || '';
        this._prefix = options.prefix;
        this._constants = Constants;

        this.register = new Register(this);
        this.database = new Database(this);
        this.base = new Base(this);
    }

    async login(token = this.options.token) {
        await this.register.registerEvents('listeners');
        return super.login(token);
    }

    get token() { return this._token };
    get owner() { return this._owner };
    get prefix() { return this._prefix };
    get constants() { return this._constants };
    get config() { return this._config };
};