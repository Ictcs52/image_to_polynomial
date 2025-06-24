/**
 * 🎯 Image to Polynomial Web App - Main JavaScript
 * ================================================
 * ไฟล์ JavaScript หลักสำหรับแอปพลิเคชันแปลงภาพเป็นสมการพหุนาม
 * 
 * 📚 สิ่งที่นักเรียนจะได้เรียนรู้:
 * - JavaScript ES6+ Syntax และ Modern Features
 * - HTML5 Canvas API สำหรับ Image Processing
 * - File API และ FileReader สำหรับการอ่านไฟล์
 * - Drag & Drop API สำหรับ User Interface
 * - Mathematical Operations และ Statistical Analysis
 * - DOM Manipulation และ Event Handling
 * - Asynchronous Programming (async/await, Promises)
 * - Chart.js Library สำหรับการสร้างกราฟ
 * - Computer Vision Concepts (Edge Detection)
 * - Machine Learning Concepts (Polynomial Regression)
 * 
 * 🔧 เทคโนโลยีที่ใช้:
 * - Vanilla JavaScript (ไม่ใช้ Framework)
 * - HTML5 Canvas API
 * - Chart.js for Data Visualization
 * - Bootstrap 5 for UI Components
 * - Mathematical Libraries (Matrix Operations)
 */

// 🌐 Global Variables - ตัวแปรสำคัญของแอปพลิเคชัน
// ===================================================
let currentImageData = null;    // ข้อมูลภาพที่ผู้ใช้อัปโหลด
let processedResults = null;    // ผลลัพธ์การประมวลผล
let edgePoints = [];           // จุดข้อมูลที่สกัดได้จากภาพ

// 🚀 Application Initialization - การเริ่มต้นแอปพลิเคชัน
// ===========================================================
// Event Listener นี้จะทำงานเมื่อ HTML โหลดเสร็จแล้ว (DOM Ready)
document.addEventListener('DOMContentLoaded', function() {
    console.log('🎯 Image to Polynomial Web App initialized');
    setupEventListeners(); // เรียกฟังก์ชันตั้งค่า Event Listeners
});

/**
 * 🎛️ Setup All Event Listeners - ตั้งค่า Event Listeners ทั้งหมด
 * ==============================================================
 * ฟังก์ชันนี้ใช้สำหรับตั้งค่า Event Listeners ต่างๆ ที่จำเป็น
 * เพื่อให้แอปพลิเคชันสามารถตอบสนองต่อการกระทำของผู้ใช้
 */
function setupEventListeners() {
    // 📁 File Input Change Event - เมื่อผู้ใช้เลือกไฟล์
    const fileInput = document.getElementById('fileInput');
    fileInput.addEventListener('change', handleFileSelect);
    
    // 🖱️ Select File Button Click - เมื่อคลิกปุ่มเลือกไฟล์
    const selectFileBtn = document.getElementById('selectFileBtn');
    selectFileBtn.addEventListener('click', function(e) {
        e.stopPropagation(); // ป้องกันไม่ให้ Event ไปยัง Element อื่น
        fileInput.click();   // เปิด File Dialog
    });
    
    // 📤 Upload Area Click - เมื่อคลิกที่พื้นที่อัปโหลด
    const uploadArea = document.getElementById('uploadArea');
    uploadArea.addEventListener('click', function(e) {
        // ตรวจสอบว่าไม่ได้คลิกที่ปุ่มหรือ Element ลูกของปุ่ม
        if (e.target !== selectFileBtn && !selectFileBtn.contains(e.target)) {
            fileInput.click(); // เปิด File Dialog
        }
    });
    
    // 🔗 Smooth Scrolling for Navigation Links - การเลื่อนหน้าเว็บแบบนุ่มนวล
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault(); // ป้องกัน Default Behavior ของ Link
            const targetId = this.getAttribute('href').substring(1); // ตัด # ออก
            scrollToSection(targetId); // เรียกฟังก์ชันเลื่อนไปยังส่วนที่ต้องการ
        });
    });
}

/**
 * 📁 Handle File Selection - จัดการการเลือกไฟล์
 * =============================================
 * ฟังก์ชันนี้ทำงานเมื่อผู้ใช้เลือกไฟล์ผ่าน File Input
 * 
 * 🔍 การตรวจสอบที่ทำ:
 * 1. ประเภทไฟล์ (JPG, PNG เท่านั้น)
 * 2. ขนาดไฟล์ (ไม่เกิน 16MB)
 * 
 * @param {Event} event - Event Object จาก File Input
 */
