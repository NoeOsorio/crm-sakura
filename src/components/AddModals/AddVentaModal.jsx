import React, { useMemo } from "react";
import {
  Modal,
  Form,
  Input,
  InputNumber,
  message,
  DatePicker,
  Switch,
  Select,
} from "antd";
import {  getProducts } from "../../services/products.service";
import { getClients } from "../../services/clients.service";
import { addVenta } from "../../services/ventas.service";

const { Option } = Select;

export default function AddPVentaModal({ onClose, isOpen }) {
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();
  const clients = useMemo(() => {
    return getClients();
  }, []);
  const products = useMemo(() => {
    return getProducts();
  }, []);

  const handleOk = () => {
    form
      .validateFields()
      .then(async (values) => {
        try {
          messageApi.open({
            type: "loading",
            content: "Guardando venta...",
            duration: 0,
          });
          await addVenta(values);
          messageApi.destroy();
          messageApi.open({
            type: "success",
            content: `Nueva vengta guardada correctamente`,
          });
          onClose(); // Cerrar el modal después de guardar
          form.resetFields(); // Resetear el formulario
        } catch (error) {
          messageApi.destroy();
          messageApi.open({
            type: "error",
            content: error.message,
          });
        }
      })
      .catch((errorInfo) => {
        console.error("Error al guardar la venta:", errorInfo);
        messageApi.destroy();
        messageApi.open({
          type: "error",
          content: "Algo salió mal, por favor intente de nuevo",
        });
      });
  };

  return (
    <Modal
      title="Nueva Venta"
      onCancel={onClose}
      onClose={onClose}
      onOk={handleOk}
      open={isOpen}
      okText="Guardar"
    >
      {contextHolder}
      <Form form={form} layout="vertical">
        <Form.Item
          label="Cliente"
          name="cliente"
          rules={[
            {
              required: true,
              message: "Por favor ingrese el cliente",
            },
          ]}
        >
          <Select
            showSearch
            placeholder="Seleccione un cliente"
            optionFilterProp="children"
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
          >
            {clients?.map((client) => (
              <Option key={client.id} value={client.id}>
                {client.name}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          label="Productos"
          name="productos"
          rules={[
            {
              required: true,
              message: "Por favor ingrese los productos",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Total"
          name="total"
          rules={[
            {
              required: true,
              message: "Por favor ingrese el total",
            },
          ]}
        >
          <InputNumber />
        </Form.Item>

        <Form.Item
          label="Fecha de Inicio"
          name="fechaInicio"
          rules={[
            {
              required: true,
              message: "Por favor ingrese la fecha de inicio",
            },
          ]}
        >
          <DatePicker />
        </Form.Item>

        <Form.Item
          label="Fecha de Pago"
          name="fechaPago"
          rules={[
            {
              required: true,
              message: "Por favor ingrese la fecha de pago",
            },
          ]}
        >
          <DatePicker />
        </Form.Item>

        <Form.Item
          label="Fecha de Creación"
          name="fechaCreacion"
          rules={[
            {
              required: true,
              message: "Por favor ingrese la fecha de creación",
            },
          ]}
        >
          <DatePicker />
        </Form.Item>

        <Form.Item label="Pagado" name="pagado" valuePropName="checked">
          <Switch />
        </Form.Item>

        <Form.Item label="Entregado" name="entregado" valuePropName="checked">
          <Switch />
        </Form.Item>
      </Form>
    </Modal>
  );
}
