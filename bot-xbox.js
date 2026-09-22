const fs = require("fs");
const bedrock = require("bedrock-protocol");
const { Authenticator } = require("@xboxreplay/xboxlive-auth");

const config = JSON.parse(fs.readFileSync("./config.json", "utf8"));

if (config.offline) {
  console.error("❌ This bot is configured for offline mode.");
  console.error("❌ For Aternos official servers, set 'offline: false' in config.json");
  process.exit(1);
}

const RETRY_DELAY_MS = 15000;
let client = null;
let stopping = false;

async function authenticateWithXbox() {
  console.log("[AUTH] Starting Xbox authentication...");
  
  const authenticator = new Authenticator();
  
  try {
    // Get device code
    const deviceCode = await authenticator.getDeviceCode();
    console.log("\n🎮 Xbox Authentication Required:");
    console.log(`📱 Go to: ${deviceCode.verification_uri}`);
    console.log(`🔐 Enter code: ${deviceCode.user_code}`);
    console.log("⏱️  Waiting for confirmation (expires in 15 minutes)...\n");
    
    // Wait for user to authenticate
    const tokens = await authenticator.waitForAuth(deviceCode);
    
    console.log("✅ Xbox authentication successful!");
    console.log("[AUTH] Access token obtained\n");
    
    return tokens.access_token;
  } catch (error) {
    console.error("❌ Xbox authentication failed:", error.message);
    process.exit(1);
  }
}

async function connect(accessToken) {
  if (stopping) return;

  console.log(`[BOT] Attempting to connect to ${config.server.host}:${config.server.port} ...`);

  try {
    client = bedrock.createClient({
      host: config.server.host,
      port: config.server.port,
      version: config.server.version,
      username: config.account.username,
      offline: false,
      accessToken: accessToken
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
      scheduleReconnect(accessToken);
    });

    client.on("error", (err) => {
      console.error("[BOT] ❌ Error:", err?.message || err);
    });
  } catch (error) {
    console.error("[BOT] Connection error:", error.message);
    scheduleReconnect(accessToken);
  }
}

function scheduleReconnect(accessToken) {
  if (stopping) return;
  console.log(`[BOT] Retrying in ${RETRY_DELAY_MS / 1000}s...`);
  setTimeout(() => connect(accessToken), RETRY_DELAY_MS);
}

process.on("SIGINT", () => {
  console.log("\n[BOT] Stopping...");
  stopping = true;
  try { client?.disconnect("Bot stopped."); } catch {}
  process.exit(0);
});

// Start the bot
(async () => {
  const accessToken = await authenticateWithXbox();
  connect(accessToken);
})();
