const fs = require("fs");
const bedrock = require("bedrock-protocol");

const config = JSON.parse(fs.readFileSync("./config.json", "utf8"));

if (config.offline) {
  console.error("❌ This bot is configured for offline mode.");
  console.error("❌ For Aternos official servers, set 'offline: false' in config.json");
  process.exit(1);
}

const RETRY_DELAY_MS = 15000;
let client = null;
let stopping = false;

function connect() {
  if (stopping) return;

  console.log(`[BOT] Attempting to connect to ${config.server.host}:${config.server.port} ...`);
  console.log("[AUTH] If this is the first run, a Microsoft sign-in code will appear below.");

  try {
    client = bedrock.createClient({
      host: config.server.host,
      port: config.server.port,
      version: config.server.version,
      username: config.account.username,
      offline: false
      // bedrock-protocol handles the Xbox device-code login internally
      // and caches the tokens in ./node_modules/.cache (or the configured profilesFolder)
    });

    client.on("join", () => {
      console.log(`✅ [BOT] Joined ${config.server.host}:${config.server.port}`);
      console.log(`🎮 [BOT] Playing as: ${config.account.username}`);
    });

    client.on("spawn", () => {
      console.log("[BOT] ✨ Spawned successfully!");
      console.log("[BOT] Bot is now in the server (no movement will be sent)");
    });

    client.on("disconnect", (packet) => {
      console.log("[BOT] ⚠️  Disconnected:", packet?.reason || "Unknown reason");
    });

    client.on("close", () => {
      console.log("[BOT] Connection closed");
      scheduleReconnect();
    });

    client.on("error", (err) => {
      console.error("[BOT] ❌ Error:", err?.message || err);
    });
  } catch (error) {
    console.error("[BOT] Connection error:", error.message);
    scheduleReconnect();
  }
}

function scheduleReconnect() {
  if (stopping) return;
  console.log(`[BOT] Retrying in ${RETRY_DELAY_MS / 1000}s...`);
  setTimeout(connect, RETRY_DELAY_MS);
}

process.on("SIGINT", () => {
  console.log("\n[BOT] Stopping...");
  stopping = true;
  try { client?.disconnect("Bot stopped."); } catch {}
  process.exit(0);
});

// Start the bot
connect();
