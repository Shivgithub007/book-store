const mongoose=require("mongoose");

const Bookschema=new mongoose.Schema(
    {
        title:{
            type:String,
            required:true,
        },
        author:{
            type:String,
            required:true,
        },
        publishYear:{
            type:Number,
            required:true,
        },
    },
    {
        timestamps:true,
    }
)

const Bookmodal=mongoose.model('Book',Bookschema)

module.exports={
    Bookmodal,
}