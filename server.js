const express = require("express");
const jsonparser = require("body-parser");
const db = require("./db/database.js");
const Condidat = require('./Api/CondidatApi');
const Etablisement = require('./Api/EtablisementApi');
const uploadimg = require('./Api/uploadphoto');
const login = require('./Api/LoginApi');
const superadmin = require('./Api//superadminApi');
const chat= require("./Api/chat")

require("./passport")


const http = require('http');
const socketIO = require('socket.io');
const path = require('path')
const cors = require('cors')
const app = express();
app.use(jsonparser.json({ limit: '50mb' }));
app.use(jsonparser.urlencoded({ limit: '50mb', extended: true, parameterLimit: 50000 }));
app.use(cors()); 
app.use('/upload',express.static(path.join(__dirname, 'upload')));
app.use('/Condidat', Condidat);
app.use('/uploadimg',uploadimg);
app.use('/Etablisement',Etablisement);
app.use('/login',login);
app.use('/superadmin',superadmin);
app.use('/chat',chat)


const server = http.createServer(app);  
const io = socketIO(server);
app.set('io', io);
app.use(express.static(path.join(__dirname, 'dist')));

server.listen(3000);