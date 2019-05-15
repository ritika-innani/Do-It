var crypto = require('crypto').randomBytes(256).toString('hex');


module.exports = {
    dbConfig: {
        url: 'mongodb://localhost:27017/task_management',
        secret: crypto,
        database: 'task_management',
        secretKey: '123456'
    },
    
    port: 8000,
    
    cors: {
        origin: 'http://localhost:4200'
    }
}

