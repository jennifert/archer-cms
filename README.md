# archer-cms
Fullstack MasterClass github

## Requirements:
Mongo 4.X or later
NodeJs v11.15.0 or Lower (https://stackoverflow.com/a/57804190)



## Steps:

- clone/download repo
- make sure you have foreman and nodemon installed globally.
- create a .env file in your dev machine, or create on your production server.
- run npm install
- update import.js to add your own user
- run: node -r dotenv/config import.js
- make sure you have a .env, and change vars to match your settings.
- Run by: ./start
- Once everything is set on your local, upload everything but node_modules and .env. Be sure to add the vars in your server config. On heroku, this should run automatically as it has foreman

##Sample .env file
MONGODB_SERVER=mongodb://localhost/archercms
PORT=8080
COOKIE_SERCRET=TYPE_YOUR_SECRET

## Notes:
Please note this app is a demo, and may not be production ready (low score on google page speed).

Also, it uses an older version (V3) of Gulp, unfortunately, upgrading breaks the process.