function handleFileSelect(event) {
    const file = event.target.files[0]; // ไฟล์แรกที่เลือก
    if (file) {
        // 🔍 Validate File Type - ตรวจสอบประเภทไฟล์
        const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png'];
        if (!allowedTypes.includes(file.type.toLowerCase())) {
            showAlert('ไฟล์ประเภทนี้ไม่รองรับ กรุณาเลือกไฟล์ JPG หรือ PNG เท่านั้น', 'danger');
            return;
        }
        
        // 📏 Validate File Size - ตรวจสอบขนาดไฟล์ (16MB = 16 * 1024 * 1024 bytes)
        if (file.size > 16 * 1024 * 1024) {
            showAlert('ขนาดไฟล์ใหญ่เกินไป กรุณาเลือกไฟล์ที่มีขนาดไม่เกิน 16MB', 'danger');
            return;
        }
        
        // ✅ ไฟล์ผ่านการตรวจสอบแล้ว - โหลดตัวอย่าง
        loadImagePreview(file);
    }
}

/**
 * 🖱️ Handle Drag and Drop Functionality - จัดการการลากและวางไฟล์
 * ===============================================================
 * ฟังก์ชันเหล่านี้ทำให้ผู้ใช้สามารถลากไฟล์มาวางในพื้นที่อัปโหลดได้
 * 
 * 🎯 HTML5 Drag & Drop API Events:
 * - dragenter: เมื่อลากไฟล์เข้ามาในพื้นที่
 * - dragover: เมื่อลากไฟล์อยู่เหนือพื้นที่
 * - dragleave: เมื่อลากไฟล์ออกจากพื้นที่
 * - drop: เมื่อปล่อยไฟล์ในพื้นที่
 */

/**
 * 📥 Handle Drop Event - จัดการเมื่อปล่อยไฟล์
 */
function handleDrop(event) {
    event.preventDefault();     // ป้องกัน Default Browser Behavior
    event.stopPropagation();    // หยุด Event Bubbling
    
    const uploadArea = document.getElementById('uploadArea');
    uploadArea.classList.remove('drag-over'); // เอา CSS Class ที่ใช้แสดง Hover Effect
    
    const files = event.dataTransfer.files; // ไฟล์ที่ถูกลาก
    if (files.length > 0) {
        const file = files[0]; // เอาไฟล์แรก
        
        // 🔍 Check File Type - ตรวจสอบประเภทไฟล์
        const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png'];
        if (allowedTypes.includes(file.type.toLowerCase())) {
            loadImagePreview(file); // โหลดตัวอย่างภาพ
        } else {
            showAlert('ไฟล์ประเภทนี้ไม่รองรับ กรุณาเลือกไฟล์ JPG หรือ PNG เท่านั้น', 'danger');
        }
    }
}

/**
 * 🔄 Handle Drag Over Event - จัดการเมื่อลากไฟล์อยู่เหนือพื้นที่
 */
function handleDragOver(event) {
    event.preventDefault();     // ป้องกัน Default Behavior (สำคัญสำหรับ Drop)
    event.stopPropagation();
}

/**
 * 🎯 Handle Drag Enter Event - จัดการเมื่อลากไฟล์เข้าพื้นที่
 */
function handleDragEnter(event) {
    event.preventDefault();
    event.stopPropagation();
    // เพิ่ม CSS Class เพื่อแสดง Visual Feedback
    document.getElementById('uploadArea').classList.add('drag-over');
}

/**
 * 🚪 Handle Drag Leave Event - จัดการเมื่อลากไฟล์ออกจากพื้นที่
 */
function handleDragLeave(event) {
    event.preventDefault();
    event.stopPropagation();
    // เอา CSS Class ออกเมื่อลากออกจากพื้นที่
    document.getElementById('uploadArea').classList.remove('drag-over');
}

