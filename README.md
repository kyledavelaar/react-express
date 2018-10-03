
## STARTUP

Open 4 terminal tabs:

ONE
  cd   (go to root of computer)
  mongod --dbpath mongodb   (if install mongo db in default dir don't need --dbpath and dirname)

TWO
  mongo --host 127.0.0.1:27017

THREE
  nodemon server

FOUR
  npm start