const express=require("express");
const mongoose=require("mongoose");
const {PORT,mongoURL}=require("./config");
const {Bookmodal}=require("./models/booksmodels")
const bookroute=require("./routes/bookroutes")
const app=express();

app.use(express.json())

// Using all the book router
app.use("/books",bookroute)


// Entry route
app.get("/",(req,res)=>{
    console.log(req);
    res.status(234).send("A new book store application");
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


