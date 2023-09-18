import { createClient } from "@libsql/client";

if (process.env.SYNC_URL === undefined) {
  throw new Error("SYNC_URL must be set");
}

if (process.env.AUTH_TOKEN === undefined) {
  throw new Error("AUTH_TOKEN must be set");
}

const client = createClient({
  url: "file:replica.db",
  syncUrl: process.env.SYNC_URL,
  authToken: process.env.AUTH_TOKEN,
});

const tx = await client.transaction("write");
console.log(await tx.execute("SELECT 1"));
await tx.commit();
