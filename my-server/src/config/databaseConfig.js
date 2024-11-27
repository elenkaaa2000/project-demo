import mongoose from "mongoose";

export function databaseConfig(){
    const url = 'mongodb://localhost:27017/gift-shop'

    mongoose.connect(url).
    then(()=> console.log('Database successfully connected!')).catch(()=>console.log('Database failed connecting!'))
}