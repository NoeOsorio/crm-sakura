import React, { useState } from "react";
import { Button } from "antd";
import { VentasTable } from "../components/Tables";
import { getVentas } from "../services/ventas.service";
import VentasForm from "../components/VentasForm";

const VentasPage = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const dataSource = getVentas();
  return (
    <div>
      {!modalOpen && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Button type="primary" onClick={() => setModalOpen(true)} style={{marginBottom: "2em"}}>
            Agregar Venta
          </Button>
        </div>
      )}
      {modalOpen && <VentasForm onClose={() => setModalOpen(false)} />}
      {!modalOpen && <VentasTable dataSource={dataSource} />}
    </div>
  );
};

export default VentasPage;
