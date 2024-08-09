import Product from "../models/product.model";

export function getProducts() {
  return localStorage.getItem("products")
    ? JSON.parse(localStorage.getItem("products"))
    : [];
}

export function addProduct(product) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const newProduct = new Product(product);
      try {
        newProduct.validate();
      } catch (error) {
        reject(error);
      }
      // Guardar el nuevo cliente en localStorage
      const existingProducts = getProducts();
      existingProducts.push(newProduct);
      localStorage.setItem("products", JSON.stringify(existingProducts));
      resolve(newProduct);
    }, 2000);
  });
}
