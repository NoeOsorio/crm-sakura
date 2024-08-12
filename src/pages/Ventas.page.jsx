
import React, { useState } from 'react';
import { Button } from 'antd';
import { VentasTable } from '../components/Tables';
import { getVentas } from '../services/ventas.service';
import { AddPVentaModal } from '../components/AddModals';

const VentasPage = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const dataSource = getVentas();
  return (
    <div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Button type="primary" onClick={() => setModalOpen(true)}>
          Agregar Venta
        </Button>
      </div>
      <VentasTable dataSource={dataSource} />
      <AddPVentaModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
};

export default VentasPage;
