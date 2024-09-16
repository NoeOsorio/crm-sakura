import { Table, Button, Form, Space } from "antd";
import Product from "../../models/product.model";
import Swal from "sweetalert2";
import { AddProductModal } from "../AddModals";
import { useState, useEffect } from "react";
import { getProducts, deleteProduct } from "../../services/products.service";

export function ProductsTable() {
  const [form] = Form.useForm();
  const [productoAEditar, setProductoAEditar] = useState(null);
  const [modalAbierto, setModalAbierto] = useState(false);
  const [dataSource, setDataSource] = useState([]);

  useEffect(() => {
    actualizarDatos();
  }, []);

  const actualizarDatos = () => {
    const productos = getProducts();
    setDataSource(productos);
  };

  const manejarEdicion = (registro) => {
    form.setFieldsValue(registro);
    Swal.fire({
      title: 'Editando producto',
      text: '¿Estás seguro de que quieres editar este producto?',
      icon: 'info',
      showCancelButton: true,
      confirmButtonText: 'Sí, editar',
      cancelButtonText: 'Cancelar'
    }).then((resultado) => {
      if (resultado.isConfirmed) {
        setProductoAEditar(registro);
        setModalAbierto(true);
      }
    });
  };

  const manejarEliminacion = (registro) => {
    Swal.fire({
      title: 'Eliminando producto',
      text: '¿Estás seguro de que quieres eliminar este producto?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((resultado) => {
      if (resultado.isConfirmed) {
        deleteProduct(registro.id).then(() => {
          Swal.fire('Eliminado', 'El producto ha sido eliminado correctamente', 'success');
          actualizarDatos();
        }).catch((error) => {
          Swal.fire('Error', 'No se pudo eliminar el producto: ' + error.message, 'error');
        });
      }
    });
  };

  const columnas = [
    ...Product.columns,
    {
      title: 'Acciones',
      key: 'acciones',
      render: (_, registro) => (
        <Space>
          <Button type="primary" onClick={() => manejarEdicion(registro)}>
            Editar
          </Button>
          <Button type="primary" danger onClick={() => manejarEliminacion(registro)}>
            Eliminar
          </Button>
        </Space>
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
      <AddProductModal 
        isOpen={modalAbierto} 
        onClose={handleModalClose}
        productToEdit={productoAEditar}
      />
    </>
  );
}