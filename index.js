import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from 'dotenv'
dotenv.config(); 
import routes from "./Routes/route.js";
const app = express();

app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 4000;



mongoose.connect(process.env.dB_URI ,{ useNewUrlParser: true, useUnifiedTopology: true })
.then(() => console.log("Mongo db is Connected"))
.catch(err => console.log("Moose is discon" , err))

app.use("/api", routes);

app.listen(PORT, () => {
  console.log("server is runing");
});
