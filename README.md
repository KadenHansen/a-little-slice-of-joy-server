# A Little Slice of Joy Server
This is the server connection for [A Little Slice of Joy](https://github.com/KadenHansen/a-little-slice-of-joy.git)

## Starting the Server
* run `npm install`
* create a `.env` file in the root and add the following variables:
  * PORT=8000
  * MONGO_URI={Mongodb connection string}
  * DB_NAME={Mongodb database name}
  * SERVICES_COLLECTION={Mongodb collection name for services objects}
  * MENU_COLLECTION={Mongodb collection name for menu item objects}
* run `npm run build`
* run `nodemon build/server.js` to start server
* Go to [A Little Slice of Joy](https://github.com/KadenHansen/a-little-slice-of-joy.git) to start the client side and view in browser
