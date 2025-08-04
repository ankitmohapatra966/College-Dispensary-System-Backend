const HospitalModels = require('../Models/nearByHospitals');


exports.addNearByHospital = async(req,res)=>{
    try{
       const {name,address,contact} = req.body;
       const hospital = new HospitalModels({name,address,contact,addedBy:req.user?._id});
       await hospital.save();
       res.status(200).json({message:"Hospital added Successfully",hospital})

    } catch (err) {
        console.log(err)
        res.status(500).json({
            error: "Something Went Wrong",
            issue: err.message
        })
    }
}

exports.getHospitals = async(req,res)=>{
    try{
        const hospitals=await HospitalModels.find().populate("addedBy","name").sort({createdAt:-1});
        return res.status(200).json({
            message:"Hospital fetched Successfully",
            hospitals
        })
    } catch (err) {
        console.log(err)
        res.status(500).json({
            error: "Something Went Wrong",
            issue: err.message
        })
    }
}

exports.updateHospitalById = async(req,res)=>{
    try{

        const {id} = req.params;
        let body = {...req.body};
        
        const hospital = await HospitalModels.findByIdAndUpdate(id,{...body,addedBy:req.user?._id})

        if(hospital){
            return res.status(200).json({
                message:"Hospital updated Successfully"
            })
        }
        return res.status(400).json({
            error:"No Such Hospital Found"
        });

    }catch (err) {
        console.log(err)
        res.status(500).json({
            error: "Something Went Wrong",
            issue: err.message
        })
    }
}


exports.deleteHospitalById= async(req,res)=>{
    try{
        const {id} = req.params;
        const hospital = await HospitalModels.findByIdAndDelete(id);
         if (!hospital) {
            return res.status(404).json({ error: "Hospital not found" });
        }

        return res.status(200).json({ message: "Hospital deleted successfully" });
        
    }catch (err) {
        console.log(err)
        res.status(500).json({
            error: "Something Went Wrong",
            issue: err.message
        })
    }
}