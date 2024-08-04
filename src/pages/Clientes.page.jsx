import React, { useState } from "react";
import AddClientModal from "../components/AddClientModal"; // Import the AddClientModal component
import { Button, Table } from "antd";

const ClientesPage = () => {
  const dataSource  = localStorage.getItem("clients") ? JSON.parse(localStorage.getItem("clients")) : [];

  const columns = [
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

  const [modalOpen, setModalOpen] = useState(false);
  return (
    <div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <h2>Lista de Clientes</h2>
        <Button type="primary" onClick={() => setModalOpen(true)}>
          Agregar Cliente
        </Button>
      </div>
      <Table columns={columns} dataSource={dataSource} />
      <AddClientModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
};

export default ClientesPage;
