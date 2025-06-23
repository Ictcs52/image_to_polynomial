# 🎯 Image to Polynomial Web App (JavaScript Version)

แอปพลิเคชันเว็บแบบ Single Page Application สำหรับแปลงภาพขาวดำหรือลายเส้นเป็นสมการพหุนาม โดยใช้ JavaScript, Bootstrap และเทคนิค Computer Vision

## ✨ คุณสมบัติ

- 🖼️ **อัปโหลดภาพ**: รองรับไฟล์ .jpg, .png, .bmp, .tiff
- 🎯 **การตรวจหาขอบ**: ใช้ Canny Edge Detection Algorithm
- 📊 **วิเคราะห์พหุนาม**: ทดสอบหลายดีกรี (2-5) พร้อมเปรียบเทียบ
- 📈 **แสดงผลกราฟ**: กราฟเปรียบเทียบแบบ Interactive
- 💾 **ส่งออกผลลัพธ์**: ดาวน์โหลดไฟล์ JSON, CSV, TXT
- 📱 **Responsive Design**: ใช้งานได้ทั้งคอมพิวเตอร์และมือถือ
- ⚡ **No Backend Required**: ทำงานแบบ Client-side ทั้งหมด

## 🚀 การติดตั้งและใช้งาน

### วิธีที่ 1: เปิดไฟล์โดยตรง
```bash
# เปิดไฟล์ index.html ด้วยเว็บเบราว์เซอร์
open index.html
```

### วิธีที่ 2: ใช้ Live Server (แนะนำ)
```bash
# ติดตั้ง dependencies
npm install

# รันเซิร์ฟเวอร์
npm start
```

### วิธีที่ 3: ใช้ Python HTTP Server
```bash
# Python 3
python -m http.server 3000

# หรือ Python 2
python -m SimpleHTTPServer 3000
```

จากนั้นเปิดเว็บเบราว์เซอร์ไปที่ `http://localhost:3000`

## 🎨 วิธีการใช้งาน

1. **อัปโหลดภาพ**: ลากและวางไฟล์ภาพ หรือคลิกเลือกไฟล์
2. **เลือกการตั้งค่า**: 
   - เลือกดีกรีพหุนามที่ต้องการทดสอบ (2-5)
   - ปรับความไว Edge Detection
3. **เริ่มวิเคราะห์**: กดปุ่ม "เริ่มวิเคราะห์" และรอผลลัพธ์
4. **ดูผลลัพธ์**: ดูกราฟ, สถิติ และสมการพหุนาม
5. **ดาวน์โหลด**: ดาวน์โหลดผลลัพธ์ในรูปแบบ JSON, CSV หรือ TXT

## 📁 โครงสร้างโปรเจค

```
📦 ImagetoPolynomialWebApp_JS
├── 📄 index.html              # หน้าเว็บหลัก
├── 📄 styles.css             # CSS สำหรับการตกแต่ง
├── 📄 script.js              # JavaScript หลัก
├── 📄 package.json           # ข้อมูลโปรเจคและ dependencies
├── 📄 README.md              # เอกสารคำแนะนำ
└── 📄 .gitignore             # ไฟล์ที่ไม่ต้องการใน Git
```

## 🔧 เทคโนโลยีที่ใช้

### Frontend
- **HTML5**: โครงสร้างหน้าเว็บ และ Canvas API
- **CSS3**: การตกแต่งและ Responsive Design
- **JavaScript (ES6+)**: Logic หลักและการประมวลผล
- **Bootstrap 5**: UI Framework
- **Chart.js**: การแสดงผลกราฟ
- **Font Awesome**: Icons

### Computer Vision & Math
- **Canny Edge Detection**: การตรวจหาขอบ
- **Gaussian Blur**: การลด noise
- **Sobel Operator**: การคำนวณ gradient
- **Polynomial Regression**: การฟิต polynomial
- **Least Squares Method**: การหาค่า coefficients
- **Statistical Analysis**: R², RMSE, MAE

## 📊 Algorithm Details

### 1. Image Processing Pipeline
```javascript
Image → Grayscale → Gaussian Blur → Sobel Edge Detection → Point Extraction
```

### 2. Edge Detection
- **Canny Algorithm**: Multi-stage edge detection
- **Gaussian Blur**: 3x3 kernel สำหรับลด noise  
- **Sobel Operator**: คำนวณ gradient ในแนว X และ Y
- **Threshold**: ปรับค่าความไวในการตรวจหาขอบ

### 3. Polynomial Regression
- **Vandermonde Matrix**: สร้าง matrix สำหรับ polynomial features
- **Normal Equations**: (A^T × A) × coeff = A^T × y  
- **Gaussian Elimination**: แก้ระบบสมการเชิงเส้น
- **Multiple Degrees**: ทดสอบดีกรี 2-5 และเปรียบเทียบ

### 4. Quality Metrics
- **R² Score**: ความแม่นยำของการฟิต (0-1)
- **RMSE**: Root Mean Square Error
- **MAE**: Mean Absolute Error

## 🎯 การใช้งานที่แนะนำ

### ประเภทภาพที่เหมาะสม
- ✅ ภาพกราฟฟังก์ชันทางคณิตศาสตร์
- ✅ ลายเส้นโค้งต่างๆ (parabola, cubic curves)
- ✅ ภาพขาวดำที่มีความชัดเจน
- ✅ ภาพสแกนจากหนังสือหรือกระดาษ
- ✅ ภาพที่วาดด้วยปากกาหรือดินสอ

### ประเภทภาพที่ไม่เหมาะสม
- ❌ ภาพสีที่มีความซับซ้อน
- ❌ ภาพที่มี noise หรือเบลอมาก
- ❌ ภาพที่มีเส้นหลายเส้นซ้อนทับกัน
- ❌ ภาพที่ไม่มีเส้นหรือขอบชัดเจน
- ❌ ภาพถ่ายจากมือถือที่มีแสงไม่เหมาะสม

