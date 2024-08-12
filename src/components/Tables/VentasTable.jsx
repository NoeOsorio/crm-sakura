import React from "react";
import { Table } from "antd";
import { Venta } from "../../models/venta.model";
  
  export function VentasTable({ dataSource }) {
    return <Table columns={Venta.columns} dataSource={dataSource} />;
  }