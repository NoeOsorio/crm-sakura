import Parent from "./parent.model";

export default class Cliente extends Parent {
  constructor({name, age, address, email, phone}) {
    super();
    this.name = name;
    this.age = age;
    this.address = address;
    this.email = email;
    this.phone = phone;
  }

  static get columns() {
    return [
      {
        title: "Nombre",
        dataIndex: "name",
        key: "name",
      },
      {
        title: "Edad",
        dataIndex: "age",
        key: "age",
      },
      {
        title: "Dirección",
        dataIndex: "address",
        key: "address",
      },
      {
        title: "Correo",
        dataIndex: "email",
        key: "email",
      },
      {
        title: "Teléfono",
        dataIndex: "phone",
        key: "phone",
      },
    ];
  }

  validate() {
    if (!this.name) {
      throw new Error("Por favor ingrese el nombre del cliente");
    }
    if (!this.age) {
      throw new Error("Por favor ingrese la edad del cliente");
    }
    if (!this.email) {
      throw new Error("Por favor ingrese el correo electrónico del cliente");
    }
    if (!this.phone) {
      throw new Error("Por favor ingrese el teléfono del cliente");
    }

    return
  }
}