## 🛠️ การพัฒนาและปรับแต่ง

### การปรับแต่ง Algorithm
```javascript
// ปรับค่า Gaussian Blur Kernel
const kernel = [
    [1, 2, 1],
    [2, 4, 2], 
    [1, 2, 1]
];

// ปรับค่า Sobel Threshold
const threshold = document.getElementById('edgeThreshold').value;

// เพิ่มขั้นตอนการกรอง Outliers
const cleanedPoints = removeOutliers(points);
```

### การเพิ่มฟีเจอร์ใหม่
1. **เพิ่ม Polynomial Degrees**: แก้ไขใน HTML และ JavaScript
2. **เพิ่ม Edge Detection Algorithms**: Sobel, Prewitt, Roberts
3. **เพิ่มรูปแบบการ Export**: PDF, Excel, PNG
4. **เพิ่ม Image Filters**: Brightness, Contrast, Gamma

### Performance Optimization
- ใช้ Web Workers สำหรับการประมวลผลหนัก
- เพิ่ม Image Caching
- ลดขนาดภาพอัตโนมัติ
- เพิ่ม Progressive Loading

## 📈 ตัวอย่างผลลัพธ์

### สถิติที่แสดงผล
- **ดีกรีที่ดีที่สุด**: พหุนามที่มี R² สูงสุด
- **R² Score**: ค่าระหว่าง 0-1 (ยิ่งใกล้ 1 ยิ่งดี)
- **RMSE**: ค่าความผิดพลาดเฉลี่ย (ยิ่งน้อยยิ่งดี)
- **จำนวนจุดข้อมูล**: จุดที่สกัดได้จากภาพ

### รูปแบบการ Export
```json
// JSON Format
{
  "polynomials": [
    {
      "degree": 3,
      "coefficients": [0.1234, -0.5678, 1.2345, -0.9876],
      "r2": 0.9876,
      "rmse": 0.0234,
      "mae": 0.0123
    }
  ],
  "dataPoints": [...],
  "bestPolynomial": {...}
}
```

## 🔍 การแก้ปัญหา

### ปัญหาที่พบบ่อย

**Q: ไม่สามารถอัปโหลดไฟล์ได้**
- A: ตรวจสอบประเภทไฟล์ (รองรับเฉพาะรูปภาพ)
- A: ตรวจสอบขนาดไฟล์ (ไม่เกิน 16MB)

**Q: การตรวจหาขอบไม่ดี**
- A: ปรับค่า "ความไว Edge Detection"
- A: ใช้ภาพที่มีความคมชัดและ contrast สูง

**Q: ผลลัพธ์ไม่แม่นยำ**
- A: เลือกดีกรีพหุนามที่เหมาะสม
- A: ใช้ภาพที่มีเส้นโค้งเดียวและชัดเจน

**Q: แอปทำงานช้า**
- A: ใช้ภาพที่มีขนาดเล็กกว่า
- A: ปิดแอปพลิเคชันอื่นๆ ที่ไม่จำเป็น

## 🌐 การ Deploy

### GitHub Pages
```bash
git add .
git commit -m "Deploy to GitHub Pages"
git push origin main
```
จากนั้นไปที่ Repository Settings → Pages → Source: main branch

### Netlify
1. ลาก folder ไปที่ [Netlify Drop](https://app.netlify.com/drop)
2. หรือเชื่อมต่อ GitHub repository

### Vercel
```bash
npm i -g vercel
vercel
```

### Firebase Hosting
```bash
npm install -g firebase-tools
firebase login
firebase init hosting
firebase deploy
```

## 👨‍🎓 สำหรับการศึกษา

### จุดประสงค์การเรียนรู้
- **JavaScript Programming**: ES6+, Canvas API, File API
- **Computer Vision**: Edge detection, image processing
- **Mathematics**: Polynomial regression, linear algebra
- **Web Development**: Single Page Application, Responsive design
- **Data Visualization**: Chart.js, interactive graphs

### แนวทางการศึกษา
1. **ศึกษา Algorithm**: เข้าใจ edge detection และ polynomial fitting
2. **ปรับแต่ง Parameter**: ทดลองปรับค่าต่างๆ และดูผลลัพธ์
3. **เพิ่มฟีเจอร์**: เพิ่ม algorithm หรือ UI ใหม่
4. **Performance Analysis**: วิเคราะห์ประสิทธิภาพและปรับปรุง

## 📚 Resources

### เอกสารอ้างอิง
- [Canvas API Documentation](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API)
- [Canny Edge Detection](https://en.wikipedia.org/wiki/Canny_edge_detector)
- [Polynomial Regression](https://en.wikipedia.org/wiki/Polynomial_regression)
- [Bootstrap 5 Documentation](https://getbootstrap.com/docs/5.3/)
- [Chart.js Documentation](https://www.chartjs.org/docs/)

### แหล่งเรียนรู้เพิ่มเติม
- Computer Vision Algorithms
- Digital Image Processing
- Linear Algebra for Machine Learning
- JavaScript Canvas Programming

## 🤝 การสนับสนุน

หากพบปัญหาหรือต้องการคำแนะนำ:
- 📧 สร้าง Issue ใน GitHub
- 💬 ติดต่อผ่านระบบ Support
- 📖 อ่านเอกสารเพิ่มเติม

## 📄 สิทธิ์การใช้งาน

โปรเจคนี้เป็น Open Source ภายใต้ MIT License สามารถใช้งานและปรับปรุงได้อย่างอิสระ

---

**Made with ❤️ using JavaScript & Bootstrap**
