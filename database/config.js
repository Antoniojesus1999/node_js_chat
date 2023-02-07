const mongoose= require('mongoose');
mongoose.set('strictQuery', true);
const dbConnection = async() =>{
    try{
       mongoose.connect(process.env.DB_CNN,{
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
       
        console.log('DB CONNECTED');
    }catch(error){
        console.log(error);
        throw new Error('Error en la base de datos - Hable con Antonio Jesús Ponce Vela')
    }
}

module.exports = {
    dbConnection
}