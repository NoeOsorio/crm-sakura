import { v4 as uuidv4 } from "uuid";

export default class Parent {
  constructor(id = null, creationDate = null) {
    if (id) {
      this.id = id;
      this.key = id;
    } else {
      const uuid = uuidv4();
      this.id = uuid;
      this.key = uuid;
    }

    if (creationDate) {
      this.creationDate = creationDate;
    } else {
      this.creationDate = new Date().toLocaleDateString();
    }
  }
}
