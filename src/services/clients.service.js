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

export function updateClient(updatedClient) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        const existingClients = getClients();
        const index = existingClients.findIndex(client => client.id === updatedClient.id);
        
        if (index === -1) {
          reject(new Error("Cliente no encontrado"));
          return;
        }
        
        const clientToUpdate = new Cliente(updatedClient);
        clientToUpdate.validate();
        
        existingClients[index] = clientToUpdate;
        localStorage.setItem("clients", JSON.stringify(existingClients));
        resolve(clientToUpdate);
      } catch (error) {
        reject(error);
      }
    }, 2000);
  });
}

export function deleteClient(clientId) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        const existingClients = getClients();
        const index = existingClients.findIndex(client => client.id === clientId);
        
        if (index === -1) {
          reject(new Error("Cliente no encontrado"));
          return;
        }
        
        existingClients.splice(index, 1);
        localStorage.setItem("clients", JSON.stringify(existingClients));
        resolve();
      } catch (error) {
        reject(error);
      }
    }, 2000);
  });
}
