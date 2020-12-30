# GraphQL Backend

## Installation 
Requirements:
The environment variables are stored in two files: one for development `dev.env`
and one for testing `test.env`.

For the next steps you need to create the `dev.env` file in the root folder of the backend `backend/dev.env`.
Keep in mind to avoid committing the `dev.env` file because it contains sensitive information of your database and authentication services.
The following steps describe the configuration of the environment variables that you need
for the backend services.

#### Neo4j
Next you need to setup a Neo4j database.
In order to connect the backend with the database you need to
set the environment variables inside the given files.
These are named as follows:
```
NEO4J_URI
```
Defines the database URI in this case via the bolt protocol.
```
NEO4J_USER
```
Your database user. The default value is `neo4j`.
```
NEO4J_PASSWORD
```
Your database password.
```
NEO4J_DATABASE
```
The name of the database.
If left empty it uses the default database based on your Neo4j config file.

#### JWT
A Json Web Token is used for the authentication.
Thats why you also need to setup a JWT token that
is stored on your server and is used to encrypt the JWT.
```
TOKEN_SECRET
```
The token secret is critical to the authentication so keep in mind
to choose a sufficiently random and long passphrase.

#### Example
This is an example for an environment file: 
```
TOKEN_SECRET=ALongAndSecurePassphrase
NEO4J_URI=bolt://localhost:7687
NEO4J_USER=neo4j
NEO4J_PASSWORD=YourDatabasePassword
NEO4J_DATABASE=neo4jdb
```

## Run Linter and Test
Before committing run the linter over your source files with:
```
$ npm run lint
```
To run the unit-tests execute the following command:
```
$ npm run test
```

## Run Backend
The backend can be run via
```
$ npm run dev
```
but you need to start the Neo4j database service first.

## Why Neo4j?
We wanted to broaden our horizon by using a graph database because we
only used RDBM systems.
Also the Neo4j `cypher` language looked interesting compared to regular SQL.
And we wanted to support local businesses in these dark times.
