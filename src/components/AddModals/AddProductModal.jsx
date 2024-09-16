import { Modal, Form, Input, InputNumber, message, Button } from "antd";
import { addProduct, updateProduct } from "../../services/products.service";

export default function ProductModal({ onClose, isOpen, productToEdit }) {
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();
  const isEditing = !!productToEdit;

  const handleOk = () => {
    form.validateFields().then(async (values) => {
     try {
      messageApi.open({
        type: 'loading',
        content: isEditing ? 'Actualizando producto...' : 'Guardando producto...',
        duration: 0,
      });
      
      if (isEditing) {
        await updateProduct({ ...productToEdit, ...values });
      } else {
        await addProduct(values);
      }

      messageApi.destroy();
      messageApi.open({
        type: 'success',
        content: isEditing
          ? `Producto ${values.name} actualizado correctamente`
          : `Producto ${values.name} guardado correctamente`,
      });
      onClose();
      form.resetFields();
     } catch (error) {
      messageApi.destroy();
      messageApi.open({
        type: 'error',
        content: error.message,
      });
     }
    }).catch((errorInfo) => {
      messageApi.destroy();
      console.log("Error al procesar el producto:", errorInfo);
      messageApi.open({
        type: 'error',
        content: 'Algo salió mal, por favor intente de nuevo',
      });
    });
  };
 
  return (
    <Modal
      title={isEditing ? "Editar Producto" : "Nuevo Producto"}
      onCancel={onClose}
      onOk={handleOk}
      open={isOpen}
      okText={isEditing ? "Actualizar" : "Guardar"}
    >
      {contextHolder}
      <Form form={form} initialValues={productToEdit} layout="vertical">
        <Form.Item
          name="name"
          label="Nombre"
          rules={[{ required: true, message: "Por favor ingrese el nombre" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="price"
          label="Precio"
          rules={[{ required: true, message: "Por favor ingrese el precio" }]}
        >
          <InputNumber
            controls={false}
            formatter={(value) =>
              `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            }
            parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
          />
        </Form.Item>
        <Form.Item
          name="description"
          label="Descripción"
          rules={[{ required: true, message: "Por favor ingrese la descripción" }]}
        >
          <Input.TextArea />
        </Form.Item>
        <Form.Item
          name="category"
          label="Categoría"
          rules={[{ required: true, message: "Por favor ingrese la categoría" }]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
}
