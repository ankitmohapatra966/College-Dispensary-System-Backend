const MedicineModels = require('../Models/medicine');


exports.addMedicine = async (req, res) => {
    try {
        const {name,quantity,usage} = req.body;
        const medicine = new MedicineModels({name,quantity,usage,addedBy:req.user._id});
        await medicine.save();
        return res.status(200).json({message:"Medicine added Successfully",medicine});

    } catch (err) {
        console.log(err)
        res.status(500).json({
            error: "Something Went Wrong",
            issue: err.message
        })
    }
}


exports.getMedicine = async (req, res) => {
    try {
        const medicines = await MedicineModels.find().populate("addedBy", "name").sort({ createdAt: -1 });
        res.status(200).json({
            message:"Mdicines Fetched Successfully",
            medicines:medicines
        })

    } catch (err) {
        console.log(err)
        res.status(500).json({
            error: "Something Went Wrong",
            issue: err.message
        })
    }
}


exports.updateMedicineById = async (req, res) => {
    try {
        const { id } = req.params;
        let body = { ...req.body };


        const medicine = await MedicineModels.findByIdAndUpdate(id, { ...body, addedBy: req.user._id });
        if (medicine) {
            return res.status(200).json({
                message: "Medicines Updated Successfully",
            });
        }

        return res.status(400).json({
            error: "No Such Medicine Found"
        });
    } catch (err) {
        console.log(err)
        res.status(500).json({
            error: "Something Went Wrong",
            issue: err.message
        })
    }
}

exports.searchMedicine = async (req, res) => {
    try {
        const { name } = req.query;
        const medicines = await MedicineModels.find({name:{$regex:'^' + name,$options:'i'}}).populate("addedBy").sort({createdAt:-1});

        res.status(200).json({
            message:"Medicines Fetched Successfully",
            medicines:medicines
        })
    } catch (err) {
        console.log(err)
        res.status(500).json({
            error: "Something Went Wrong",
            issue: err.message
        })
    }
}


exports.deleteMedicineById = async(req,res)=>{
    try{

        const {id} = req.params;
        const medicine = await MedicineModels.findByIdAndDelete(id);
        if(medicine){
          return res.status(200).json({
            message:"Medicines deleted Successfully",
         });
        }
        return res.status(400).json({
            error:"No Such Medicine Found"
        });

    } catch (err) {
        console.log(err)
        res.status(500).json({
            error: "Something Went Wrong",
            issue: err.message
        })
    }
}