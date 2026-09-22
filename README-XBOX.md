# Minecraft Bedrock Bot - Xbox Authentication Edition

بوت Minecraft Bedrock محدث يدعم Microsoft/Xbox authentication للاتصال بسيرفرات Aternos الرسمية.

## ⚙️ الفروقات من النسخة السابقة

| ميزة | Offline | Xbox |
|------|---------|------|
| **المصادقة** | بدون | Microsoft/Xbox |
| **سيرفرات محلية** | ✅ | ❌ |
| **Aternos رسمي** | ❌ | ✅ |
| **سيرفرات Java** | ❌ | ❌ |

---

## 🚀 التثبيت المحلي

### المتطلبات
- **Node.js 24+**
- **حساب Microsoft** (أي حساب Microsoft عام)

### الخطوات

1. **استنسخ أو حمل الملفات:**
   ```bash
   git clone <your-repo>
   cd bedrock-bot
   ```

2. **ثبّت الـ dependencies:**
   ```bash
   npm install
   ```

3. **عدّل الإعدادات** (اختياري):
   ```json
   // config.json
   {
     "server": {
       "host": "1234-zras.aternos.me",
       "port": 64049,
       "version": "1.26.40.8"
     },
     "account": {
       "username": "AlgyarBot"
     },
     "offline": false,
     "keepAlive": true
   }
   ```

4. **شغّل البوت:**
   ```bash
   npm start
   ```

5. **عند التشغيل:**
   - سيظهر لك رابط Microsoft
   - روح على الرابط وأدخل الـ code المعروض
   - وافق على الـ permissions
   - البوت سيتصل تلقائياً

---

## 🎮 شرح عملية Xbox Authentication

### الخطوات التقنية:

1. **Device Code Request**
   ```
   POST https://login.microsoftonline.com/consumers/oauth2/v2.0/devicecode
   ```

2. **عرض الـ Code للمستخدم**
   ```
   🎮 Xbox Authentication Required:
   📱 Go to: https://microsoft.com/devicelogin
   🔐 Enter code: XXXX-XXXX-XXXX
   ```

3. **الانتظار حتى الموافقة** (15 دقيقة max)

4. **الحصول على Access Token**
   ```
   POST https://login.microsoftonline.com/consumers/oauth2/v2.0/token
   ```

5. **الاتصال بـ Bedrock Server**

---

## 📡 Railway Deployment

### الإعداد السريع:

1. **ادفع الملفات لـ GitHub**
   ```bash
   git push origin main
   ```

2. **روح railway.app**
   - اتسجل/اتسجل دخول
   - اضغط "New Project"
   - اختر "Deploy from GitHub"
   - اختر الـ repository بتاعك

3. **الإعدادات:**
   - **Build Command:** تلقائي (Dockerfile)
   - **Start Command:** `npm start`
   - **Ports:** لا حاجة (bot يتصل outbound فقط)

4. **الـ Logs:**
   ```
   ✅ Railway → Settings → Logs
   ```

---

## 🔧 ملفات البوت المهمة

### `bot-xbox.js`
- الملف الرئيسي للبوت
- يدعم Xbox authentication
- إعادة محاولة تلقائية عند قطع الاتصال

### `config.json`
```json
{
  "server": {
    "host": "your-aternos-host.aternos.me",
    "port": 64049,
    "version": "1.26.40.8"
  },
  "account": {
    "username": "BotName"
  },
  "offline": false,
  "keepAlive": true
}
```

**أهم تغيير:** `"offline": false`

### `Dockerfile`
- للـ Railway deployment
- استخدم alpine image للحجم الأصغر

---

## 📋 Aternos Server Setup

بعد ما يدخل البوت السيرفر:

1. **تغيير Gamemode (اختياري):**
   ```
   /gamemode creative @s
   ```

2. **Teleport لمكان معين (اختياري):**
   ```
   /tp @a x y z
   ```

3. **Status Check:**
   ```
   /list
   ```

---

## ⚠️ مهم: الأمان

### ✅ آمن:
- Device code flow (user-driven authentication)
- لا passwords في الـ config
- Access tokens مؤقتة (تنتهي الصلاحية)
- Microsoft handles sensitive data

### ❌ غير آمن:
- ❌ وضع Microsoft password في الملفات
- ❌ نشر access tokens على GitHub
- ❌ استخدام حساب شخصي important

**التوصية:** استخدم حساب Microsoft منفصل للبوتات

---

## 🐛 Troubleshooting

### "offline: true" error
```
❌ This bot is configured for offline mode.
```
**الحل:** تأكد أن `config.json` يحتوي `"offline": false`

### Connection timeout
```
[BOT] ⚠️ Disconnected: Connection timed out
```
**الحل:** 
- تأكد السيرفر مشغل على Aternos
- الـ version match (1.26.40.8)

### Xbox authentication fails
```
❌ Xbox authentication failed: ...
```
**الحل:**
- استخدم حساب Microsoft عادي (ليس تجاري)
- لو لم تتصل في 15 دقيقة، ابدأ من جديد
- جرّب في متصفح مختلف

---

## 📊 مثال Output عند النجاح

```
[AUTH] Starting Xbox authentication...

🎮 Xbox Authentication Required:
📱 Go to: https://microsoft.com/devicelogin
🔐 Enter code: ABC1-2345
⏱️  Waiting for confirmation (expires in 15 minutes)...

✅ Xbox authentication successful!
[AUTH] Access token obtained

[BOT] Attempting to connect to 1234-zras.aternos.me:64049 ...
✅ [BOT] Joined 1234-zras.aternos.me:64049
🎮 [BOT] Playing as: AlgyarBot
[BOT] ✨ Spawned successfully!
[BOT] Bot is now in the server (no movement will be sent)
```

---

## 📦 Dependencies

- **bedrock-protocol:** ^3.60.0 - Bedrock protocol client
- **@xboxreplay/xboxlive-auth:** ^2.3.0 - Xbox device code auth

---

## 📝 لينك Railway:

بعد ما تدوّر project على Railway:

```
https://railway.app/project/[YOUR_PROJECT_ID]
```

الـ logs والـ deploys تكون في:
```
Project → Logs → View Build & Deployment Logs
```

---

## ✨ Features

- ✅ Xbox/Microsoft authentication
- ✅ Auto-reconnect على قطع الاتصال
- ✅ معايرة الـ username
- ✅ Docker support (Railway compatible)
- ✅ Graceful shutdown (CTRL+C)
- ✅ Detailed logging

---

## 🎯 Next Steps

1. ادفع الكود لـ GitHub
2. اتصل بـ Railway
3. Deploy من GitHub repo
4. تابع الـ logs
5. جرّب الاتصال بـ Aternos

استفسارات؟ Check the logs! 📊
