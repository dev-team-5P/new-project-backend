var express = require('express');
var router = express.Router();
var Chat = require('../Models/chatSchema');
var passport = require('passport');
// router.post('/addChat',passport.authenticate('bearer',{session:false}), async (req,res)=>{
//     const create = await Chat.create({candidat1 : req.body.candidat1 , candidat2:req.body.candidat2})
//     res.send(create)
// })


router.post('/sendMessage/:idChat',passport.authenticate('bearer', { session: false }),async (req,res)=>{
 const chat=await Chat.findById(req.params.idChat).exec()
    const io = req.app.get('io');
   const chat2 = await Chat.findByIdAndUpdate(chat._id, {$push: {messages: req.body}})
    io.emit('newMessageSended', chat2);
    res.send('sended')
});

router.get('/getPrivateMessage/:idCandidat1/:idCandidat2',passport.authenticate('bearer', { session: false }), function (req,res){    
       Chat.findOne({candidat1: req.params.idCandidat1, candidat2:req.params.idCandidat2}, function(err,chat1) {
        if(err){
            res.send(err);
        }
        if(!chat1){
          Chat.findOne({candidat1: req.params.idCandidat2, candidat2:req.params.idCandidat1}, function(err2, chat2) {
              if(err2) {
                  res.send(err2);
              }
              if(!chat2) {
                var chat = new Chat({candidat1: req.params.idCandidat1, candidat2: req.params.idCandidat2, messages: []});
                chat.save( function(err3,chat){
                    if(err3) {
                        res.send(err3)
                    }
                    res.send(chat);
                });
              }else{
              res.send(chat2);
            }
          })

        } else {
            res.send(chat1);
        }
    });
        
});


module.exports = router;