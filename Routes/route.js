import express from "express";
import { postProduct, getProduct , deleteProduct, updateProduct} from "../Controller/taskController.js";

const router = express.Router();

router.post("/product", postProduct);
router.get("/products" , getProduct);
router.delete("/product/:id" ,deleteProduct);
router.put("/product/:id" , updateProduct)

export default router;
