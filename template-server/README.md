# graphql-server

Keep up to date

## How to Use

Pre installation:

    nodejs
    yarn

Dependency:

    none

Tech Stacks:

    Apollo GraphQl
    express
    typescript
    morgan
    winston
    gulp
    jest

Install it and run on local development:

    yarn install
    yarn watch

Code quality:

    yarn lint
    yarn lint-es
    yarn test

Deploy on dev / staging / production with docker image:

    docker build -t graphql-server .

Run `dev`:

    docker run -e NODE_ENV='dev' --name graphql-server -p 4000:4000 -d internal-graphql-server

Run `staging`:

    docker run -e NODE_ENV='staging' --name graphql-server -p 4000:4000 -d internal-graphql-server

Run `production`:

    docker run -e NODE_ENV='production' --name graphql-server -p 4000:4000 -d internal-graphql-server

Access(`graphql` path disabled on production mode):

   http://localhost:4000/graphql
