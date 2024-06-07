import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
  productName : {type: String},
  productPrice: {type: Number, require:true},
  currencyCode: {type: String},
  numberOfSale: {type: Number},
  rating: {type: Number},
  isFreeShipping: {type: Boolean},
  shopName: {type: String}
  }
)
const Task = mongoose.model("Task" , taskSchema);
 
export default Task;
