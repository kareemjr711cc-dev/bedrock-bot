# Railway Setup Guide - دليل الربط مع Railway

## الخطوات التفصيلية

### 1️⃣ إعداد الـ GitHub Repository

```bash
# إذا لم تكن قد إنشأت repo بعد
git init
git add .
git commit -m "Initial commit: Xbox authenticated Bedrock bot"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/bedrock-bot.git
git push -u origin main
```

---

### 2️⃣ Railway Account Setup

1. **اذهب إلى** [railway.app](https://railway.app)
2. **سجّل دخول** أو أنشئ حساب
3. **اضغط** "New Project"

---

### 3️⃣ ربط GitHub Repository

1. **اختر** "Deploy from GitHub"
2. **صرّح Railway** بالوصول إلى GitHub
   - وافق على الـ OAuth permissions
3. **اختر repository:**
   - ابحث عن `bedrock-bot`
   - اختر `main` branch

---

### 4️⃣ Build Configuration

Railway سيكتشف `Dockerfile` تلقائياً ✅

**في الـ Project Settings:**

```
Build Command: (leave empty - Docker handles it)
Start Command: npm start
Publish Port: Not needed (bot connects outbound)
```

---

### 5️⃣ إعدادات متقدمة (اختياري)

#### إعادة المحاولة التلقائية:

```yaml
# في railway.json (موجود بالفعل)
{
  "deploy": {
    "restartPolicyMaxRetries": 5
  }
}
```

#### عرض الـ Logs:

```
Railway Dashboard → Select Project → Logs
```

---

## 📊 Deployment Flow

```
GitHub Push
    ↓
GitHub Actions Webhook
    ↓
Railway receives deployment
    ↓
Build Docker Image
    ↓
Run npm start
    ↓
Bot connects to Aternos
    ↓
Logs appear in Railway Dashboard
```

---

## 🔐 GitHub Actions + Railway Integration

### إعداد تلقائي:

إذا أردت automated deployment عند كل push:

1. **روح** Settings → Secrets and variables → Actions
2. **أضف:**
   - `RAILWAY_TOKEN` → من Railway API
   - `RAILWAY_PROJECT_ID` → من Railway project

3. **الملف موجود بالفعل:** `.github-railway-deploy.yml`

---

## 🚀 Deployment Checklist

- [ ] GitHub repo مُنشأ ومرفوع
- [ ] Railway account موجود
- [ ] GitHub connected في Railway
- [ ] Dockerfile موجود في repo
- [ ] config.json آخر تحديث
- [ ] package.json يحتوي dependencies الصحيحة
- [ ] bot-xbox.js موجود

---

## 📍 أين تجد الـ Logs والـ Status؟

### Railway Dashboard:

```
1. اذهب إلى Railway.app
2. اختر الـ project
3. اختر service
4. اضغط "Logs" tab
```

### الأوامر المهمة:

```bash
# مشاهدة deployment history
railway logs --service <service-name>

# محطة مباشرة مع Railway CLI
railway shell
```

---

## 🐛 استكشاف الأخطاء الشائعة

### Error: "Dockerfile not found"
**الحل:** تأكد أن الملف اسمه `Dockerfile` بدون امتداد

### Error: "npm: not found"
**الحل:** Railway يجب يستخدم Node image، تحقق من Dockerfile

### Bot doesn't connect after deploy
1. تحقق الـ config.json صحيح
2. شاهد الـ logs في Railway
3. تأكد Aternos server مشغل

### Logs مش ظاهرة
```
Railway → Logs → View Build & Deployment Logs
```

---

## 💾 الملفات المهمة للـ Railway:

```
project-root/
├── Dockerfile           ← البناء
├── package.json         ← Dependencies
├── bot-xbox.js          ← الكود الرئيسي
├── config.json          ← الإعدادات
├── railway.json         ← Railway config
└── .gitignore           ← لا تنشر node_modules
```

---

## 🎯 After First Deployment

### 1. تابع الـ Logs:
```
راقب الـ output حتى تشوف:
✅ Xbox authentication successful!
✅ Joined server
```

### 2. تحقق من الـ CPU/Memory:
```
Railway Dashboard → Logs → Metrics
```

### 3. أوقف/أبدأ Service:
```
Railway Dashboard → Select Service → More Options → Restart
```

---

## 📱 الـ Railway Link المتوقع:

```
https://railway.app/project/xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
```

الـ project ID يكون موجود في URL بعد ما تفتح project.

---

## 🔄 Continuous Deployment (CD)

عند كل push لـ `main`:

```
✅ GitHub detects push
✅ Railway webhook fires
✅ Auto rebuild + redeploy
✅ Bot starts with new code
```

No manual deploy needed!

---

## ⚙️ config.json على Railway

اختيارات:

### الخيار 1: Commit مع الـ Code
```json
// config.json في repo
// ✅ سهل لـ development
// ⚠️ IP الـ server ظاهر على GitHub
```

### الخيار 2: Environment Variables
```bash
# Railway → Project → Variables
BEDROCK_HOST=1234-zras.aternos.me
BEDROCK_PORT=64049
BEDROCK_VERSION=1.26.40.8
BOT_USERNAME=AlgyarBot
```

ثم في الكود:
```javascript
const config = {
  server: {
    host: process.env.BEDROCK_HOST,
    port: process.env.BEDROCK_PORT,
    version: process.env.BEDROCK_VERSION
  },
  account: {
    username: process.env.BOT_USERNAME
  },
  offline: false
};
```

**التوصية:** استخدم Environment Variables 🔐

---

## 📞 Support

### Railway Issues:
- Railway Docs: https://docs.railway.app
- Railway Support: support@railway.app

### Bot Issues:
- Check logs carefully
- تأكد Node.js version
- اتجنب offline mode ❌

---

## ✅ Success Check

عند النجاح تشوف:

```
[Railway] Container started
npm start
[AUTH] Starting Xbox authentication...
[AUTH] Access token obtained
[BOT] Attempting to connect to 1234-zras.aternos.me:64049 ...
✅ [BOT] Joined 1234-zras.aternos.me:64049
🎮 [BOT] Playing as: AlgyarBot
[BOT] ✨ Spawned successfully!
```

الـ Bot بقا online! 🎮

---

يلا لـ deployment! 🚀
