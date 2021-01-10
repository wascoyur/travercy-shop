import mongoose from 'mongoose';

const connectDB = async()=>{
  try{
    const conn = await mongoose.connect(process.env.MONGO_URI,{
      useUnifiedTopology:true,
      useNewUrlParser:true,
      useCreateIndex:true
    })
    console.log(`Connect to Db: ${conn.connection.host}`.blue.bold);

  }catch(e){
    console.log(`Error: ${e.message}`.redbold);
    process.exit(1)
  }
}
export default connectDB
