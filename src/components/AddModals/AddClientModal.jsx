import { Modal, Form, Input, InputNumber, message} from "antd";
import { addClient, updateClient } from "../../services/clients.service";

export default function ClientModal({ onClose, isOpen, clientToEdit }) {
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();
  const isEditing = !!clientToEdit;

  const handleOk = () => {
    form.validateFields().then(async (values) => {
     try {
      messageApi.open({
        type: 'loading',
        content: isEditing ? 'Actualizando cliente...' : 'Guardando cliente...',
        duration: 0,
      });
      
      if (isEditing) {
        await updateClient({ ...clientToEdit, ...values });
      } else {
        await addClient(values);
      }

      messageApi.destroy();
      messageApi.open({
        type: 'success',
        content: isEditing
          ? `Cliente ${values.name} actualizado correctamente`
          : `Cliente ${values.name} guardado correctamente`,
      });
      onClose();
      form.resetFields();
     } catch (error) {
      messageApi.destroy();
      messageApi.open({
        type: 'error',
        content: error.message,
      });
     } finally {
      form.resetFields();
     }
    }).catch((errorInfo) => {
      messageApi.destroy();
      console.log("Error al procesar el cliente:", errorInfo);
      messageApi.open({
        type: 'error',
        content: 'Algo salió mal, por favor intente de nuevo',
      });
      form.resetFields();
    });
  };
 
  return (
    <Modal
      title={isEditing ? "Editar Cliente" : "Nuevo Cliente"}
      onCancel={() => {
        onClose();
        form.resetFields();
      }}
      onOk={handleOk}
      open={isOpen}
      okText={isEditing ? "Actualizar" : "Guardar"}
    >
      {contextHolder}
      <Form form={form} initialValues={clientToEdit}>
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
