import { v4 as uuidv4 } from "uuid";

export default class Parent {
  constructor() {
    const uuid = uuidv4();
    this.id = uuid;
    this.key = uuid;
    this.fechaCreacion = new Date().toLocaleDateString();
  }
}