/**
 * 🖼️ Load and Display Image Preview - โหลดและแสดงตัวอย่างภาพ
 * ==========================================================
 * ฟังก์ชันนี้จะอ่านไฟล์ภาพและแสดงตัวอย่างให้ผู้ใช้เห็น
 * พร้อมเก็บข้อมูลภาพไว้สำหรับการประมวลผลต่อ
 * 
 * 🔧 HTML5 FileReader API:
 * - FileReader: ใช้อ่านไฟล์ในรูปแบบต่างๆ
 * - readAsDataURL(): แปลงไฟล์เป็น Base64 Data URL
 * 
 * @param {File} file - ไฟล์ภาพที่จะโหลด
 */
function loadImagePreview(file) {
    const reader = new FileReader(); // สร้าง FileReader Object
    
    // 📖 Event Handler เมื่ออ่านไฟล์เสร็จ
    reader.onload = function(e) {
        const previewImage = document.getElementById('previewImage');
        previewImage.src = e.target.result; // ตั้งค่า src ของ img element
        
        // 👁️ Show Preview Area - แสดงส่วนตัวอย่างภาพ
        document.getElementById('previewArea').classList.remove('d-none');
        
        // 💾 Store Image Data - เก็บข้อมูลภาพสำหรับการประมวลผล
        const img = new Image(); // สร้าง Image Object เพื่อดึงขนาดภาพ
        img.onload = function() {
            // เก็บข้อมูลสำคัญของภาพ
            currentImageData = {
                src: e.target.result,  // Base64 Data URL
                width: img.width,      // ความกว้างของภาพ
                height: img.height,    // ความสูงของภาพ
                file: file            // ไฟล์ต้นฉบับ
            };
            
            // 🎉 แสดงข้อความสำเร็จ
            showAlert('อัปโหลดสำเร็จ! กรุณาเลือกการตั้งค่าและกดเริ่มวิเคราะห์', 'success');
        };
        img.src = e.target.result; // โหลดภาพเพื่อดึงขนาด
    };
    
    // 🚀 เริ่มอ่านไฟล์เป็น Data URL
    reader.readAsDataURL(file);
}

/**
 * 🔬 Process the Image and Extract Polynomial - ประมวลผลภาพและสกัดสมการพหุนาม
 * ===========================================================================
 * ฟังก์ชันหลักที่ทำการประมวลผลภาพทั้งหมด
 * 
 * 📋 ขั้นตอนการประมวลผล:
 * 1. ตรวจสอบข้อมูลภาพและการตั้งค่า
 * 2. Edge Detection - ตรวจหาขอบของภาพ
 * 3. Data Point Extraction - สกัดจุดข้อมูล
 * 4. Polynomial Regression - วิเคราะห์พหุนาม
 * 5. Display Results - แสดงผลลัพธ์
 * 
 * 🎯 Computer Vision + Machine Learning Pipeline
 */
async function processImage() {
    // 🔍 Validation - ตรวจสอบข้อมูลที่จำเป็น
    if (!currentImageData) {
        showAlert('กรุณาอัปโหลดภาพก่อน', 'warning');
        return;
    }
    
    // 📊 Get Selected Degrees - ดึงดีกรีพหุนามที่เลือก
    const selectedDegrees = getSelectedDegrees();
    if (selectedDegrees.length === 0) {
        showAlert('กรุณาเลือกดีกรีพหุนามอย่างน้อย 1 ดีกรี', 'warning');
        return;
    }
    
    // 📊 Show Progress Bar - แสดงแถบความคืบหน้า
    showProgress();
    
    try {
        // 🔍 Step 1: Edge Detection - ตรวจหาขอบของภาพ
        updateProgress(20, 'กำลังตรวจหาขอบของภาพ...');
        const edgeData = await performEdgeDetection();
        
        // 📍 Step 2: Extract Data Points - สกัดจุดข้อมูล
        updateProgress(40, 'กำลังสกัดจุดข้อมูล...');
        const points = await extractDataPoints(edgeData);
        
        // ⚠️ ตรวจสอบจำนวนจุดข้อมูล
        if (points.length < 10) {
            throw new Error('พบจุดข้อมูลน้อยเกินไป กรุณาลองปรับค่า Edge Detection หรือใช้ภาพที่มีเส้นชัดเจนกว่า');
        }
        
        // 📈 Step 3: Polynomial Regression - วิเคราะห์พหุนาม
        updateProgress(60, 'กำลังวิเคราะห์พหุนาม...');
        const results = await performPolynomialRegression(points, selectedDegrees);
        
        // 🎨 Step 4: Display Results - แสดงผลลัพธ์
        updateProgress(80, 'กำลังสร้างกราฟและผลลัพธ์...');
        await displayResults(results, points, edgeData);
        
        updateProgress(100, 'เสร็จสิ้น!');
        
        // 🎉 Hide Progress and Show Results - ซ่อนความคืบหน้าและแสดงผลลัพธ์
        setTimeout(() => {
            hideProgress();
            scrollToSection('results-section'); // เลื่อนไปยังส่วนผลลัพธ์
        }, 1000);
        
    } catch (error) {
        console.error('Error processing image:', error);
        showAlert(`เกิดข้อผิดพลาด: ${error.message}`, 'danger');
        hideProgress();
    }
}

