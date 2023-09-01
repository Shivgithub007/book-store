const express=require("express");
const mongoose=require("mongoose");
const {PORT,mongoURL}=require("./config");
const {Bookmodal}=require("./models/booksmodels")

const app=express();

app.use(express.json())

app.get("/",(req,res)=>{
    console.log(req);
    res.status(234).send("A new book store application");
})

app.get("/books",async (req,res)=>{
    try{
        const bookdata=await Bookmodal.find({});
        res.send({count:bookdata.length,books:bookdata})
    }catch(error){
        console.log(error);
    }
})



app.post("/books",async (req,res)=>{
    try{
        if(!req.body.title || !req.body.author || !req.body.publishYear){
            res.send({message:"All details are not given"});
        }
        const newbook={
            title:req.body.title,
            author:req.body.author,
            publishYear:req.body.publishYear
        }
        const book=await Bookmodal.create(newbook);
        res.send(JSON.stringify(book));

    }
    catch(error){
        console.log(error);
    }
})


mongoose.connect(mongoURL)
.then(()=>{
    console.log("DB is connected");
    app.listen(PORT,()=>{
        console.log(`Server is listening on port ${PORT}`)
    })
})
.catch((error)=>{
    console.log(error)
})

