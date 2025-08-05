const mongoose = require("mongoose");


const MedicineSchema = new mongoose.Schema({
    name:{
        type:String,
    },
    quantity:{
        type:String,
    },
    usage:{
        type:String,
    },
    addedBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user",
        required:true
    }
},{timestamps:true});
MedicineSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: (_, ret) => {
    if (ret._id) ret._id = ret._id.toString();
    return ret;
  },
});

const medicineModel = mongoose.model("medicine",MedicineSchema);
module.exports = medicineModel;