/**
 * 👁️ Perform Edge Detection - ตรวจหาขอบของภาพ
 * =============================================
 * ใช้ Canny Edge Detection Algorithm เพื่อหาขอบของภาพ
 * 
 * 🔬 Computer Vision Concepts:
 * - Grayscale Conversion: แปลงภาพเป็นสีเทา
 * - Gaussian Blur: ลดสัญญาณรบกวน
 * - Gradient Calculation: คำนวณการเปลี่ยนแปลงของสี
 * - Non-maximum Suppression: ลดความหนาของขอบ
 * - Hysteresis Thresholding: กำหนดเกณฑ์สำหรับขอบ
 * 
 * @returns {Promise<ImageData>} ข้อมูลภาพที่ตรวจหาขอบแล้ว
 */
async function performEdgeDetection() {
    return new Promise((resolve) => {
        // 🖼️ Create Canvas for Image Processing
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        const img = new Image();
        
        img.onload = function() {
            // 📏 Resize Image if Too Large - ปรับขนาดภาพถ้าใหญ่เกินไป
            const maxSize = 800; // ขนาดสูงสุด 800px
            let { width, height } = img;
            
            if (width > maxSize || height > maxSize) {
                const ratio = Math.min(maxSize / width, maxSize / height);
                width *= ratio;
                height *= ratio;
            }
            
            canvas.width = width;
            canvas.height = height;
            
            // 🎨 Draw Image to Canvas - วาดภาพลงบน Canvas
            ctx.drawImage(img, 0, 0, width, height);
            
            // 📊 Get Image Data - ดึงข้อมูลพิกเซลของภาพ
            const imageData = ctx.getImageData(0, 0, width, height);
            
            // Apply edge detection
            const edgeData = applyCanny(imageData);
            
            resolve({
                imageData: edgeData,
                canvas: canvas,
                width: width,
                height: height
            });
        };
        
        img.src = currentImageData.src;
    });
}

/**
 * Simple Canny edge detection implementation
 */
function applyCanny(imageData) {
    const data = imageData.data;
    const width = imageData.width;
    const height = imageData.height;
    
    // Convert to grayscale
    const gray = new Uint8ClampedArray(width * height);
    for (let i = 0; i < data.length; i += 4) {
        const idx = i / 4;
        gray[idx] = Math.round(0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2]);
    }
    
    // Apply Gaussian blur
    const blurred = applyGaussianBlur(gray, width, height);
    
    // Calculate gradients using Sobel operator
    const threshold = document.getElementById('edgeThreshold').value;
    const edges = applySobel(blurred, width, height, threshold);
    
    // Convert back to ImageData format
    const edgeImageData = new ImageData(width, height);
    for (let i = 0; i < edges.length; i++) {
        const idx = i * 4;
        const value = edges[i];
        edgeImageData.data[idx] = value;     // R
        edgeImageData.data[idx + 1] = value; // G
        edgeImageData.data[idx + 2] = value; // B
        edgeImageData.data[idx + 3] = 255;   // A
    }
    
    return edgeImageData;
}

/**
 * Apply Gaussian blur
 */
function applyGaussianBlur(data, width, height) {
    const kernel = [
        [1, 2, 1],
        [2, 4, 2],
        [1, 2, 1]
    ];
    const kernelWeight = 16;
    
    const result = new Uint8ClampedArray(width * height);
    
    for (let y = 1; y < height - 1; y++) {
        for (let x = 1; x < width - 1; x++) {
            let sum = 0;
            
            for (let ky = -1; ky <= 1; ky++) {
                for (let kx = -1; kx <= 1; kx++) {
                    const idx = (y + ky) * width + (x + kx);
                    sum += data[idx] * kernel[ky + 1][kx + 1];
                }
            }
            
            result[y * width + x] = sum / kernelWeight;
        }
    }
    
    return result;
}

