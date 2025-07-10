import { getParam, setLocalStorage } from "./utils.mjs";
import ProductData from "./ProductData.mjs";

// Get product ID from query string
const productId = getParam("product");

const dataSource = new ProductData("tents");

function addProductToCart(product) {
  setLocalStorage("so-cart", product);
}

async function renderProductDetails(productId) {
  const product = await dataSource.findProductById(productId);

  document.querySelector(".product-detail h3").textContent = product.Brand.Name;
  document.querySelector(".product-detail h2").textContent = product.NameWithoutBrand;
  document.querySelector(".product-detail img").src = product.Images.Primary.Medium;
  document.querySelector(".product-detail img").alt = product.Name;
  document.querySelector(".product-card__price").textContent = `$${product.ListPrice}`;
  document.querySelector(".product__color").textContent = product.Colors[0].ColorName;
  document.querySelector(".product__description").textContent = product.DescriptionHtmlSimple;

  document.getElementById("addToCart").dataset.id = product.Id;
}

renderProductDetails(productId);

document.getElementById("addToCart").addEventListener("click", async function (e) {
  const product = await dataSource.findProductById(e.target.dataset.id);
  addProductToCart(product);
});


