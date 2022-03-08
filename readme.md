# Prueba Antpack - Backend

Software bootstrapped with [npm](https://www.npmjs.com/) and [node](https://nodejs.org/en/), on the other hand, the BD schemas are bases on [JSONPlaceholder](https://jsonplaceholder.typicode.com/) api

Note: This app use environment variables to save the node port and mongo connection chain, you can find an `.env` sample file named `.env.sample` on the directory root, the [MongoDB](https://www.mongodb.com/) version used to test was `5.0` with [MongoAtlas](https://www.mongodb.com/atlas) and the [node](https://nodejs.org/en/) version was `16.14.0`.

## Project Structure

```
project_root
├───controllers
├───database
├───models
├───public
└───routes
```

## Used Libraries

- [Mongoose](https://github.com/Automattic/mongoose)
- [Cors](https://github.com/expressjs/cors)
- [Dotenv](https://github.com/motdotla/dotenv)
- [Express](https://github.com/expressjs/express)
- [Gravatar](https://github.com/emerleite/node-gravatar)

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app on the defined `.env` port\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `npm run dev`

Runs the app exactly as `npm start` command but using [nodemon](https://nodemon.io/) instead of [node](https://nodejs.org/en/).
