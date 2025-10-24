const mongoose = require('mongoose');

const contactSchema = mongoose.Schema(
  {
    user_id:{
      type:mongoose.Schema.Types.ObjectId,
      required:true,
      ref:"user",
        },
    name:{
      type:String,
      required:[true,"Please Add the Contact Name"],
    },
        email:{
      type:String,
      required:[true,"Please Add the Contact Email Address"],
    },
        phone:{
      type:String,
      required:[true,"Please Add the Contact Phone Number"],
    },
  }
)
module.exports = mongoose.model("Contact",contactSchema);