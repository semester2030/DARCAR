# نشر موقع دار كار

**هذا المستودع (جذر `package.json`) = مشروع دار كار فقط** — منفصل عن أي تطبيق آخر (مثل Flutter). انسخه أو ادفعه إلى GitHub كريبو مستقل؛ على Render اترك **Root Directory** فارغاً ما دام `render.yaml` و`package.json` في جذر الريبو.

الواجهة (`apps/web`) والـ API (`apps/api`) منفصلان. **HTTPS وDNS** تضبطان عند مزوّد الاستضافة (مثل Vercel للواجهة، وخادم يدعم TLS للـ API).

## 1) الواجهة — Vercel (مثال)

1. أنشئ مشروع Git وادفع الكود (جذر الريبو = هذا المشروع فقط).
2. في Vercel: **New Project** → اختر المستودع.
3. **Root Directory**: اتركه **فارغاً** (جذر الريبو يحتوي `package.json` و`apps/`).
4. **Build & Output**:
   - **Install Command**: `npm ci` (من جذر الريبو).
   - **Build Command**: `npm run build --workspace=@dar-car/web` أو `npm run build` لبناء الـ API ثم الويب حسب `package.json`.
   - **Output**: Next.js يُكتشف عندما يكون جذر المشروع يحتوي `apps/web` ضمن workspaces.
5. **متغيرات البيئة** (Production) — انسخ من `apps/web/.env.example` وأضف القيم الحقيقية:

| المتغير | الغرض |
|---------|--------|
| `NEXT_PUBLIC_SITE_URL` | رابط الموقع العام (للميتاداتا والروابط المطلقة إن استُخدمت). |
| `NEXT_PUBLIC_API_URL` | عنوان الـ API العام (للجلب من المتصفح عند `NEXT_PUBLIC_USE_HOME_API=true`). |
| `API_INTERNAL_URL` | عنوان الـ API من **خادم** Vercel (نفس العلن إن كان الـ API عاماً على HTTPS). يُستخدم لـ `/api/contact` و`/api/admin/home`. |
| `NEXT_PUBLIC_USE_HOME_API` | `true` إن أردت أن تعتمد الصفحة الرئيسية على `GET /v1/content/home` من الـ API. |
| `NEXT_PUBLIC_IOS_APP_STORE_URL` / `NEXT_PUBLIC_GOOGLE_PLAY_URL` | روابط المتاجر الفعلية بعد نشر التطبيق. |
| `ADMIN_PASSWORD` | كلمة مرور دخول `/admin/login`. |
| `ADMIN_SESSION_SECRET` | سر طويل (32+ بايت عشوائي) لتوقيع كعكة الجلسة. |
| `ADMIN_API_KEY` | **نفس** قيمة `ADMIN_API_KEY` في الـ API؛ يُرسل كـ Bearer من خادم Next فقط (لا تُباد `NEXT_PUBLIC_`). |

6. **DNS**: أنشئ سجل `CNAME` للدومين (مثل `www`) يشير إلى `cname.vercel-dns.com` كما يعرض Vercel، وسجّل الدومين في لوحة المشروع. Vercel يوفّر شهادة TLS تلقائياً.

## 2) الـ API — تخزين قابل للكتابة (مهم)

المسارات التالية **تكتب على نظام الملفات**:

- `PUT /v1/admin/home` → `data/home.v1.json`
- `POST /v1/contact` → `data/contact-inbox.jsonl` (أو `CONTACT_INBOX_PATH`)

**لا تضع الـ API على Vercel Serverless** بهذه الصيغة لأن نظام الملفات غير دائم بين الطلبات. الخيارات المناسبة:

- **حاوية** (Docker) على VPS أو Cloud Run مع قرص مُثبَّت، أو
- **Railway / Fly.io / Render** مع **Persistent Disk** يشير إلى مجلد يحتوي `data/`.

بعد النشر:

- عيّن `CORS_ORIGIN` ليشمل أصل الواجهة (`https://your-domain.com`)، ويمكن فصل عدة أصول بفاصلة.
- عيّن `ADMIN_API_KEY` (نفس الويب) لتمكين لوحة التحرير عبر الـ API.

## 3) HTTPS وDNS للـ API

- أمام الـ API ضع **Reverse proxy** (Caddy أو nginx) أو استخدم استضافة تمنح TLS تلقائياً.
- أنشئ `A`/`AAAA` أو `CNAME` لنطاق فرعي مثل `api.example.com` يشير إلى عنوان الخادم.
- تأكد أن `API_INTERNAL_URL` في Vercel يساوي `https://api.example.com` (بدون شرطة أخيرة).

## 4) التحقق المحلي

```bash
cd /path/to/this-repo   # جذر مستودع دار كار (حيث package.json)
# طرفية 1
npm run dev:api
# طرفية 2
npm run dev:web
```

- التواصل: أرسل النموذج في `/contact` وتأكد من ظهور سطر جديد في `data/contact-inbox.jsonl`.
- المحرر: افتح `/admin/login` بعد ضبط المتغيرات في `apps/web/.env.local` و`apps/api/.env`.

