import { Venta } from "../models/venta.model";

export function getVentas() {
  return localStorage.getItem("ventas")
    ? JSON.parse(localStorage.getItem("ventas"))
    : [];
}

export function addVenta(venta) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const newVenta = new Venta(venta);
      try {
        newVenta.validate();
      } catch (error) {
        reject(error);
      }
      // Guardar el nuevo cliente en localStorage
      const existingProducts = getVentas();
      existingProducts.push(newVenta);
      localStorage.setItem("ventas", JSON.stringify(existingProducts));
      resolve(newVenta);
    }, 2000);
  });
}