import { ClashOfClansClient } from "../client.js";

let authToken: string | null = null;
let clientInstance: ClashOfClansClient | null = null;

export function setAuthToken(token: string): void {
  if (typeof token !== "string") throw new TypeError("authToken must be a string");
  authToken = token;
  clientInstance = new ClashOfClansClient(token);
}

export function getAuthToken(): string {
  if (!authToken) throw new Error("Auth token is not set. Please call login first.");
  return authToken;
}

export function getClient(): ClashOfClansClient {
  if (!clientInstance) throw new Error("Client not initialized. Please call login first.");
  return clientInstance;
}
