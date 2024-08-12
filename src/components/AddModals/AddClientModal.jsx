import { Modal, Form, Input, InputNumber, message } from "antd";
import { addClient } from "../../services/clients.service";

export default function AddClientModal({ onClose, isOpen }) {
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();
  const handleOk = () => {
    form.validateFields().then(async (values) => {
     try {
      messageApi.open({
        type: 'loading',
        content: 'Guardando cliente...',
        duration: 0,
      });
      await addClient(values);
      messageApi.destroy();
      messageApi.open({
        type: 'success',
        content: `Cliente ${values.name} guardado correctamente`,
      });
      onClose(); // Cerrar el modal después de guardar
      form.resetFields(); // Resetear el formulario
     } catch (error) {
      messageApi.destroy();
      messageApi.open({
        type: 'error',
        content: error.message,
      });
     }
    }).catch((errorInfo) => {
      messageApi.destroy();
      console.log("Error al guardar el cliente:", errorInfo);
      messageApi.open({
        type: 'error',
        content: 'Algo salió mal, por favor intente de nuevo',
      });
    });
  };

  return (
    <Modal
      title="Nuevo Cliente"
      onCancel={onClose}
      onClose={onClose}
      onOk={handleOk}
      open={isOpen}
      okText="Guardar"
    >
      {contextHolder}
      <Form form={form}>
        <Form.Item
          label="Nombre"
          name="name"
          rules={[{ required: true, message: "Por favor ingrese el nombre" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Edad"
          name="age"
          rules={[{ required: true, message: "Por favor ingrese la edad" }]}
        >
          <InputNumber />
        </Form.Item>
      
        <Form.Item
          label="Correo Electrónico"
          name="email"
          rules={[
            {
              required: true,
              message: "Por favor ingrese el correo electrónico",
            },
            { type: "email", message: "El correo electrónico no es válido" },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Teléfono"
          name="phone"
          rules={[{ required: true, message: "Por favor ingrese el teléfono" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Dirección"
          name="address"
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
}
