let mongoose =  require('mongoose')


mongoose.connect('mongodb://localhost:27017/sigmaDB').then((connection)=>{
    console.log(connection);
})