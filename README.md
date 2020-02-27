# Learning Cats

A small application to learn the difference between different cat breeds

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

## Run server

```
$ yarn start
```

Then navigate to `localhost:3000`

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
