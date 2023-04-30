# MERN

## Description

This is a MERN stack application.

## installation

Clone the repo and then `cd mern-backend` and `npm install` and `cd ../mern-frontend` and `npm install`

## copy .env.example to .env

`cp .env.example .env`

## Usage

`cd mern-backend` and `npm run dev` and `cd ../mern-frontend` and `npm start`

## Postman collection link for API testing (optional)

https://api.postman.com/collections/2693321-c39879bc-a270-4989-a6e1-36fd356a83f0?access_key=PMAT-01GZ9NVJ80W0TER5R80XHJN99P

## All API routes

## Backend routes

### using sequelize

- `/api/auth` - get auth routes
  ------`/login` - login user
  ------`/register` - register user

  ### using procedures

- `/api/records` - get records routes
  ------`/allRecords` - get all records
  ------`/get/:id` - get record by id
  ------`/createRecord` - add record
  ------`/update/:id` - update record
  ------`/delete/:id` - delete record

## Frontend routes

- `/` - login page
- `/signup` - register page
- `/home` - Home page

## License

MIT
