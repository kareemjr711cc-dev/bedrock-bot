# ⚡ Quick Start - الابتداء السريع

## 🎯 هدفك:
بوت Bedrock يدخل سيرفر Aternos الرسمي (يحتاج Xbox account)

---

## 🚀 الخطوات (5 دقايق)

### 1. التثبيت المحلي
```bash
npm install
```

### 2. التشغيل الأول
```bash
npm start
```

### 3. ستظهر رسالة:
```
🎮 Xbox Authentication Required:
📱 Go to: https://microsoft.com/devicelogin
🔐 Enter code: ABC1-2345
```

### 4. افتح الرابط، أدخل الـ code، وافق ✅

### 5. البوت بيدخل السيرفر تلقائياً 🎮

---

## 📋 الملفات اللي عدلنا

| ملف | التغيير |
|-----|--------|
| `bot-xbox.js` | ✨ جديد - يدعم Xbox auth |
| `config.json` | تم: `offline: false` |
| `package.json` | أضفنا: `@xboxreplay/xboxlive-auth` |

---

## 📡 Railway Deploy

### الخطوة الأولى:
```bash
# دوّر الملفات في GitHub
git add .
git commit -m "Xbox auth setup"
git push origin main
```

### الخطوة الثانية:
1. روح [railway.app](https://railway.app)
2. اضغط "New Project"
3. اختر "Deploy from GitHub"
4. اختر repo بتاعك ✅
5. Railway يبني ويشغّل تلقائياً

### الخطوة الثالثة:
```
Railway → Project → Logs
```
تفتح الـ logs وتشوف البوت يشتغل 👀

---

## 🔧 الـ Config

```json
{
  "server": {
    "host": "1234-zras.aternos.me",
    "port": 64049,
    "version": "1.26.40.8"
  },
  "account": {
    "username": "AlgyarBot"
  },
  "offline": false,    ← ⚠️ الأهم!
  "keepAlive": true
}
```

**المهم:** `offline: false` يخليه يستخدم Xbox

---

## ✅ How It Works

```
npm start
    ↓
اطلب Device Code من Microsoft
    ↓
عرض الرابط والـ code للمستخدم
    ↓
المستخدم يدخل الـ code في Microsoft login
    ↓
احصل على Access Token
    ↓
اتصل بـ Bedrock server بـ Token
    ↓
البوت دخل السيرفر ✨
```

---

## 📊 معلومات مهمة

### الحزم الجديدة:
- **bedrock-protocol:** اتصل بـ servers
- **@xboxreplay/xboxlive-auth:** Xbox device code auth

### لا حاجة لـ:
- ❌ Microsoft password
- ❌ Account credentials في الـ config
- ❌ API keys

### الأمان:
- ✅ Device code flow (safe)
- ✅ Microsoft handles auth
- ✅ Access tokens مؤقتة

---

## 🎮 على Aternos

بعد ما البوت يدخل:

```
/gamemode creative @s     ← Creative mode
/tp @a 0 64 0            ← Teleport لمكان معين
/list                    ← شوف Players
```

---

## 🐛 Errors الشائعة

### ❌ "offline: true" error
```
تأكد: config.json يحتوي "offline": false
```

### ❌ Bot doesn't connect
```
✓ السيرفر مشغل على Aternos؟
✓ الـ version 1.26.40.8؟
✓ الـ host و port صحيح؟
```

### ❌ Xbox auth timeout
```
✓ دخلت الـ code في 15 دقيقة؟
✓ استخدمت Microsoft account عادي؟
```

---

## 📱 Railway Link

بعد deploy:

```
https://railway.app/project/[YOUR_ID]
```

الـ project ID هتلاقيه في URL.

---

## 🎯 الخطوة الجاي

1. **ادفع لـ GitHub** `git push`
2. **ادخل Railway** واربطها بـ GitHub
3. **شاهد الـ logs** (بتشوف البوت يشتغل)
4. **استمتع!** 🎮

---

## 📞 Quick Reference

```bash
npm install         # تثبيت
npm start          # شغّل locally
npm start:offline  # النسخة القديمة (lol)
```

```
Railway Dashboard: https://railway.app
GitHub: https://github.com
Xbox Devicelogin: https://microsoft.com/devicelogin
```

---

**Done!** البوت بتاعك على الهواء 🚀
