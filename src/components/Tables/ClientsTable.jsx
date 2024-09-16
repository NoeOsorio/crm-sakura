import { Table, Button, Form } from "antd";
import Cliente from "../../models/cliente.model";
import Swal from "sweetalert2";
import { AddClientModal } from "../AddModals";
import { useState, useEffect } from "react";
import { getClients, deleteClient } from "../../services/clients.service";

export function ClientsTable() {
  const [form] = Form.useForm();
  const [clienteAEditar, setClienteAEditar] = useState(null);
  const [modalAbierto, setModalAbierto] = useState(false);
  const [dataSource, setDataSource] = useState([]);

  useEffect(() => {
    actualizarDatos();
  }, []);

  const actualizarDatos = () => {
    const clientes = getClients();
    setDataSource(clientes);
  };

  const manejarEdicion = (registro) => {
    form.setFieldsValue(registro);
    Swal.fire({
      title: 'Editando cliente',
      text: '¿Estás seguro de que quieres editar este cliente?',
      icon: 'info',
      showCancelButton: true,
      confirmButtonText: 'Sí, editar',
      cancelButtonText: 'Cancelar'
    }).then((resultado) => {
      if (resultado.isConfirmed) {
        setClienteAEditar(registro);
        setModalAbierto(true);
      }
    });
  };

  const manejarEliminacion = (registro) => {
    Swal.fire({
      title: 'Eliminando cliente',
      text: '¿Estás seguro de que quieres eliminar este cliente?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((resultado) => {
      if (resultado.isConfirmed) {
        deleteClient(registro.id)
          .then(() => {
            Swal.fire('Eliminado', 'El cliente ha sido eliminado correctamente', 'success');
            actualizarDatos();
          })
          .catch((error) => {
            Swal.fire('Error', error.message, 'error');
          });
      }
    });
  };

  const columnas = [
    ...Cliente.columns,
    {
      title: 'Acciones',
      key: 'acciones',
      render: (_, registro) => (
        <>
          <Button type="primary" onClick={() => manejarEdicion(registro)} style={{ marginRight: '8px' }}>
            Editar
          </Button>
          <Button type="primary" danger onClick={() => manejarEliminacion(registro)}>
            Eliminar
          </Button>
        </>
      ),
    },
  ];
  
  const handleModalClose = () => {
    setModalAbierto(false);
    actualizarDatos();
  };
  
  return (
    <>
      <Table columns={columnas} dataSource={dataSource} />
      <AddClientModal 
        isOpen={modalAbierto} 
        onClose={handleModalClose}
        clientToEdit={clienteAEditar}
      />
    </>
  );
}
