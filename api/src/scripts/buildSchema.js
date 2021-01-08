import fs from 'fs-extra';
import { graphql } from 'graphql';
import { introspectionQuery, printSchema } from 'graphql/utilities';

import Schema from '../schema';

/**
 * @function buildSchema
 * Makes a fuction for combine the schemas
 */
async function buildSchema() {

    fs.writeFileSync(
        JSON.stringify(await graphql(Schema, introspectionQuery), null, 2)
    );
    fs.writeFileSync(
        printSchema(Schema)
    );
}

async function run() {
    await buildSchema();
    console.log('Schema build complete!');
}

run().catch(e => {
    console.log(e);
    process.exit(0);
});