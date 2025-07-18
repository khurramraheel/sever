let mongoose =  require('mongoose')


module.exports = mongoose.model('user', {
    name:String,
    password:String,
    nic:Number,
    email:{
        type:String,
        required:true
    },
    products:[]
});
