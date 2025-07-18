let mongoose =  require('mongoose')


mongoose.connect('mongodb+srv://testWala:Abc_123@cluster0.hgfh1gx.mongodb.net/sigmaDB').then((connection)=>{
    console.log(connection);
})