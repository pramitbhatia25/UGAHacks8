const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
    name:{
        type:String, required:true
    }, 
    email:{
        type:String, required:true, unique: true
    },  
    pass:{
        type:String, required:true
    },
    phone:{
        type:Number, required:true
    }, 
    food_listings:[{
        address: {type: String},
        time: {type: String},
        no_of_spots: {type: Number},
        spot_passwords: [],
    }], 
    lifep:{
        type:Number, required:true
    }, 
    community:{
        type:String, required:true
    },
})

const User = mongoose.model('USER', userSchema);

module.exports = User;