const express = require("express");
const jsonparser = require("body-parser");
const db = require("./db/database.js");

const passport = require("./passport")


const http = require('http');
const socketIO = require('socket.io');
const path = require('path')
const cors = require('cors')
const app = express();
app.use(jsonparser.json({ limit: '50mb' }));
app.use(jsonparser.urlencoded({ limit: '50mb', extended: true, parameterLimit: 50000 }));
app.use(cors()); 
app.use('/upload',express.static(path.join(__dirname, 'upload')));


const server = http.createServer(app);  
const io = socketIO(server);
app.set('io', io);
app.use(express.static(path.join(__dirname, 'dist')));

server.listen(3000);