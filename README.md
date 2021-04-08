# ShareDb Example

Very basic example using a ShareDb instance with a React frontend.

## Configure MongoBb 

https://medium.com/swlh/get-up-and-running-with-mongodb-in-under-5-minutes-abc8770b1ef8

* Make sure you know the port it is running on. Default is 27017

## Congifure environment variables

Both the express server and the client use .env files. There are examples of these in .env.example files for both. Copy and update as approporate. The EXPRESS_PORT and REACT_APP_EXPRESS_PORT must be the same.

* cp .env.example .env


## Install node modules

* npm install
* cd client
* npm install

## To run in "production"

* From the root of the repo run `npm start`

## To run in development

To do this we run a webpack dev server to host the React frontend files.

* npm run start-server
* npm run start-client

You will need two servers



## TODO

### Version Control

* https://share.github.io/sharedb/document-history
* Milestones - https://share.github.io/sharedb/adapters/milestone
 

### JSON0 Operational Transforms

https://github.com/ottypes/json0 


This example might also be useful - https://github.com/share/sharedb/tree/master/examples/rich-text
