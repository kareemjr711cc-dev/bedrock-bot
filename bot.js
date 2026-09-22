const fs = require("fs");
const bedrock = require("bedrock-protocol");

const config = JSON.parse(fs.readFileSync("./config.json", "utf8"));

if (!config.offline) {
  console.error("This starter project is configured for OFFLINE Bedrock servers.");
  console.error("For Microsoft/Xbox-authenticated servers, use a real Microsoft account/device-code login instead of putting a password in this file.");
  process.exit(1);
}

const RETRY_DELAY_MS = 15000; // how long to wait between connection attempts
let client = null;
let stopping = false;

function connect() {
  if (stopping) return;

  console.log(`[BOT] Attempting to connect to ${config.server.host}:${config.server.port} ...`);

  client = bedrock.createClient({
    host: config.server.host,
    port: config.server.port,
    version: config.server.version,
    username: config.account.username,
    offline: true
  });

  client.on("join", () => {
    console.log(`[BOT] Joined ${config.server.host}:${config.server.port} as ${config.account.username}`);
  });

  client.on("spawn", () => {
    console.log("[BOT] Spawned. No movement/input will be sent.");
    console.log("[BOT] The bot will remain where the server spawns it.");
  });

  client.on("disconnect", (packet) => {
    console.log("[BOT] Disconnected:", packet);
  });

  client.on("close", () => {
    console.log("[BOT] Connection closed.");
    scheduleReconnect();
  });

  client.on("error", (err) => {
    console.error("[BOT] Error:", err?.message || err);
    // "close" will fire after "error" for most failures, which triggers the reconnect.
  });
}

function scheduleReconnect() {
  if (stopping) return;
  console.log(`[BOT] Server not reachable (probably still starting). Retrying in ${RETRY_DELAY_MS / 1000}s...`);
  setTimeout(connect, RETRY_DELAY_MS);
}

// Intentionally no movement packets, chat automation, attacks, block breaking,
// jumping, or camera input. The client simply stays connected as a player.
process.on("SIGINT", () => {
  console.log("\n[BOT] Stopping...");
  stopping = true;
  try { client?.disconnect("Bot stopped."); } catch {}
  process.exit(0);
});

connect();
