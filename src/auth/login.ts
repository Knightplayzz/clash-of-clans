import { ClashOfClansClient } from "../client.js";
import { setAuthToken } from "./context.js";

/**
 * Validates an API token and initializes the legacy shared client.
 * @param token Your Clash of Clans API token.
 */
export async function login(token: string): Promise<void> {
  const client = new ClashOfClansClient(token);
  await client.labels.getPlayerLabels({ useCache: false });
  setAuthToken(token);
}
