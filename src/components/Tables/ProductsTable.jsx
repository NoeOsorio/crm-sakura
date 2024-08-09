import React from "react";
import { Table } from "antd";
import Product from "../../models/product.model";
  
  export function ProductsTable({ dataSource }) {
    return <Table columns={Product.columns} dataSource={dataSource} />;
  }