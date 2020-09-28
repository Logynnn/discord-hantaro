const Client = require('./Hantaro');
const Hantaro = new Client({
    owner: '406577370498334721',
    prefix: require('../util/Assets/Config').prefix
});

Hantaro.login(require('../private').token);