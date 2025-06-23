# 🎯 Image to Polynomial Web App

แอปพลิเคชันเว็บสำหรับแปลงภาพเป็นสมการพหุนาม โดยใช้เทคนิค Computer Vision และ Machine Learning

![Demo](https://img.shields.io/badge/Demo-Live-brightgreen)
![Version](https://img.shields.io/badge/Version-2.0-blue)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-yellow)
![Bootstrap](https://img.shields.io/badge/Bootstrap-5.3-purple)

## ✨ ฟีเจอร์หลัก

### 🎨 UI/UX ที่สวยงาม
- **สีสันและ Gradient** ที่ทันสมัย
- **Animation และ Transition** ที่นุ่มนวล
- **Responsive Design** รองรับทุกอุปกรณ์
- **Modern Card Design** ที่เรียบหรู

### 📂 การรองรับไฟล์
- **รองรับเฉพาะ:** JPG, JPEG, PNG
- **ขนาดไฟล์:** สูงสุด 16MB
- **Drag & Drop** ที่ใช้งานง่าย
- **File Validation** ที่เข้มงวด

### 🔬 การประมวลผลภาพ
- **Edge Detection** ด้วยอัลกอริทึม Canny
- **Point Extraction** จากภาพขาวดำ
- **Polynomial Regression** หลายดีกรี (2-5)
- **Statistical Analysis** พร้อม R² Score และ RMSE

### 📊 การแสดงผลลัพธ์
- **Interactive Charts** ด้วย Chart.js
- **Real-time Progress** ที่แสดงขั้นตอนการทำงาน
- **Statistics Cards** ที่สวยงาม
- **Download Options:** JSON, CSV, TXT

## 🚀 การใช้งาน

### 1. เปิดแอปพลิเคชัน
```bash
# เปิดไฟล์ index.html ในเบราว์เซอร์
open index.html
```

### 2. อัปโหลดภาพ
- **ลาก & วาง** ไฟล์ลงในพื้นที่อัปโหลด
- **คลิกปุ่ม** "📁 เลือกไฟล์ภาพ"
- **ตรวจสอบ** รูปแบบไฟล์ (JPG/PNG เท่านั้น)

### 3. ตั้งค่าการวิเคราะห์
- **เลือกดีกรีพหุนาม** ที่ต้องการ (2-5)
- **ปรับความไว Edge Detection** ตามต้องการ
- **คลิก** "🔍 เริ่มวิเคราะห์ภาพ"

### 4. ดูผลลัพธ์
- **ดูสถิติ** ความแม่นยำของแต่ละดีกรี
- **ดูกราฟ** เปรียบเทียบพหุนาม
- **ดาวน์โหลด** ผลลัพธ์ในรูปแบบต่างๆ

## 🏗️ โครงสร้างโปรเจค

```
ImagetoPolynomialWebApp_JS/
├── 📄 index.html          # หน้าหลักของแอปพลิเคชัน
├── 💻 script.js           # JavaScript หลักทั้งหมด
├── 🎨 styles.css          # CSS สำหรับจัดแต่ง UI
├── 📦 package.json        # ข้อมูลโปรเจค
├── 📚 README.md           # เอกสารประกอบ
├── 🚫 .gitignore          # ไฟล์ที่ไม่ต้องการใน Git
└── 🧪 test_generator.html # เครื่องมือสร้างภาพทดสอบ
```

## 🛠️ เทคโนโลยีที่ใช้

### Frontend
- **💻 JavaScript ES6+** - ภาษาหลักในการพัฒนา
- **🎨 Bootstrap 5.3** - Framework สำหรับ UI
- **📊 Chart.js** - สำหรับสร้างกราฟ
- **🖼️ HTML5 Canvas** - สำหรับประมวลผลภาพ
- **✨ Font Awesome** - ไอคอนสวยงาม

### Computer Vision & ML
- **👁️ Edge Detection** - อัลกอริทึม Canny
- **🔍 Point Extraction** - สกัดจุดข้อมูลจากภาพ
- **📈 Polynomial Regression** - การถดถอยพหุนาม
- **📊 Statistical Analysis** - การวิเคราะห์ทางสถิติ

## ✅ ประเภทภาพที่เหมาะสม

- 📊 ภาพกราฟฟังก์ชันคณิตศาสตร์
- 〰️ ลายเส้นโค้งต่างๆ ที่ชัดเจน
- ⚫ ภาพขาวดำหรือ Grayscale
- ✏️ ภาพวาดเส้นทางหรือเส้นโค้ง
- 📈 กราฟจากหนังสือหรือเอกสาร

## ❌ ประเภทภาพที่ไม่เหมาะสม

- 🎨 ภาพสีที่ซับซ้อน (ควรแปลงเป็นขาวดำก่อน)
- 📷 ภาพถ่ายที่มี noise หรือเบลอ
- 🕸️ ภาพที่มีเส้นหลายเส้นซับซ้อนซ้อนทับกัน
- 🏞️ ภาพธรรมชาติที่ไม่มีเส้นหรือขอบชัดเจน
- 📝 ภาพข้อความหรือตัวอักษร

## 🎯 การปรับปรุงใหม่ (v2.0)

### 🎨 UI/UX Improvements
- ✅ Gradient backgrounds ที่สวยงาม
- ✅ Smooth animations และ transitions
- ✅ Better color scheme และ typography
- ✅ Enhanced card designs และ shadows
- ✅ Floating animations ใน Hero section

### 🔧 Functionality Updates
- ✅ File type restriction (JPG/PNG only)
- ✅ Fixed double file dialog bug
- ✅ Enhanced progress bar with animations
- ✅ Better error handling และ user feedback
- ✅ Improved accessibility (ARIA labels)

### 🎪 Visual Enhancements
- ✅ Emoji integration ในข้อความ
- ✅ Better icon usage
- ✅ Enhanced statistics cards
- ✅ Improved button designs
- ✅ Safari compatibility fixes

## 🔧 การติดตั้งและพัฒนา

### ความต้องการของระบบ
- เบราว์เซอร์สมัยใหม่ (Chrome, Firefox, Safari, Edge)
- JavaScript enabled
- ไม่ต้องการ Backend Server

### การเริ่มใช้งาน
1. **Clone repository**
   ```bash
   git clone [repository-url]
   cd ImagetoPolynomialWebApp_JS
   ```

2. **เปิดในเบราว์เซอร์**
   ```bash
   # ใช้ Live Server หรือเปิดไฟล์โดยตรง
   open index.html
   ```

3. **สำหรับการพัฒนา**
   ```bash
   # ใช้ VS Code Live Server extension
   # หรือ Python HTTP Server
   python -m http.server 8000
   ```

## 📈 ตัวอย่างการทำงาน

1. 📂 **อัปโหลดภาพ** - ลากไฟล์ PNG/JPG
2. ⚙️ **ตั้งค่า** - เลือกดีกรีพหุนาม 
3. 🔍 **วิเคราะห์** - รอให้ระบบประมวลผล
4. 📊 **ดูผลลัพธ์** - กราฟและสมการพหุนาม
5. 💾 **ดาวน์โหลด** - ในรูปแบบ JSON/CSV/TXT

## 🤝 การมีส่วนร่วม

ยินดีรับ Pull Requests สำหรับการปรับปรุง:
- 🐛 แก้ไข Bug fixes
- ✨ ฟีเจอร์ใหม่ New features  
- 📚 ปรับปรุงเอกสาร Documentation
- 🎨 การปรับปรุง UI/UX

## 📜 License

MIT License - ใช้งานได้อย่างอิสระ

## 👨‍💻 ผู้พัฒนา

พัฒนาโดย: GitHub Copilot
- ⚡ เทคโนโลยี AI ที่ล้ำสมัย
- 🎯 การปรับปรุงตามความต้องการผู้ใช้
- 💡 นวัตกรรมใหม่อย่างต่อเนื่อง

---

⭐ ถ้าชอบโปรเจคนี้ อย่าลืมกด Star นะ!
