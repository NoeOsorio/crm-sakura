import Cliente from "../models/cliente.model";

export function getClients() {
  return localStorage.getItem("clients")
    ? JSON.parse(localStorage.getItem("clients"))
    : [];
}

export function addClient(client) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const newClient = new Cliente(client);
      try {
        newClient.validate();
      } catch (error) {
        reject(error);
      }
      // Guardar el nuevo cliente en localStorage
      const existingClients = getClients();
      existingClients.push(newClient);
      localStorage.setItem("clients", JSON.stringify(existingClients));
      resolve(newClient);
    }, 2000);
  });
}
