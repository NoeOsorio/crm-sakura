import Parent from "./parent.model";

export class Venta extends Parent {
  constructor({
    cliente,
    productos,
    total,
    fechaInicio,
    fechaPago,
    fechaCreacion,
    pagado,
    entregado,
  }) {
    super();
    this.cliente = cliente;
    this.productos = productos;
    this.total = total;
    this.fechaInicio = fechaInicio;
    this.fechaPago = fechaPago;
    this.fechaCreacion = fechaCreacion;
    this.pagado = pagado;
    this.entregado = entregado;

  }

  static get columns() {
    return [
      {
        title: "Cliente",
        dataIndex: "cliente",
        key: "cliente",
      },
      {
        title: "Productos",
        dataIndex: "productos",
        key: "productos",
      },
      {
        title: "Total",
        dataIndex: "total",
        key: "total",
      },
      {
        title: "Fecha de Inicio",
        dataIndex: "fechaInicio",
        key: "fechaInicio",
      },
      {
        title: "Fecha de Pago",
        dataIndex: "fechaPago",
        key: "fechaPago",
      },
      {
        title: "Fecha de Creación",
        dataIndex: "fechaCreacion",
        key: "fechaCreacion",
      },
      {
        title: "Pagado",
        dataIndex: "pagado",
        key: "pagado",
      },
      {
        title: "Entregado",
        dataIndex: "entregado",
        key: "entregado",
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
    if (!this.pagado) {
      throw new Error("El campo pagado es requerido");
    }
    if (!this.fechaInicio) {
      throw new Error("La fecha de inicio es requerida");
    }
    if (this.pagado && !this.fechaPago) {
      throw new Error("La fecha de pago es requerida");
    }
    if (!this.fechaCreacion) {
      throw new Error("La fecha de creación es requerida");
    }
    if (!this.entregado) {
      throw new Error("El campo entregado es requerido");
    }
  }
}
