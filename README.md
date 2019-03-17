# franklin

This project uses nodejs and is built using version v8.15.0

# Start the app
Install Nodejs and Yarn for your platform/OS
- Clone this repo using git
- `cd` to the project directory
- Execute `yarn install`
- Execute `yarn start`
- Open `http://localhost:3000/documentation` to view the docs and also test the exposed REST endpoints

# Standards
[Standard.js](https://standardjs.com/) provides the linting, style & formatting standard for this project.

# Technology Stack
## Backend
- REST API (backend) is powered by [Fastify](https://www.fastify.io/) module in Nodejs
- The api documentation is constructed and exposed using [Swagger](https://swagger.io/)
- The database is sqlite and the client used is [better-sqlite3](https://github.com/JoshuaWise/better-sqlite3)
- BDD tests are written using [Mocha](https://mochajs.org/)
- Code coverage is powered by [nyc](https://github.com/istanbuljs/nyc)
## Frontend
- Due to time constraints, a minimal front-end is created using [React.js](https://reactjs.org) and is available at [http://localhost:3000/](http://localhost:3000/)
- [Bootstrap](https://getbootstrap.com/) is used as the front-end library



# Stack Details
- Nodejs event driven model allows asynchronous IO, which is perfect for powering REST APIs (non computative workload).
- Fastify is faster than expressjs & hence, it's used in this project.
- Swagger makes sure the API adheres to a contract and exposes API documentation concisely.

# Assumptions
- An order may contain 0 items