## 5) Render وResend — هل أحتاج الاثنين؟

**نعم، لأغراض مختلفة (ولا يحل أحدهما محل الآخر):**

| الخدمة | الدور |
|--------|--------|
| **Render** | استضافة **الكود**: الواجهة (Next) والـ API (Hono). يوفّر HTTPS و`PORT` والتشغيل المستمر. |
| **Resend** | إرسال **البريد** (إشعار عند نموذج التواصل، إلخ). Render لا يستبدل مزوّد بريد معتمد بذاته. |

يمكن أن يكون الحسابان **Team / مشتركان** كما في لوحتك: المهم أن تضع **مفتاح Resend** ومتغيرات الإرسال في **بيئة خدمة الـ API على Render فقط** (لا تُعرَّض في `NEXT_PUBLIC_*`).

### 5.1) تفعيل Resend في هذا المشروع

بعد إضافة دومين في Resend والتحقق من سجلات DNS، عيّن في **خدمة الـ API** (مثلاً على Render):

| المتغير | مثال |
|---------|--------|
| `RESEND_API_KEY` | المفتاح من لوحة Resend → API Keys |
| `RESEND_FROM` | مرسل معتمد، مثل `Dar Car <noreply@yourdomain.com>` |
| `CONTACT_NOTIFY_TO` | من يستلم الإشعار، بريد واحد أو عدة بروز مفصولة بفاصلة |

عند اكتمال الثلاثة، يحفظ الـ API الرسالة في `contact-inbox.jsonl` **ثم** يحاول إرسال بريد عبر Resend (مع `reply_to` = بريد الزائر لتسهيل الرد). إذا فشل Resend يُسجَّل الخطأ في السجلات ولا يزال الطلب ناجحاً إن نجح الحفظ في الملف.

للتجربة السريعة يمكن استخدام عنوان Resend التجريبي إن كان مفعّلاً في حسابك؛ للإنتاج استخدم دومينك المتحقق منه في **Add domain**.

---

## 6) نشر على Render (حساب أو **Team** مشترك)

يمكنك تشغيل **خدمتين منفصلتين** من نفس المستودع على نفس الـ Workspace في Render (مثلاً أنت وزملاؤكم تستخدمون نفس الفوترة/الفريق). كل خدمة لها **متغيرات بيئة** و**رابط HTTPS** خاص (`*.onrender.com` أو دومينكم).

### 6.1) إعداد المستودع على Render

1. **New** → **Blueprint** (يستخدم `render.yaml` في جذر الريبو) **أو** **Web Service** مرتين يدوياً.
2. **Root Directory**: اتركه **فارغاً** لهذا المشروع المعزول. (إن كان دار كار ما زال مجلداً داخل ريبو أكبر مثل `mastermax/`، عندها فقط عيّن `dar_car_marketing` كـ Root Directory — ليس حالة الريبو المعزول.)

### 6.2) خدمة الـ API (`apps/api`)

| الحقل | قيمة مقترحة |
|--------|-------------|
| **Runtime** | Node |
| **Build Command** | `npm ci && npm run build --workspace=@dar-car/api` |
| **Start Command** | `npm run start --workspace=@dar-car/api` |
| **Instance** | أي خطة تدعم تشغيل Node باستمرار |

**متغيرات بيئة (Environment):**

| المتغير | ملاحظة |
|---------|--------|
| `PORT` | يضبطه Render تلقائياً — لا تغيّره يدوياً. |
| `CORS_ORIGIN` | ضع رابط الواجهة العام، مثل `https://dar-car-web.onrender.com` أو دومينكم، ويمكن أكثر من أصل مفصولين بفاصلة إن لزم. |
| `ADMIN_API_KEY` | نفس القيمة في خدمة الويب (سري). |
| `HOME_PAGE_JSON_PATH` | **إن فعّلت قرصاً دائماً** (انظر 6.4)، مثلاً `/data/home.v1.json`. |
| `CONTACT_INBOX_PATH` | مع القرص الدائم، مثلاً `/data/contact-inbox.jsonl`. |
| `RESEND_API_KEY` / `RESEND_FROM` / `CONTACT_NOTIFY_TO` | اختياري — إشعار بريد عبر Resend (انظر القسم 5). |

### 6.3) خدمة الويب (`apps/web`)

| الحقل | قيمة مقترحة |
|--------|-------------|
| **Build Command** | `npm ci && npm run build --workspace=@dar-car/web` |
| **Start Command** | `npm run start --workspace=@dar-car/web` |

`npm run start` للويب يستخدم `PORT` من Render (`${PORT:-3000}` في السكربت) ويستمع على `0.0.0.0`.

**متغيرات بيئة:**

