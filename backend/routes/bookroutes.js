const express=require("express");

const {Bookmodal}=require("../models/booksmodels")


const router=express.Router()



// To get all the list of books
router.get("/",async (req,res)=>{
    try{
        const bookdata=await Bookmodal.find({});
        res.send({count:bookdata.length,books:bookdata})
    }catch(error){
        console.log(error);
    }
})

// Route to get a specific book by id
router.get("/:id",async (req,res)=>{
    try{
        let specifiedBook=await Bookmodal.find({_id:req.params.id});
        res.send(specifiedBook);
    }catch(error){
        console.log(error);
    }
})

// Route to update the data into the book
router.put("/:id",async (req,res)=>{
    try{
        if(!req.body.title || !req.body.author || !req.body.publishYear){
            res.send("Please send the completer data");
        }
        const id=req.params.id

        // Checking the id given by the user
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).send("Please give the valid id");
        }

        // Updating
        const updatedBook=await Bookmodal.findByIdAndUpdate(id,req.body)
        
        
        if(!updatedBook){
            return res.status(404).send("Data dosent match");
        }
        console.log(updatedBook);
        res.status(500).send("Data is updated");
    }catch(error){
        console.log(error);
    }
})



// Route to insert the data of the book
router.post("/",async (req,res)=>{
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

// Route to delete a book entry by taking the id

router.delete("/:id",async (req,res)=>{
    try{
        
        // Checking if the id is correct or not
        if(!req.params.id){
            return res.status(400).send("Please give the valid id");
        }

        //Deleting the entry
        const deletedrecord=await Bookmodal.deleteOne({_id:req.params.id});

        if(!deletedrecord){
            return res.status(404).send("Data not found");
        }
        
        console.log(deletedrecord);
        res.status(500).send("Book has been deleted");

    }
    catch(error){
        console.log("Error")
    }
})

module.exports=router
