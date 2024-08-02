## Burrito Api

This is an early vevrsion of this api and it doesn't cover multiple edge cases.  Edge cases are intended to be handled by developers building a frontend.  

## Requirements
1. Node version >= 14
2. Npm version >= 9
3. Docker

## Installation:
1. `git clone https://github.com/nodeMevK/burritoapi.git`
2. run `npm install` in directory
    1. You should now be able to run `node app.js` to run the api


## Run tests
1. `npm test`
    just need to add a few more tests, 

## Run pogram (locally)
1. `node app.js` or `npm start`
2. go on browser to `localhost:3000/api/{something}` to see and call api


## Run program with Docker
1. run `docker build -t burritoapi:1.0 .` in terminal (in directory)
2. run `docker run -p 5000:3000 {image}` in terminal 
3. docker container will be running in `localhost:5000`
    4. example - `http://localhost:5000/api/burrito` will display menu 

## Api Endpoints
1. `GET api/burrito` - for menu
2. `GET api/orders` - to get a list of orders
3. `POST api/orders` - to submit an order
    1. order must contain queries `name, size and quant` to function properly
    2. query `options` is optional 
4. `GET api/orders/:id` - to get a specific order
    1. This endpoint is determined on user input and developer knowledge of the legnth of list
    2. If a user submits a order number that doesn't exist (out of bounds), they will simply be returned nothing
    3. List order starts at 0 ex. to get the 1st order, or order id 1, you must start at 0. 
        1. essentially `api/orders/{actualordernumber - 1}`