| المتغير | ملاحظة |
|---------|--------|
| `NEXT_PUBLIC_SITE_URL` | الرابط العام للواجهة (مثل `https://…onrender.com`). |
| `NEXT_PUBLIC_API_URL` | رابط خدمة الـ API العامة (نفس ما يظهر في Render بعد النشر). |
| `API_INTERNAL_URL` | غالباً **نفس** `NEXT_PUBLIC_API_URL` (الاتصال من خادم Next إلى الـ API). |
| `NEXT_PUBLIC_USE_HOME_API` | ضع `true` إن أردت جلب الصفحة الرئيسية من الـ API. |
| `ADMIN_PASSWORD` / `ADMIN_SESSION_SECRET` / `ADMIN_API_KEY` | كما في جدول Vercel أعلاه. |

بعد نشر الـ API انسخ **Public URL** (`https://dar-car-api.onrender.com`) وضعه في `NEXT_PUBLIC_API_URL` و`API_INTERNAL_URL` للويب، ثم أعد نشر الويب أو **Clear build cache & deploy** إن لزم.

### 6.4) القرص الدائم (Disk) على Render — مهم للمحتوى والتواصل

بدون قرص دائم، ملفات `data/` تُفقد عند إعادة النشر أو إعادة تشغيل الحاوية.

1. في خدمة الـ API: **Disks** → **Add Disk**، مثلاً **Mount Path** = `/data`، وحجم مناسب.
2. عيّن:
   - `HOME_PAGE_JSON_PATH=/data/home.v1.json`
   - `CONTACT_INBOX_PATH=/data/contact-inbox.jsonl`
3. **مرة واحدة** بعد أول نشر ناجح، انسخ الملف الافتراضي للقرص (عبر **Shell** في Render أو نشر مؤقت بأمر):

   ```bash
   mkdir -p /data && test -f /data/home.v1.json || cp data/home.v1.json /data/home.v1.json
   ```

   (ينفَّذ من جذر المشروع داخل الحاوية حيث يوجد مجلد `data/` القادم من البناء.)

### 6.5) مشاركة الـ Team على Render

- ادعُ الزملاء من **Team Settings** → **Members**؛ الصلاحيات تتحكم بمن يضيف خدمات أو يرى الأسرار.
- استخدم **Environment Groups** إن أردتم إعادة استخدام نفس المتغيرات بين عدة خدمات (مثل مفاتيح مشتركة للتجربة فقط — في الإنتاج فضّل أسراراً منفصلة لكل بيئة).

### 6.6) دومين وHTTPS مخصص

في كل خدمة: **Settings** → **Custom Domains** → أضف السجل الذي يعرضه Render (`CNAME` إلى `…onrender.com`). الشهادة TLS تُدار تلقائياً.

---

**ملخص:** على Render المشترك أنشئ **Web Service** للـ API مع **Disk** + متغيرات المسارات، و**Web Service** للواجهة مع ربط `NEXT_PUBLIC_API_URL` و`API_INTERNAL_URL` و`CORS_ORIGIN`. أضف مفاتيح **Resend** على خدمة الـ API إن أردت إشعاراً بريدياً لنموذج التواصل.

---

## 7) ريبو معزول على GitHub + Render (Blueprint)

1. أنشئ ريبو جديداً على GitHub (مثلاً `dar-car`) **فارغاً** بدون README إن رغبت.
2. من جهازك داخل **جذر هذا المشروع** (المجلد الذي فيه `package.json` و`render.yaml`). إن لم يكن `git init` قد نُفّذ من قبل:

```bash
git init
git add -A
git commit -m "Dar Car: isolated repository"
```

3. اربط الأصل وادفع:

```bash
git remote add origin git@github.com:YOUR_USER/dar-car.git
git branch -M main
git push -u origin main
```

4. في Render: داخل مشروعك (مثل **DarCar**) → **New** → **Blueprint** → اربط نفس الريبو والفرع `main` → Render يقرأ `render.yaml` وينشئ `dar-car-api` و`dar-car-web`.
5. عند أول تشغيل للـ Blueprint، عيّن القيم التي طلبها Render (مثل `ADMIN_PASSWORD`، ومفاتيح Resend إن ظهرت).
6. بعد أول نشر للـ API، من **Shell** على خدمة الـ API:

```bash
mkdir -p /data && test -f /data/home.v1.json || cp data/home.v1.json /data/home.v1.json
```

7. إذا غيّرت **أسماء الخدمات** على Render، فستتغير روابط `*.onrender.com` — حدّث يدوياً في لوحة الخدمات: `CORS_ORIGIN`، `NEXT_PUBLIC_SITE_URL`، `NEXT_PUBLIC_API_URL`، `API_INTERNAL_URL` لتطابق الروابط الفعلية (أو عدّل `render.yaml` وأعد المزامنة).

### دومين مخصص (اختياري)

في **dar-car-web**: **Custom Domains** → أضف الدومين واتبع تعليمات DNS. ثم حدّث `NEXT_PUBLIC_SITE_URL` و`CORS_ORIGIN` على الـ API ليشملا الدومين الجديد.

### تحقق سريع

- الواجهة العامة، `/contact`، `/admin/login` بعد ضبط الأسرار كما في الأقسام أعلاه.
