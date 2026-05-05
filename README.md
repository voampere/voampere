# ⚡ Volt Ampere — voampere.com

**أول منصة حسابات كهربائية عربية متخصصة**
للمهندسين والفنيين والطلاب في جميع الدول العربية.

---

## 📁 هيكل المشروع

```
voltampere/
│
├── index.html                  ← الصفحة الرئيسية
│
├── css/
│   ├── theme.css               ← متغيرات الألوان + وضع نهاري/مظلم
│   └── components.css          ← Nav, Footer, مكونات مشتركة
│
├── js/
│   ├── main.js                 ← Theme manager, nav, utilities
│   └── calculators.js          ← منطق جميع الحاسبات
│
├── assets/
│   ├── images/
│   │   └── logo.png            ← شعار كبير (500×500) للمشاركة
│   ├── icons/
│   │   ├── favicon.ico         ← أيقونة المتصفح (16/32/48px)
│   │   └── favicon.png         ← أيقونة PNG (100×100)
│   └── fonts/                  ← (محجوز للخطوط المحلية مستقبلاً)
│
├── calculators/                ← صفحة مستقلة لكل حاسبة
│   ├── ohm.html
│   ├── wire.html
│   ├── voltage-drop.html
│   ├── power.html
│   ├── cost.html
│   ├── resistor-color.html
│   ├── motor.html
│   ├── solar.html
│   ├── breaker.html
│   ├── pfc.html
│   ├── series-parallel.html
│   └── motor-start.html
│
└── pages/                      ← صفحات ثابتة
    ├── about.html
    └── contact.html
```

---

## 🚀 النشر على GitHub Pages

```bash
# 1. أنشئ مستودعاً جديداً على GitHub
git init
git add .
git commit -m "feat: initial Volt Ampere project"

# 2. ارفع إلى GitHub
git remote add origin https://github.com/USERNAME/voltampere.git
git push -u origin main

# 3. فعّل GitHub Pages
# Settings → Pages → Source: Deploy from branch → main / root
```

الموقع سيكون متاحاً على:
`https://USERNAME.github.io/voltampere/`

لاحقاً يمكن ربط النطاق المخصص `voampere.com` من إعدادات GitHub Pages.

---

## 🎨 الهوية البصرية

| العنصر | القيمة |
|--------|--------|
| اللون الأحمر | `#d42b1a` |
| اللون الأزرق | `#1560cc` |
| الخط الرئيسي | Cairo (Google Fonts) |
| الخط الثانوي | Tajawal (Google Fonts) |
| المعيار المعتمد | IEC 60364 |

---

## 📐 المعايير الكهربائية المعتمدة

- **IEC 60364** — التركيبات الكهربائية للمباني
- **IEC 60228** — موصلات الكابلات المعزولة
- **IEC 60947** — معدات التحكم والحماية

---

## 🗺 خارطة طريق التطوير

### المرحلة 1 — الإطلاق (الحالية)
- [x] الصفحة الرئيسية
- [x] 4 حاسبات رئيسية
- [x] وضع نهاري/مظلم
- [x] دعم 14 دولة عربية (تكلفة الكهرباء)

### المرحلة 2 — توسيع المحتوى
- [ ] 12 صفحة حاسبة مفصّلة مع شرح الصيغ
- [ ] صفحة "عن المنصة"
- [ ] نموذج تواصل

### المرحلة 3 — SEO والنمو
- [ ] sitemap.xml
- [ ] robots.txt
- [ ] Schema markup بالعربية

### المرحلة 4 — الترجمة
- [ ] واجهة إنجليزية (EN)
- [ ] واجهة فرنسية (FR)

### المرحلة 5 — الانتقال إلى React
- [ ] نقل المشروع إلى Vite + React
- [ ] نشر على Netlify/Vercel

---

*صُنع بعناية من مهندس لمهندسين — Volt Ampere 2025*