/**
 * Apply Sobel operator for edge detection
 */
function applySobel(data, width, height, threshold) {
    const sobelX = [
        [-1, 0, 1],
        [-2, 0, 2],
        [-1, 0, 1]
    ];
    
    const sobelY = [
        [-1, -2, -1],
        [0, 0, 0],
        [1, 2, 1]
    ];
    
    const result = new Uint8ClampedArray(width * height);
    
    for (let y = 1; y < height - 1; y++) {
        for (let x = 1; x < width - 1; x++) {
            let gx = 0, gy = 0;
            
            for (let ky = -1; ky <= 1; ky++) {
                for (let kx = -1; kx <= 1; kx++) {
                    const idx = (y + ky) * width + (x + kx);
                    const pixel = data[idx];
                    gx += pixel * sobelX[ky + 1][kx + 1];
                    gy += pixel * sobelY[ky + 1][kx + 1];
                }
            }
            
            const magnitude = Math.sqrt(gx * gx + gy * gy);
            result[y * width + x] = magnitude > threshold ? 255 : 0;
        }
    }
    
    return result;
}

/**
 * Extract data points from edge detection result
 */
async function extractDataPoints(edgeData) {
    const points = [];
    const { imageData, width, height } = edgeData;
    const data = imageData.data;
    
    // Find edge pixels and convert to coordinate points
    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            const idx = (y * width + x) * 4;
            if (data[idx] > 128) { // White pixel (edge)
                // Convert image coordinates to graph coordinates
                // Flip Y axis and normalize
                points.push({
                    x: x / width,
                    y: (height - y) / height
                });
            }
        }
    }
    
    // Remove outliers using IQR method
    const cleanedPoints = removeOutliers(points);
    
    // Sort points by x coordinate
    cleanedPoints.sort((a, b) => a.x - b.x);
    
    edgePoints = cleanedPoints;
    return cleanedPoints;
}

/**
 * Remove outliers using IQR method
 */
function removeOutliers(points) {
    if (points.length < 4) return points;
    
    // Calculate quartiles for y values
    const yValues = points.map(p => p.y).sort((a, b) => a - b);
    const q1Index = Math.floor(yValues.length * 0.25);
    const q3Index = Math.floor(yValues.length * 0.75);
    const q1 = yValues[q1Index];
    const q3 = yValues[q3Index];
    const iqr = q3 - q1;
    
    const lowerBound = q1 - 1.5 * iqr;
    const upperBound = q3 + 1.5 * iqr;
    
    // Filter out outliers
    return points.filter(p => p.y >= lowerBound && p.y <= upperBound);
}

/**
 * Perform polynomial regression for multiple degrees
 */
async function performPolynomialRegression(points, degrees) {
    const results = [];
    
    for (const degree of degrees) {
        const result = fitPolynomial(points, degree);
        results.push({
            degree: degree,
            coefficients: result.coefficients,
            r2: result.r2,
            rmse: result.rmse,
            mae: result.mae
        });
    }
    
    // Sort by R² score (descending)
    results.sort((a, b) => b.r2 - a.r2);
    
    processedResults = {
        polynomials: results,
        dataPoints: points,
        bestPolynomial: results[0]
    };
    
    return processedResults;
}

/**
 * Fit polynomial using least squares method
 */
function fitPolynomial(points, degree) {
    const n = points.length;
    const x = points.map(p => p.x);
    const y = points.map(p => p.y);
    
    // Create Vandermonde matrix
    const A = [];
    for (let i = 0; i < n; i++) {
        const row = [];
        for (let j = 0; j <= degree; j++) {
            row.push(Math.pow(x[i], j));
        }
        A.push(row);
    }
    
    // Solve normal equations: (A^T * A) * coeff = A^T * y
    const coefficients = solveNormalEquations(A, y);
    
    // Calculate metrics
    const predictions = x.map(xi => {
        let pred = 0;
        for (let j = 0; j <= degree; j++) {
            pred += coefficients[j] * Math.pow(xi, j);
        }
        return pred;
    });
    
    const r2 = calculateR2(y, predictions);
    const rmse = calculateRMSE(y, predictions);
    const mae = calculateMAE(y, predictions);
    
    return { coefficients, r2, rmse, mae };
}

