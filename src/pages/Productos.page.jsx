import React, { useState } from "react";
import { Button } from "antd";
import { ProductsTable } from "../components/Tables";
import { getProducts } from "../services/products.service";
import { AddProductModal } from "../components/AddModals";

const ProductosPage = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const dataSource = getProducts();
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
