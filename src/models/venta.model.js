import Parent from "./parent.model";
import moment from "moment";
import { Tag } from "antd";
import { getClients } from "../services/clients.service";

export class Venta extends Parent {
  constructor({
    cliente,
    productos,
    total,
    fechaInicio,
    fechaPago,
    pagado,
    entregado,
  }) {
    super();
    this.cliente = cliente;
    this.productos = productos;
    this.total = total;
    this.fechaInicio = fechaInicio;
    this.fechaPago = fechaPago;
    this.pagado = pagado;
    this.entregado = entregado;

  }

  static get columns() {
    const clientes = getClients();
    return [
      {
        title: "Cliente",
        dataIndex: "cliente", // Asumiendo que en tu data la clave es clienteId
        key: "cliente",
        render: (clienteId) => {
          console.log(clienteId);
          console.log(clientes);
          const cliente = clientes.find(c => c.id === clienteId);
          return cliente ? cliente.name : "Desconocido";
        },
      },
      // {
      //   title: "Productos",
      //   dataIndex: "productos",
      //   key: "productos",
      // },
      {
        title: "Total",
        dataIndex: "total",
        key: "total",
        render: (text) => `$ ${text.toLocaleString()}`,
      },
      {
        title: "Fecha de Inicio",
        dataIndex: "fechaInicio",
        key: "fechaInicio",
        render: (text) => text ?  moment(text).format("DD/MM/YYYY") : "",
      },
      {
        title: "Fecha de Pago",
        dataIndex: "fechaPago",
        key: "fechaPago",
        render: (text) => text ?  moment(text).format("DD/MM/YYYY"): "",
      },
      {
        title: "Fecha de Creación",
        dataIndex: "fechaCreacion",
        key: "fechaCreacion",
        render: (text) => text ? moment(text).format("DD/MM/YYYY") : "",
      },
      {
        title: "Pagado",
        dataIndex: "pagado",
        key: "pagado",
        render: (paid) =>
          paid ? (
            <Tag color="green">Sí</Tag>
          ) : (
            <Tag color="red">No</Tag>
          ),
      },
      {
        title: "Entregado",
        dataIndex: "entregado",
        key: "entregado",
        render: (delivered) =>
          delivered ? (
            <Tag color="green">Sí</Tag>
          ) : (
            <Tag color="red">No</Tag>
          ),
      },
    ];
  }

  validate() {
    if (!this.cliente) {
      throw new Error("El cliente es requerido");
    }
    if (!this.productos) {
      throw new Error("Los productos son requeridos");
    }
    if (!this.total) {
      throw new Error("El total es requerido");
    }
  }
}