/**
 * Solve normal equations using Gaussian elimination
 */
function solveNormalEquations(A, y) {
    const m = A.length;
    const n = A[0].length;
    
    // Calculate A^T * A
    const ATA = [];
    for (let i = 0; i < n; i++) {
        ATA[i] = [];
        for (let j = 0; j < n; j++) {
            let sum = 0;
            for (let k = 0; k < m; k++) {
                sum += A[k][i] * A[k][j];
            }
            ATA[i][j] = sum;
        }
    }
    
    // Calculate A^T * y
    const ATy = [];
    for (let i = 0; i < n; i++) {
        let sum = 0;
        for (let k = 0; k < m; k++) {
            sum += A[k][i] * y[k];
        }
        ATy[i] = sum;
    }
    
    // Solve using Gaussian elimination
    return gaussianElimination(ATA, ATy);
}

/**
 * Gaussian elimination solver
 */
function gaussianElimination(A, b) {
    const n = A.length;
    const augmented = A.map((row, i) => [...row, b[i]]);
    
    // Forward elimination
    for (let i = 0; i < n; i++) {
        // Find pivot
        let maxRow = i;
        for (let k = i + 1; k < n; k++) {
            if (Math.abs(augmented[k][i]) > Math.abs(augmented[maxRow][i])) {
                maxRow = k;
            }
        }
        
        // Swap rows
        [augmented[i], augmented[maxRow]] = [augmented[maxRow], augmented[i]];
        
        // Make all rows below this one 0 in current column
        for (let k = i + 1; k < n; k++) {
            if (Math.abs(augmented[i][i]) < 1e-10) continue;
            const factor = augmented[k][i] / augmented[i][i];
            for (let j = i; j <= n; j++) {
                augmented[k][j] -= factor * augmented[i][j];
            }
        }
    }
    
    // Back substitution
    const x = new Array(n);
    for (let i = n - 1; i >= 0; i--) {
        x[i] = augmented[i][n];
        for (let j = i + 1; j < n; j++) {
            x[i] -= augmented[i][j] * x[j];
        }
        if (Math.abs(augmented[i][i]) > 1e-10) {
            x[i] /= augmented[i][i];
        }
    }
    
    return x;
}

/**
 * Calculate R² score
 */
function calculateR2(actual, predicted) {
    const actualMean = actual.reduce((a, b) => a + b) / actual.length;
    
    let ssRes = 0;
    let ssTot = 0;
    
    for (let i = 0; i < actual.length; i++) {
        ssRes += Math.pow(actual[i] - predicted[i], 2);
        ssTot += Math.pow(actual[i] - actualMean, 2);
    }
    
    return 1 - (ssRes / ssTot);
}

/**
 * Calculate RMSE
 */
function calculateRMSE(actual, predicted) {
    let sum = 0;
    for (let i = 0; i < actual.length; i++) {
        sum += Math.pow(actual[i] - predicted[i], 2);
    }
    return Math.sqrt(sum / actual.length);
}

/**
 * Calculate MAE
 */
function calculateMAE(actual, predicted) {
    let sum = 0;
    for (let i = 0; i < actual.length; i++) {
        sum += Math.abs(actual[i] - predicted[i]);
    }
    return sum / actual.length;
}

/**
 * Get selected polynomial degrees
 */
function getSelectedDegrees() {
    const degrees = [];
    for (let i = 2; i <= 5; i++) {
        const checkbox = document.getElementById(`degree${i}`);
        if (checkbox && checkbox.checked) {
            degrees.push(i);
        }
    }
    return degrees;
}

/**
 * Display results
 */
async function displayResults(results, points, edgeData) {
    // Show results container
    document.getElementById('resultsContainer').classList.remove('d-none');
    document.getElementById('noResultsMessage').classList.add('d-none');
    
    // Update statistics
    const best = results.bestPolynomial;
    document.getElementById('bestDegree').textContent = best.degree;
    document.getElementById('bestR2').textContent = best.r2.toFixed(4);
    document.getElementById('bestRMSE').textContent = best.rmse.toFixed(4);
    document.getElementById('dataPoints').textContent = points.length;
    
    // Display edge detection result
    displayEdgeDetection(edgeData);
    
    // Display polynomial comparison chart
    displayPolynomialChart(results, points);
    
    // Display equations
    displayEquations(results.polynomials);
}

