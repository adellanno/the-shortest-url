# The Shortest Url

The Shortest Url is a url shortening service built using Node.js, Typescript and the Express framework. The service takes a url and returns a shortened (encoded) url as a response. The service is also able to take a shortened (encoded) url and return the full url. 

Author: Anthony Dell'Anno

## How to Install and Run the Project

#### Docker: 
```bash
docker build . -t the-shortest-url
docker run -p 8000:8000 the-shortest-url
```
------

Without docker:

create a .env and copy .env.example into it
```bash
npm install
npm run build
npm start
```
--------------------------------------------------

To run tests:
```bash
npm install

# unit tests
npm run test:unit
# integration tests
npm run test:integration
# api tests
npm run test:api
# all tests
npm run test
```

## How to Use the Project
### POST /encode

Body: 
url - a string containing the url to shorten 

Example:
```bash
curl -X POST http://127.0.0.1:8000/encode -H "Content-Type: application/json" -d '{"url": "www.example.com/page/1/article/2"}'

# Response:
{
    "message":"Success.",
    "data": {
        "id":"0c647be",
        "url":"www.example.com/page/1/article/2",
        "shortUrl":"https://shorturl.com/0c647be"
    }
}
```
------------
### GET /decode

Query parameters:
encoded - a string containing a shortened url 

Example:
```bash
curl -X GET http://127.0.0.1:8000/decode?encodedUrl="https://shorturl.com/a80724f"

# Response:
{
    "message":"Success.",
    "data":{
        "id":"a80724f",
        "url":"www.example.com/page/1/article/2",
        "shortUrl":"https://shorturl.com/a80724f",
        "isActive":true,
        "isDeleted":false,
        "createdAt":1672856322
    }
}
```


## Step 4 – Approaches and Tradeoffs
### Approaches
Typescript - strict typing gives us confidence in our code and helps to reduce errors commonly found in plain javascript. Type definitions also help to make our code more readable and understandable to developers.  

Express - a reliable and well understood framework that is easy to develop and test a project on  

File structure - controllers, services, routes, utils and middleware are all separate. This allows all modules to be tested in isolation and enables them to be easily modified or extended  

Tests - there is a full suite of unit, integration and api tests which give us confidence in the application and automate any regression testing

Security - with any application security is paramount. All inputs are validated and sanitised to prevent any malicious attacks. Helmet middleware is used to set headers to provide some basic security. A rate limiting middleware has also been utilised to prevent any malicious user exhausting the systems resources.  

Database - although the assessment only called for state to be stored in memory I attempted to replicate a genuine database as much as possible. The queries have been abstracted into the store service and could easily be swaped out for a real database. The nodecache instance is exported as a singleton as if it were a true database connection

Application logic - logic needed to be in place to prevent any hash collisions which was done so using a recursive function. There also needed to be logic checking whether or not the user has added the protocol (http/https) to the short url and allowing for this if so.

### Tradeoffs

The solution for preventing hash collisions has the potential to be expensive and/or slow down the application if we end up making multiple calls to the database if there are multiple hash collisions. This can be mitigated by expiring all short urls after a specified period. 

Using AWS Lambda instead of express was considered but due to the small scale of this application express was chosen due to its speed in development and ease of testing locally

## Step 5 – Video Demonstration

https://drive.google.com/file/d/1Np5UDws7c7QdW6NjZ3tCszBuJtWdjjNB/preview
