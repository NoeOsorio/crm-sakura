import { collection, onSnapshot, addDoc , getDocs} from "firebase/firestore";
import Product from "../models/product.model";
import { firestore } from "../firebase/firebaseConfig";

export function getProducts() {
  return localStorage.getItem("products")
    ? JSON.parse(localStorage.getItem("products"))
    : [];
}

export  function getProductsDB(onProductsChange) {
  
  try {
    const _collection = collection(firestore, "products");
     const unsuscribe = onSnapshot(_collection, (snapshot) => {
      const products = []
      snapshot.forEach((doc) => {
        const product = new Product({...doc.data(), id: doc.id});
        products.push(product);
      });
      onProductsChange(products);
    });
    return unsuscribe
  } catch (error) {
    console.log("Error getting documents: ", error);
    return null;
  }
}

export async function addProduct(product) {
  const newProduct = new Product(product);
  try {
    newProduct.validate();
    const _collection = collection(firestore, "products");
    const dbproduct= await addDoc(_collection, newProduct.toObject());
    return dbproduct.id;
  } catch (error) {
    console.error(error);
  }
}


export async function getProductsFromFirestore() {
  const products = [];
  try {
    const _collection = collection(firestore, "products");
    const snapshot = await getDocs(_collection);
    snapshot.forEach((doc) => {
      const product = new Product({ ...doc.data(), id: doc.id });
      console.log(product);
      products.push(product);
    });
  } catch (error) {
    console.log("Error getting documents: ", error);
  }
  return products;
}