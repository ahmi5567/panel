import Task from "../Model/taskModel.js";

export const postProduct = async (req, res) => {
  let body = req.body;

  if (
    !body.productName ||
    !body.productPrice ||
    !body.currencyCode ||
    !body.numberOfSale ||
    !body.rating ||
    !body.isFreeShipping ||
    !body.shopName
  ) {
    res.status(400).send({
      message: `
    required field missing, all fields are required:
    productName
            productPrice
            currencyCode
            numberOfSale
            rating
            isFreeShipping
            shopName
    `,
    });
    return;
  }

  try {
    let product = new Task({
      productName: body.productName,
      productPrice: body.productPrice,
      currencyCode: body.currencyCode,
      numberOfSale: body.numberOfSale,
      rating: body.rating,
      isFreeShipping: body.isFreeShipping,
      shopName: body.shopName,
    });
    const result = await product.save();
    res
      .status(200)
      .send({ message: "Product is added in database", data: result });
  } catch (e) {
    console.log("db error", e);
    res.status(500).send({ message: "db error in saving product" });
  }
};

export const getProduct = async (req, res) => {
  try {
    const product = await Task.find({}).exec();
    res.send({ message: "All product recieved successfully", data: product });
  } catch (e) {
    console.log("error in db ", e);
    res.status(500).send({ message: "error in recieved product" });
  }
};

export const deleteProduct = async (req, res) => {
  let _id = req.params.id;

  try {
    const result = await Task.findByIdAndDelete(_id);
    console.log("Delete Product ", result);
    res.send({
      message: "deleted",
    });
    return;
  } catch (e) {
    console.log(e);
    res.status(500).send({
      message: "db error",
    });
  }
};

export const updateProduct = async () => {
  let _id = req.params.id;
  let body = req.body;

  try {
    const result = await Task.findByIdAndDelete(_id , body)
    console.log("Update successfully", result)
    res.send({
      message: "Updated"
    });
  } catch (error) {
    console.log(error)
    res.status(500).send({
      message: "db error"
    });
  }
};