/**
 * Display edge detection result
 */
function displayEdgeDetection(edgeData) {
    const canvas = document.getElementById('edgeCanvas');
    const ctx = canvas.getContext('2d');
    
    canvas.width = edgeData.width;
    canvas.height = edgeData.height;
    
    ctx.putImageData(edgeData.imageData, 0, 0);
}

/**
 * Display polynomial comparison chart
 */
function displayPolynomialChart(results, points) {
    const canvas = document.getElementById('polynomialChart');
    const ctx = canvas.getContext('2d');
    
    // Generate x values for smooth curves
    const xValues = [];
    for (let i = 0; i <= 100; i++) {
        xValues.push(i / 100);
    }
    
    // Prepare datasets
    const datasets = [];
    
    // Original data points
    datasets.push({
        label: 'จุดข้อมูลจริง',
        data: points.map(p => ({ x: p.x, y: p.y })),
        backgroundColor: 'rgba(255, 99, 132, 0.6)',
        borderColor: 'rgba(255, 99, 132, 1)',
        type: 'scatter',
        pointRadius: 2,
        showLine: false
    });
    
    // Polynomial curves
    const colors = [
        'rgba(54, 162, 235, 1)',   // Blue
        'rgba(255, 206, 86, 1)',   // Yellow
        'rgba(75, 192, 192, 1)',   // Green
        'rgba(153, 102, 255, 1)'   // Purple
    ];
    
    results.polynomials.forEach((poly, index) => {
        const yValues = xValues.map(x => {
            let y = 0;
            for (let j = 0; j < poly.coefficients.length; j++) {
                y += poly.coefficients[j] * Math.pow(x, j);
            }
            return y;
        });
        
        datasets.push({
            label: `ดีกรี ${poly.degree} (R²=${poly.r2.toFixed(3)})`,
            data: xValues.map((x, i) => ({ x: x, y: yValues[i] })),
            borderColor: colors[index % colors.length],
            backgroundColor: colors[index % colors.length].replace('1)', '0.1)'),
            type: 'line',
            fill: false,
            pointRadius: 0,
            borderWidth: 2
        });
    });
    
    // Create chart
    new Chart(ctx, {
        type: 'scatter',
        data: { datasets: datasets },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                x: {
                    type: 'linear',
                    position: 'bottom',
                    title: { display: true, text: 'X' }
                },
                y: {
                    title: { display: true, text: 'Y' }
                }
            },
            plugins: {
                title: {
                    display: true,
                    text: 'เปรียบเทียบพหุนามต่างดีกรี'
                },
                legend: {
                    display: true,
                    position: 'top'
                }
            }
        }
    });
}

/**
 * Display polynomial equations
 */
function displayEquations(polynomials) {
    const container = document.getElementById('equationsContainer');
    container.innerHTML = '';
    
    polynomials.forEach(poly => {
        const col = document.createElement('div');
        col.className = 'col-lg-6 mb-3';
        
        const equation = formatPolynomial(poly.coefficients, poly.degree);
        
        col.innerHTML = `
            <div class="equation-card">
                <h6>พหุนามดีกรี ${poly.degree}</h6>
                <div class="equation-text">${equation}</div>
                <div class="metrics mt-2">
                    <small>
                        <strong>R²:</strong> ${poly.r2.toFixed(4)} | 
                        <strong>RMSE:</strong> ${poly.rmse.toFixed(4)} | 
                        <strong>MAE:</strong> ${poly.mae.toFixed(4)}
                    </small>
                </div>
            </div>
        `;
        
        container.appendChild(col);
    });
}

/**
 * Format polynomial equation
 */
function formatPolynomial(coefficients, degree) {
    let equation = 'y = ';
    let terms = [];
    
    for (let i = degree; i >= 0; i--) {
        const coeff = coefficients[i];
        if (Math.abs(coeff) < 1e-10) continue;
        
        let term = '';
        const absCoeff = Math.abs(coeff);
        const sign = coeff >= 0 ? '+' : '-';
        
        if (terms.length > 0) {
            term += ` ${sign} `;
        } else if (coeff < 0) {
            term += '-';
        }
        
        if (i === 0) {
            term += absCoeff.toFixed(4);
        } else if (i === 1) {
            if (absCoeff === 1) {
                term += 'x';
            } else {
                term += `${absCoeff.toFixed(4)}x`;
            }
        } else {
            if (absCoeff === 1) {
                term += `x^${i}`;
            } else {
                term += `${absCoeff.toFixed(4)}x^${i}`;
            }
        }
        
        terms.push(term);
    }
    
    return equation + (terms.length > 0 ? terms.join('') : '0');
}

