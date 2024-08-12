import React, { useState } from "react";
import { AddClientModal } from "../components/AddModals"; // Import the AddClientModal component
import { Button } from "antd";
import { getClients } from "../services/clients.service";
import { ClientsTable } from "../components/Tables";

const ClientesPage = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const dataSource = getClients();
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
      <ClientsTable dataSource={dataSource} />
      <AddClientModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
};

export default ClientesPage;
