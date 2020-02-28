# Learning Cats

A small application to learn the difference between different cat breeds

![Guess some cats!](./learningcats.gif)

Given an image of a cat you can guess what breed it is from a choice of
three breeds. You will be told if you are correct or not and the
actual breed of the cat.

A new cat can be loaded at any time to have another go or if you just
don't particularly like that cat.

Find it [here](https://learning-cats.herokuapp.com)

## Prerequisites

- node.js
- yarn
- [theCatApi](https://thecatapi.com) API key

Once you have an API key save it in `client/.env`:
```
---- ./client/.env ----
REACT_APP_CAT_API_KEY=<your key here>

---- EXAMPLE ----
REACT_APP_CAT_API_KEY=abc12de-f34g-hi56j-akfhsdf7df73
```

## Installation

Install the necessary packages with
```
$ yarn setup
```

## Run tests

```
$ yarn test-client
...
$ yarn lint-client
...
```

Two tests are currently a little flakey...

## Run server

The application can be run in either development
or production mode.

### Development

This can be run just after installation with
```
$ yarn start-client
```
Then navigate to `localhost:3000`

### Production

The client must be built first before starting the main
server. Build it with
```
yarn build
```
Once this is done the server can be started with
```
yarn start
```
Then navigate to `localhost:5000`

## User Stories

```
As a user
So I can see a nice cat
I want to see a random cat picture when I load the page
```
```
As a user
So I can learn about cat breeds
I want the breed of cat to displayed with the photo
```
```
As a user
So I can test my knowledge
I want to try and guess the breed first from some options
```
```
As a user
So I can try another cat
I want a button to load a new cat
```
