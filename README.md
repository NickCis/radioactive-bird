# Radioactive Bird

A Tiny App that, based on a given keyword parameter, lists the Tweets related to it (Razzle+React+Redux).

A [Razzle ♥](https://github.com/jaredpalmer/razzle) based project.


Packages / Libraries used:

* [Razzle](https://github.com/jaredpalmer/razzle): [MIT License](https://github.com/jaredpalmer/razzle/blob/master/LICENSE)
* [ReactJS](https://github.com/facebook/react): [BSD License](https://github.com/facebook/react/blob/master/LICENSE)
* [Redux](https://github.com/reactjs/redux): [MIT License](https://github.com/reactjs/redux/blob/master/LICENSE.md)
* [Material UI](https://github.com/callemall/material-ui): [MIT License](https://github.com/callemall/material-ui/blob/v1-beta/LICENSE)
* [ExpressJS](https://github.com/expressjs/express): [MIT License](https://github.com/expressjs/express/blob/master/LICENSE)
* [Serialize Javascript](https://github.com/yahoo/serialize-javascript): [BSD 3-Clause License](https://github.com/yahoo/serialize-javascript/blob/master/LICENSE)
* [Jest](https://github.com/facebook/jest): [BSD 3-Clause License](https://github.com/facebook/jest/blob/master/LICENSE)
* [Prettier](https://github.com/prettier/prettier): [MIT License](https://github.com/prettier/prettier/blob/master/LICENSE)
* [EsLint](https://github.com/eslint/eslint): [MIT License](https://github.com/eslint/eslint/blob/master/LICENSE)
* [Enzyme](https://github.com/airbnb/enzyme): [MIT Lincense](https://github.com/airbnb/enzyme/blob/master/LICENSE.md)

## How to use

Install it and run:

```bash
yarn install
yarn start
```

Run Linters:

```bash
# First Prettier :)
yarn run format
yarn run lint
```

### Configuration

Environment variables:

* `RAZZLE_CONSUMER_KEY`: Twitter consumer Key
* `RAZZLE_CONSUMER_SECRET`: Twitter Consumer secret

Razzle uses _Dotenv_ configuration, the easyest way is to create a `.env` file on the root directory:

```bash
cat .env
RAZZLE_CONSUMER_KEY=XXXXXXX
RAZZLE_CONSUMER_SECRET=XXXXXX
```

**Note:** Razzle uses webpack to inyect the environment variables values into the source code, this _isn't the best idea_ but for the scope of this example works correctly.
