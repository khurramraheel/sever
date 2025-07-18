let express = require('express');
let path = require('path');
const multer = require('multer');
const Product = require('./models/product');


require('./models/db')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, __dirname+'/backup')
    },
    filename: function (req, file, cb) {      
      cb(null, "user-" +file.originalname)
    }
  })

  const upload = multer({ storage: storage })

// import express from 'express';

// import path from 'path'

let meriApp = express();

meriApp.get('/getprodcts', async(req, res)=>{

  let productsList  = await Product.aggregate([
    {
      $match:{
        description:/mobile/i
      }
    },
    {
      $lookup:{
        from:"users",
        localField:'owner',
        foreignField:'_id',
        as:'matchedUser'
      }
    },
    {
        $project:{
          name:1,
          price:1,
          sellerName:'$matchedUser.email'
        }
      }    
  ])
  res.json(productsList)


});

meriApp.get('/getQty', async(req, res)=>{

  const products = await Product.aggregate([
    {
      $match:{
        description:/mobile/i
      }
    },
    {
      $group:{
        _id:null,
        abc: { $sum: '$qty' }
      }
    }
  ])

  res.json(products)

})

meriApp.get('/api/auth/flana', (req, res)=>{
    // req-incoming data
    // res-outgoing

    res.json({name:'ali'});

})

5
// meriApp.get('/', (req, res)=>{
//     // req-incoming data
//     // res-outgoing

//     // 
//     res.end("<input />")
//     // res.json({name:'ali'});

// })


// meriApp.get('/abc/food.jpg', (req, res)=>{
//     // req-incoming data
//     // res-outgoing
//     console.log('code chala')


//     // res.end(__dirname+'\abc\food.jpg')

//     res.sendFile(__dirname+'\\abc\\food.jpg');
//     // res.json({name:'yeh wala acode'});

// })


// meriApp.get('/abc/jacob.jpg', (req, res)=>{
//     // req-incoming data
//     // res-outgoing
//     console.log('code chala')


//     // res.end(__dirname+'\abc\food.jpg')

//     res.sendFile(__dirname+'\\abc\\jacob.jpg');
//     // res.json({name:'yeh wala acode'});

// })

meriApp.use('/api/upload', upload.array('someThing', 10), function(req, res){

    // req.files (agar upload.array lgya h to)
    // req.file (agar upload.single lgya h to)

    res.json({success:true})

})

meriApp.use(express.json())

meriApp.post('/apple', (req, res)=>{
    // req-incoming data
    // res-outgoing
    console.log(req.body);
    console.log('code chala')

    res.json({name:'yeh wala acode'});

})

// yeh website ka file server hota
meriApp.use(express.static('./abc'));
meriApp.use(express.static('./backup'));

meriApp.listen(7080, ()=>{
    console.log('ser chjaling');
})