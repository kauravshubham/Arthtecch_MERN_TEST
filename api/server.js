const dotenv = require('dotenv');
const express = require('express');
const { ApolloServer } = require('apollo-server-express');

const mongoose = require('mongoose');

require('./src/utils/db');
const schema = require('./src/schema/index');

dotenv.config();

const app = express();

/**
 * Craete a appollo server
 */
const server = new ApolloServer({
    schema,
    cors: true,
    playground: process.env.NODE_ENV === 'development' ? true : false,
    introspection: true,
    tracing: true,
    path: '/',
});

/**
 * add a middleware to check mongoose is connected or not
 */
server.applyMiddleware({
    app,
    path: '/',
    cors: true,
    onHealthCheck: () =>
        new Promise((resolve, reject) => {
            if (mongoose.connection.readyState > 0) {
                resolve();
            } else {
                reject();
            }
        }),
});

app.listen({ port: process.env.PORT }, () => {
    console.log(`Server listening on port ${process.env.PORT}`);
});