const clients = new Map();

export function addClient(clientId, res) {
  clients.set(clientId, res);
}

export function removeClient(clientId) {
  clients.delete(clientId);
}

export function sendEvent(clientId, event) {
  const client = clients.get(clientId);

  if (!client) return;

  client.write(`data: ${JSON.stringify(event)}\n\n`);
}