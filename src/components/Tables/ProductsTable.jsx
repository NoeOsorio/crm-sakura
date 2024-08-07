import React from "react";
import { Table } from "antd";

const productColumns = [
    {
      title: "Nombre",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Precio",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Descripción",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Categoría",
      dataIndex: "category",
      key: "category",
    },
  ];
  
  export function ProductsTable({ dataSource }) {
    return <Table columns={productColumns} dataSource={dataSource} />;
  }