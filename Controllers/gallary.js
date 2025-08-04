const GallaryModal = require('../Models/gallary');

exports.addImage = async(req,res)=>{
    try{
        const {link} = req.body;
        const image = new GallaryModal({link,addedBy:req.user._id});
        await image.save();
        res.status(200).json({message:"Image added Successfully",image})
    }catch (err) {
        console.log(err)
        res.status(500).json({
            error: "Something Went Wrong",
            issue: err.message
        })
    }
}

exports.getAllGallary = async(req,res)=>{
    try{

        const images = await GallaryModal.find();
        return res.status(200).json({
            message:"Images Fetched Successfully",
            images
        })

    }catch (err) {
        console.log(err)
        res.status(500).json({
            error: "Something Went Wrong",
            issue: err.message
        })
    }
}

exports.deleteImageById = async(req,res)=>{
    try{

        const {id} = req.params;
        const image= await GallaryModal.findByIdAndDelete(id)
        if(image){
            return res.status(200).json({
                message:"Image Deleted"
            });
        }

        return res.status(400).json({
            error:"No Such Image Found"
        });

    }catch (err) {
        console.log(err)
        res.status(500).json({
            error: "Something Went Wrong",
            issue: err.message
        })
    }
}