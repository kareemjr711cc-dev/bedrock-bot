# Bedrock Player Bot — Static Creative Starter

This is a real Bedrock network client, not an Add-on/NPC. It connects using the Bedrock protocol and appears as a player connection on servers that allow offline clients.

## What it does

- Uses a real Bedrock client connection.
- Configurable player name.
- Configurable server IP/host and port.
- Targets Bedrock 1.26.40.
- Sends no movement/input.
- Sends no attacks, block breaking, jumping, or automatic chat.
- Stays at the server's spawn position unless the server itself moves/teleports it.
- `password` is intentionally not used: vanilla Bedrock does not have a username/password account system for offline clients.

## Important authentication note

`offline: true` is for servers configured to accept offline clients. It does NOT create a Microsoft/Xbox account.

If your server requires Microsoft/Xbox authentication, a real Microsoft account/device-code login is required. Do not put a Microsoft password in `config.json`.

## Creative mode

Creative mode is a server-side player permission/gamemode. This client does not fake a creative state. To make it Creative, set the bot's gamemode on your server after it joins, for example through your server's normal permissions/command system.

The bot itself sends no movement input, so it will not intentionally fly.

## Install

1. Install Node.js 24+.
2. Open this folder in a terminal.
3. Run:
   npm install
4. Edit `config.json`.
5. Run:
   npm start

Windows shortcut:
- Double-click `start.bat`.

## Config example

{
  "server": {
    "host": "127.0.0.1",
    "port": 19132,
    "version": "1.26.40"
  },
  "account": {
    "username": "AlgyarBot",
    "password": ""
  },
  "offline": true,
  "keepAlive": true
}

The password field is only a placeholder for future server-specific authentication; it is NOT a Minecraft/Microsoft password and is not sent anywhere.
