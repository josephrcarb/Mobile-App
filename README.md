# eCommerce Mobile and Web Application

eBay and Amazon Hybrid (eBAmazon)

## Disclaimer

- This is an idea that is implemented, but is not for production. 
- You can not actually sell or buy items officially, but will be implemented. 
- No official algorithm that decides guaranteed sell price to users, but is random.

## Description

- A  web app based on a concept idea of combining eBay and Amazon ideas. Sell your used unwanted items at a guaranteed price to the app. App becomes owner of item after purchase and puts item on the marketplace.

- I am using MongoDB for product, user, and login authentication storing, implemented with Express.JS backend, and React.JS front end

- MERN, MongoDB, ExpressJS, ReactJS, Javascript, Expo

## Functionality
- Complete Register / Login system with password encryption. User information stored in MongoDB.
- User and Item API functionality to, GET and POST to the MongoDB database.
- Users can upload an image of an item with it's name, condition. Application generates a random price for input and asks if seller wants to complete transaction.
- Users can head over to buy page and view all items that have been sold to the application. Application sells all items in database for an increased price.
- Users can go to their profile page, to sell all the items they bought, sold, and how much total spent and earned.
- No logged in user can sell / buy, or access profile page.

## How to run it

```
USAGE

  expo start
  
  cd ./auth
  
  nodemon
```
Navigate to web browser on local host with port 19006.

  
  
