import { v4 as uuidv4 } from "uuid";

export function getProducts() {
  return localStorage.getItem("products")
    ? JSON.parse(localStorage.getItem("products"))
    : [];
}

export function addProduct(product) {
  return new Promise((resolve) => {
    setTimeout(() => {
        const uuid = uuidv4(); 
      const newProduct = {
        id: uuid,
        key: uuid,
        name: product.name,
        price: product.price,
        description: product.description,
        category: product.category,
      };

      // Guardar el nuevo cliente en localStorage
      const existingProducts = getProducts();
      existingProducts.push(newProduct);
      localStorage.setItem("products", JSON.stringify(existingProducts));
      resolve(newProduct);
    }, 2000);
  });
}
