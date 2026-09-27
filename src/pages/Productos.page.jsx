import React, { useEffect, useState } from "react";
import { Button } from "antd";
import { ProductsTable } from "../components/Tables";
import {
  getProductsDB,
  getProductsFromFirestore,
} from "../services/products.service";
import { AddProductModal } from "../components/AddModals";

const ProductosPage = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [dataSource, setDataSource] = useState([]);
  useEffect(() => {
    // getProductsFromFirestore().then((products) => {
    //   console.log(products[0]);
    //   setDataSource(products);
    // });
    const unsuscribe = getProductsDB((products) => {
      setDataSource(products);
    });
    return () => unsuscribe && unsuscribe();
  }, []);
  return (
    <div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <h2>Lista de Productos</h2>
        <Button type="primary" onClick={() => setModalOpen(true)}>
          Agregar Producto
        </Button>
      </div>
      <ProductsTable dataSource={dataSource} />
      <AddProductModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
};

export default ProductosPage;
