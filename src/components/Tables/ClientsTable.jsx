import { Table } from "antd";
const clientColumns = [
  {
    title: "Nombre",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Edad",
    dataIndex: "age",
    key: "age",
  },
  {
    title: "Dirección",
    dataIndex: "address",
    key: "address",
  },
  {
    title: "Correo",
    dataIndex: "email",
    key: "email",
  },
  {
    title: "Teléfono",
    dataIndex: "phone",
    key: "phone",
  },
];

export function ClientsTable({ dataSource }) {
  return <Table columns={clientColumns} dataSource={dataSource} />;
}
