import React, { useState, useEffect } from "react";
import { AddClientModal } from "../components/AddModals";
import { Button } from "antd";
import { getClients } from "../services/clients.service";
import { ClientsTable } from "../components/Tables";

const ClientesPage = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [dataSource, setDataSource] = useState([]);

  const actualizarDatos = () => {
    const clientes = getClients();
    setDataSource(clientes);
  };

  useEffect(() => {
    actualizarDatos();
  }, []);

  const handleModalClose = () => {
    setModalOpen(false);
    actualizarDatos();
  };

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
      <AddClientModal isOpen={modalOpen} onClose={handleModalClose} />
    </div>
  );
};

export default ClientesPage;
