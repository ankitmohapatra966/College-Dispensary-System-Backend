const HistoryModel = require("../Models/history");
const MedicineModel = require("../Models/medicine");

exports.addHistory = async(req,res)=>{
    try{

        let {roll,student,medicines} = req.body;
        
        let medicineData = medicines.map((item)=>{
            let {_id,name,requiredQuantity} = item;
            return {_id,name,requiredQuantity};
        })
        medicineData.map(async(item)=>{
            let medicineData = await MedicineModel.findById(item._id);
            let leftQuantity = parseInt(medicineData.quantity) - parseInt(item.requiredQuantity);
            medicineData.quantity = leftQuantity.toString();
            await medicineData.save();
        })
        const addData = new HistoryModel({roll,student,medicines})
        await addData.save();
        return res.status(200).json({
            message:"Added successfully"
        })


    }catch (err) {
        console.log(err)
        res.status(500).json({
            error: "Something Went Wrong",
            issue: err.message
        })
    }
}

exports.getHistoryByDate = async(req,res)=>{
    try{
        let {month,year} = req.query;
        const monthIndex = new Date(`${month} 1, ${year}`).getMonth(); // Convert month name to index (0-11)

        const startDate = new Date(year,monthIndex,1);
        const endDate = new Date(year,monthIndex+1,1);
        const history = await HistoryModel.find({
            createdAt:{ $gte:startDate, $lt:endDate }
        }).populate("student").sort({createdAt:-1});

        return res.status(200).json({
            message:"Fetched Successfully",
            history
        })

    }catch (err) {
        console.log(err)
        res.status(500).json({
            error: "Something Went Wrong",
            issue: err.message
        })
    }
}


exports.getStudentHistory=async(req,res)=>{
    try{
        const {roll} = req.query;
        const history = await HistoryModel.find({roll}).populate("student").sort({createdAt:-1});

        if(history.length===0){
            return res.status(400).json({error:"No any record found for this roll"})
        }
        return res.status(200).json({
            message:"Fetched Succesfully",
            history
        })

         
    }catch (err) {
        console.log(err)
        res.status(500).json({
            error: "Something Went Wrong",
            issue: err.message
        })
    }
}