/**
 * Progress bar functions
 */
function showProgress() {
    document.getElementById('progressArea').classList.remove('d-none');
    updateProgress(0, 'เริ่มต้นการประมวลผล...');
}

function updateProgress(percent, text) {
    const progressBar = document.getElementById('progressBar');
    const progressText = document.getElementById('progressText');
    
    // Smooth animation for progress bar
    progressBar.style.width = `${percent}%`;
    progressBar.setAttribute('aria-valuenow', percent);
    
    // Add success color when complete
    if (percent === 100) {
        progressBar.classList.remove('bg-primary');
        progressBar.classList.add('bg-success');
        progressText.innerHTML = `<i class="fas fa-check-circle text-success me-2"></i>${text}`;
    } else if (percent > 0) {
        progressBar.classList.remove('bg-success');
        progressBar.classList.add('bg-primary');
        progressText.innerHTML = `<i class="fas fa-cog fa-spin text-primary me-2"></i>${text}`;
    } else {
        progressText.textContent = text;
    }
}

function hideProgress() {
    document.getElementById('progressArea').classList.add('d-none');
}

/**
 * Download results
 */
function downloadResults(format) {
    if (!processedResults) {
        showAlert('ไม่มีผลลัพธ์ให้ดาวน์โหลด', 'warning');
        return;
    }
    
    let content, filename, mimeType;
    
    switch (format) {
        case 'json':
            content = JSON.stringify(processedResults, null, 2);
            filename = 'polynomial_results.json';
            mimeType = 'application/json';
            break;
            
        case 'csv':
            content = generateCSV(processedResults);
            filename = 'polynomial_results.csv';
            mimeType = 'text/csv';
            break;
            
        case 'txt':
            content = generateTextReport(processedResults);
            filename = 'polynomial_results.txt';
            mimeType = 'text/plain';
            break;
    }
    
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    showAlert(`ดาวน์โหลด ${filename} สำเร็จ`, 'success');
}

/**
 * Generate CSV content
 */
function generateCSV(results) {
    let csv = 'Degree,R2_Score,RMSE,MAE,Coefficients\n';
    
    results.polynomials.forEach(poly => {
        const coeffStr = poly.coefficients.map(c => c.toFixed(6)).join(';');
        csv += `${poly.degree},${poly.r2.toFixed(6)},${poly.rmse.toFixed(6)},${poly.mae.toFixed(6)},"${coeffStr}"\n`;
    });
    
    csv += '\nData Points\nX,Y\n';
    results.dataPoints.forEach(point => {
        csv += `${point.x.toFixed(6)},${point.y.toFixed(6)}\n`;
    });
    
    return csv;
}

/**
 * Generate text report
 */
function generateTextReport(results) {
    let report = 'Image to Polynomial Analysis Report\n';
    report += '=====================================\n\n';
    
    report += `Data Points: ${results.dataPoints.length}\n`;
    report += `Best Polynomial: Degree ${results.bestPolynomial.degree}\n`;
    report += `Best R² Score: ${results.bestPolynomial.r2.toFixed(6)}\n\n`;
    
    report += 'Polynomial Comparison:\n';
    report += '----------------------\n';
    
    results.polynomials.forEach(poly => {
        report += `Degree ${poly.degree}:\n`;
        report += `  R² Score: ${poly.r2.toFixed(6)}\n`;
        report += `  RMSE: ${poly.rmse.toFixed(6)}\n`;
        report += `  MAE: ${poly.mae.toFixed(6)}\n`;
        report += `  Equation: ${formatPolynomial(poly.coefficients, poly.degree)}\n\n`;
    });
    
    return report;
}

/**
 * Utility functions
 */
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }
}

function showAlert(message, type = 'info') {
    // Create alert element
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type} alert-dismissible fade show position-fixed`;
    alertDiv.style.cssText = 'top: 20px; right: 20px; z-index: 9999; max-width: 400px;';
    
    alertDiv.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    
    document.body.appendChild(alertDiv);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (alertDiv.parentNode) {
            alertDiv.remove();
        }
    }, 5000);
}
