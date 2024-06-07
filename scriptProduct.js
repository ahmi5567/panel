
let baseUrl;

if (window.location.href.indexOf("https") === -1) {
  baseUrl = "http://localhost:4000";
}

async function getAllProducts() {
  try {
    const response = await axios.get(`${baseUrl}/api/products`);
    console.log(response.data.data);

    let productList = document.querySelector("#productList");

    productList.innerHTML = "";

    response.data.data.map((eachProduct) => {
      productList.innerHTML += `
    <div>
      <img src="./images/1.jpg">
      <p>${eachProduct.productName}</p>
      <p>
      <span>${eachProduct.currencyCode}</span>
      <span>${eachProduct.productPrice}</span>
      </p>
      <p>${eachProduct.numberOfSale || 0} Sold</p>
      <p>${
        eachProduct.isFreeShipping ? "free shipping" : "no free shipping"
      }</p>
      <p>${eachProduct.shopName}</p>
      <button class="delete" onclick="deleteProduct('${
        eachProduct._id
      }')">Delete</button>
      <button class="edit" onclick="updateProduct('${
        eachProduct._id
      }')">Edit</button>

    </div>
      `;
    });
  } catch (e) {
    console.error(e);
  }
}
getAllProducts();

async function deleteProduct(id) {
  console.log("product id", id);

  try {
    let response = await axios.delete(`${baseUrl}/api/product/${id}`);
    if (response) {
      console.log("Deleted");
      getAllProducts();
    }
  } catch (e) {
    console.log(e);
    return;
  }
}

async function updateProduct(id) {
  console.log(id);

  try {
    let response = await axios.get(`${baseUrl}/api/products/${id}`);
    if (response) {
      let product = response.data.data;
      console.log(product);

      document.querySelector("#updateForm").innerHTML = `
      <form class="updateForm" onsubmit="completeUpdate(); return false ">
      <label for="productId">Product Id</label>
      <input type="text" id="productId" value="${product._id}" disabled>
      <br>

      <label for="productName">Product Name</label>
      <input type="text" id="productName" value="${
        product.productName
      }" required>
      <br>

      <label for="productPrice">Product Price</label>
      <input type="number" id="productPrice" value="${
        product.productPrice
      }" required>
      <br>

      <label for="currencyCode">Currency Code</label>
      <input type="text" id="currencyCode" value="${
        product.currencyCode
      }" required>
      <br>

      <label for="numberOfSale">Number Of Sale</label>
      <input type="number" id="numberOfSale" value="${
        product.numberOfSale
      }" required>
      <br>

      <label for="rating">Product Rating</label>
      <input type="number" min="0" max="5" id="rating" value="${
        product.rating
      }" required>
      <br>

      <label for="isFreeShipping">Free Shipping</label>
      <select name="isFreeShipping" id="isFreeShipping">
          <option ${
            product.isFreeShipping ? "selected" : ""
          } value="true">Yes</option>
          <option ${
            !product.isFreeShipping ? "selected" : ""
          } value="false">No</option>
      </select>
      <br>

      <label for="shopName">shop Name</label>
      <input type="text" id="shopName" value="${product.shopName}" required>
      <br>

      <input type="submit" value="Complete Update">
  </form>
      `;
    }
  } catch (error) {
    console.log(error);
    return;
  }
}

function completeUpdate() {
  let productId = document.querySelector("#productId").value;
  let productName = document.querySelector("#productName").value;
  let productPrice = document.querySelector("#productPrice").value;
  let currencyCode = document.querySelector("#currencyCode").value;
  let numberOfSale = document.querySelector("#numberOfSale").value;
  let rating = document.querySelector("#rating").value;
  let isFreeShipping = document.querySelector("#isFreeShipping").value;
  let shopName = document.querySelector("#shopName").value;

  axios.put(`${baseUrl}/product/${productId}`,{
    productName,
    productPrice,
    currencyCode,
    numberOfSale,
    rating,
    isFreeShipping,
    shopName
  })
  .then(function (response){
    console.log(response.data)
    document.querySelector("#updateForm").innerHTML = ``;
    getAllProducts();
  })
  .catch(function (error){
    console.log(error)
  })
}
