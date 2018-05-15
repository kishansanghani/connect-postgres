module.exports = {
    development: {
        client: 'pg',
        //debug: true,
        connection: {
            host: '',       //Database Host
            user: '',       //Database Username 
            password: '',   //Database Password
            database: '',   //Database Name
            charset: ''     //Unicode Transform Format
        },
        pool: {
            min: 2,
            max: 2,
        },
        acquireConnectionTimeout: 1000000,
        migrations: {
            directory: __dirname + '/migrations'
        },
        seeds: {
            directory: __dirname + '/seeds/development'
        }
    },
    production: {
        client: 'pg',
        //debug: true,
        connection: process.env.DATABASE_URL,
        pool: {
            min: 2,
            max: 2,
        },
        acquireConnectionTimeout: 1000000,
        migrations: {
            directory: __dirname + '/migrations'
        },
        seeds: {
            directory: __dirname + '/seeds/production'
        }
    }
};