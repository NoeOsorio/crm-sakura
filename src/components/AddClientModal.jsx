import { Modal, Form, Input, InputNumber, message } from "antd";
import { v4 as uuidv4 } from "uuid";

export default function AddCleintModal({ onClose, isOpen }) {
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();
  // Manejar el evento cuando se presiona el botón de Ok
  const handleOk = () => {
    form.validateFields().then((values) => {
      const uuid = uuidv4(); // Genera un UUID único para cada cliente
      const newClient = {
        id: uuid,
        key: uuid,
        name: values.name,
        age: values.age,
        address: values.address,
        email: values.email,
        phone: values.phone,
      };

      // Guardar el nuevo cliente en localStorage
      const existingClients = JSON.parse(localStorage.getItem("clients")) || [];
      existingClients.push(newClient);
      localStorage.setItem("clients", JSON.stringify(existingClients));
      messageApi.open({
        type: 'success',
        content: `Cliente ${values.name} guardado correctamente`,
      });
      onClose(); // Cerrar el modal después de guardar
      form.resetFields(); // Resetear el formulario
    }).catch((errorInfo) => {
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
      <p>Contenido del modal</p>
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
