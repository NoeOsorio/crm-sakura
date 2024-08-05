import { v4 as uuidv4 } from "uuid";

export function getClients() {
  return localStorage.getItem("clients")
    ? JSON.parse(localStorage.getItem("clients"))
    : [];
}

export function addClient(client) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const uuid = uuidv4(); // Genera un UUID único para cada cliente
      const newClient = {
        id: uuid,
        key: uuid,
        name: client.name,
        age: client.age,
        address: client.address,
        email: client.email,
        phone: client.phone,
      };

      // Guardar el nuevo cliente en localStorage
      const existingClients = getClients();
      existingClients.push(newClient);
      localStorage.setItem("clients", JSON.stringify(existingClients));
      resolve(newClient);
    }, 2000);
  });
}
