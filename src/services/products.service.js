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
      // Guardar el nuevo producto en localStorage
      const existingProducts = getProducts();
      existingProducts.push(newProduct);
      localStorage.setItem("products", JSON.stringify(existingProducts));
      resolve(newProduct);
    }, 2000);
  });
}

export function updateProduct(updatedProduct) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        const existingProducts = getProducts();
        const index = existingProducts.findIndex(p => p.id === updatedProduct.id);
        if (index === -1) {
          reject(new Error("Producto no encontrado"));
          return;
        }
        const productToUpdate = new Product(updatedProduct);
        productToUpdate.validate();
        existingProducts[index] = productToUpdate;
        localStorage.setItem("products", JSON.stringify(existingProducts));
        resolve(productToUpdate);
      } catch (error) {
        reject(error);
      }
    }, 2000);
  });
}

export function deleteProduct(productId) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        const existingProducts = getProducts();
        const index = existingProducts.findIndex(p => p.id === productId);
        if (index === -1) {
          reject(new Error("Producto no encontrado"));
          return;
        }
        existingProducts.splice(index, 1);
        localStorage.setItem("products", JSON.stringify(existingProducts));
        resolve();
      } catch (error) {
        reject(error);
      }
    }, 2000);
  });
}
