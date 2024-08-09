import Parent from "./parent.model";

class Product extends Parent {
  constructor({name, price, description, category}) {
    super();
    this.name = name;
    this.price = price;
    this.description = description;
    this.category = category;
  }

  static get columns() {
    return [
      {
        title: "Nombre",
        dataIndex: "name",
        key: "name",
      },
      {
        title: "Precio",
        dataIndex: "price",
        key: "price",
      },
      {
        title: "Descripción",
        dataIndex: "description",
        key: "description",
      },
      {
        title: "Categoría",
        dataIndex: "category",
        key: "category",
      },
    ];
  }

  validate() {
    if (!this.name) {
      throw new Error("Por favor ingrese el nombre del producto");
    }
    if (!this.price) {
      throw new Error("Por favor ingrese el precio del producto");
    }
    if (!this.description) {
      throw new Error("Por favor ingrese la descripción del producto");
    }
    if (!this.category) {
      throw new Error("Por favor ingrese la categoría del producto");
    }
  }
}

export default Product;
