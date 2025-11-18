# 🎥 RECORDING GUIDE - API DEMONSTRATION

## 📋 What You Need to Record

This guide will help you create a professional video demonstration of the API implementation for your magang assignment.

---

## 🎬 Recording Structure (15-20 minutes)

### **Part 1: Introduction (2 minutes)**

**What to say:**
```
"Halo, saya [nama kamu] dari [institusi].
Ini adalah demonstrasi implementasi API untuk Product Service System.
Saya akan mendemonstrasikan 5 endpoint API yang diminta sesuai dengan assignment."
```

**What to show:**
- Show your desktop
- Open the project folder briefly
- Show the documentation files (API_DOCUMENTATION.md, JAWABAN_SOAL_API.md)

---

### **Part 2: Code Walkthrough (5-7 minutes)**

#### 2.1 Show Route Configuration
**File:** `routes/api.php`

**What to say:**
```
"Pertama, saya akan menunjukkan routing API yang sudah dibuat.
Disini ada 5 endpoint utama sesuai dengan assignment:
1. POST /api/categories - untuk menambah kategori baru
2. GET /api/transactions - untuk menampilkan daftar transaksi
3. PUT /api/products/{id}/stock - untuk update stok produk
4. DELETE /api/products/out-of-stock - untuk hapus produk stok habis
5. GET /api/products/search - untuk pencarian produk berdasarkan nama"
```

**What to show:**
- Open `routes/api.php` in VS Code
- Scroll through and highlight each route
- Point out the HTTP methods (GET, POST, PUT, DELETE)
- Show the controller references

#### 2.2 Show Controllers
**Files:** 
- `app/Http/Controllers/Api/CategoryController.php`
- `app/Http/Controllers/Api/TransactionController.php`
- `app/Http/Controllers/Api/ProductApiController.php`

**What to say for each controller:**

**CategoryController:**
```
"Di CategoryController, ada method store untuk menambahkan kategori baru.
Method ini menerima request dengan field name dan description,
melakukan validasi, kemudian menyimpan ke database.
Response yang dikembalikan adalah JSON dengan format success, message, dan data."
```

**TransactionController:**
```
"Di TransactionController, method index menampilkan semua transaksi pembelian.
Data transaksi juga di-load dengan relasi product-nya menggunakan eager loading,
jadi kita bisa melihat detail produk yang dibeli dalam setiap transaksi."
```

**ProductApiController:**
```
"Di ProductApiController, ada 3 method penting:
1. updateStock - untuk update stok produk berdasarkan ID
2. deleteOutOfStock - untuk menghapus semua produk dengan stok 0
3. search - untuk mencari produk berdasarkan nama menggunakan query parameter"
```

**What to show:**
- Open each controller file one by one
- Scroll slowly through the code
- Highlight important parts:
  - Validation rules
  - Database queries
  - Response format
  - Error handling

#### 2.3 Show Models & Migrations
**Files:**
- `app/Models/Category.php`
- `app/Models/Transaction.php`
- `database/migrations/` (categories and transactions)

**What to say:**
```
"Untuk database, saya membuat 2 tabel baru:
1. Categories table - untuk menyimpan kategori produk
2. Transactions table - untuk menyimpan transaksi pembelian

Model Category dan Transaction sudah dibuat dengan relasi yang sesuai."
```

**What to show:**
- Open model files briefly
- Show the fillable fields
- Show migration files to explain table structure

---

### **Part 3: API Testing with Postman (8-10 minutes)**

#### Before Testing
**What to say:**
```
"Sekarang saya akan testing API menggunakan Postman.
Saya sudah import collection yang berisi semua endpoint.
Server Laravel sudah running di localhost:8000."
```

**What to show:**
- Open terminal and run: `php artisan serve`
- Open Postman
- Show the imported collection "Product Service API"

---

#### Test 1: Create Category (POST /api/categories)
**What to say:**
```
"Test pertama: Menambahkan kategori produk baru.
Method: POST
Endpoint: /api/categories
Body: JSON dengan field name dan description"
```

**What to do:**
1. Click on "Create Category" request
2. Show the request URL
3. Show Headers tab (Content-Type, Accept)
4. Show Body tab with JSON:
   ```json
   {
       "name": "Electronics",
       "description": "Electronic products and gadgets"
   }
   ```
5. Click "Send"
6. Show the response (201 Created)
7. Explain the response structure

**What to say after response:**
```
"Response berhasil dengan status 201 Created.
Data kategori baru berhasil disimpan dengan ID 1,
dan timestamps created_at dan updated_at otomatis dibuat."
```

---

#### Test 2: Get All Transactions (GET /api/transactions)
**What to say:**
```
"Test kedua: Menampilkan daftar transaksi pembelian.
Method: GET
Endpoint: /api/transactions"
```

**What to do:**
1. Click on "Get All Transactions" request
2. Show the request URL
3. Show Headers tab
4. Click "Send"
5. Show the response (200 OK)
6. Scroll through the transaction list
7. Point out the product relation data

**What to say after response:**
```
"Response menampilkan array transaksi dengan status 200 OK.
Setiap transaksi include informasi product yang dibeli.
Kita bisa lihat quantity, total_price, customer_name, dan detail produk."
```

---

#### Test 3: Update Product Stock (PUT /api/products/{id}/stock)
**What to say:**
```
"Test ketiga: Update stok produk berdasarkan ID.
Method: PUT
Endpoint: /api/products/1/stock
Body: JSON dengan field stock"
```

**What to do:**
1. First, do GET /api/products to show current stock
2. Note a product ID and its current stock
3. Click on "Update Product Stock" request
4. Show the URL with product ID
5. Show Body with:
   ```json
   {
       "stock": 150
   }
   ```
6. Click "Send"
7. Show the response showing updated stock

**What to say after response:**
```
"Response berhasil dengan status 200 OK.
Stok produk berhasil diupdate dari [old stock] menjadi 150.
Data produk yang diupdate ditampilkan dalam response."
```

---

#### Test 4: Delete Out of Stock Products (DELETE /api/products/out-of-stock)
**What to say:**
```
"Test keempat: Menghapus semua produk dengan stok 0.
Method: DELETE
Endpoint: /api/products/out-of-stock"
```

**What to do:**
1. First, update a product stock to 0 (using update stock API)
2. Do GET /api/products to show products with stock 0
3. Click on "Delete Out of Stock Products" request
4. Show the request URL
5. Click "Send"
6. Show the response with deleted_count

**What to say after response:**
```
"Response berhasil dengan status 200 OK.
API menghapus [X] produk dengan stok 0.
Deleted_count menunjukkan jumlah produk yang terhapus."
```

---

#### Test 5: Search Products (GET /api/products/search?name=...)
**What to say:**
```
"Test kelima: Pencarian produk berdasarkan nama.
Method: GET
Endpoint: /api/products/search
Query parameter: name"
```

**What to do:**
1. Click on "Search Products by Name" request
2. Show the URL with query parameter
3. Click on "Params" tab and show the name parameter
4. Try searching for "Laptop" or any existing product
5. Click "Send"
6. Show the response with matching products
7. Try another search term to show different results

**What to say after response:**
```
"Response berhasil dengan status 200 OK.
API mengembalikan array produk yang namanya mengandung kata kunci pencarian.
Pencarian menggunakan LIKE query, jadi bisa partial match."
```

---

### **Part 4: Error Handling Demo (2-3 minutes)**

**What to say:**
```
"Sekarang saya akan demo error handling.
API sudah didesign untuk handle berbagai error case."
```

**Test these error scenarios:**

1. **Missing Required Field**
   - Try Create Category without "name" field
   - Show 422 validation error

2. **Product Not Found**
   - Try Update Stock with non-existent ID (e.g., 99999)
   - Show 404 error

3. **Missing Query Parameter**
   - Try Search Products without "name" parameter
   - Show 400 error

**What to say:**
```
"Seperti yang terlihat, API memberikan error message yang jelas
untuk membantu developer understand apa yang salah."
```

---

### **Part 5: Documentation Review (2 minutes)**

**What to say:**
```
"Untuk dokumentasi, saya sudah membuat beberapa file:
1. API_DOCUMENTATION.md - dokumentasi teknis lengkap
2. JAWABAN_SOAL_API.md - jawaban untuk assignment
3. POSTMAN_BEGINNER_GUIDE.md - panduan Postman untuk pemula
4. Postman Collection JSON - untuk import ke Postman"
```

**What to show:**
- Open each documentation file briefly
- Scroll through to show the content
- Highlight the structure and completeness

---

### **Part 6: Closing (1 minute)**

**What to say:**
```
"Demikian demonstrasi implementasi API untuk Product Service System.
Kelima endpoint sudah berhasil diimplementasi dan ditest:
1. Create Category - POST
2. Get Transactions - GET
3. Update Stock - PUT
4. Delete Out of Stock - DELETE
5. Search Products - GET

Semua endpoint sudah include validation, error handling, dan proper response format.
Code sudah di-push ke GitHub repository.
Terima kasih."
```

---

## 🛠️ Technical Setup for Recording

### Required Software:
1. **Screen Recorder**
   - **Windows**: OBS Studio, Camtasia, or Windows Game Bar (Win+G)
   - **Mac**: QuickTime, OBS Studio, or ScreenFlow
   - **Linux**: OBS Studio, SimpleScreenRecorder, or Kazam

2. **Microphone**
   - Use a good quality microphone or headset
   - Test audio before recording

3. **Applications to Open**
   - VS Code (for code walkthrough)
   - Terminal (for running server)
   - Postman (for API testing)
   - Browser (optional, for documentation)

### Recording Settings:
- **Resolution**: 1920x1080 (Full HD) or 1280x720 (HD)
- **Frame Rate**: 30 FPS minimum
- **Audio**: Clear voice, minimize background noise
- **Format**: MP4 (most compatible)

---

## ✅ Pre-Recording Checklist

Before you start recording, make sure:

- [ ] Close unnecessary applications
- [ ] Clean up your desktop
- [ ] Prepare your VS Code with files ready to open
- [ ] Have Postman collection imported
- [ ] Test your microphone
- [ ] Have a script or notes ready
- [ ] Run `php artisan serve` in terminal
- [ ] Test all APIs once to make sure they work
- [ ] Have water nearby (stay hydrated!)

---

## 📝 Recording Tips

1. **Speak Clearly and Slowly**
   - Pronounce technical terms clearly
   - Pause between sections
   - Don't rush

2. **Show, Then Explain**
   - First show what you're doing
   - Then explain why

3. **Use Zoom**
   - Zoom in on important code sections
   - Make text readable in the video

4. **Highlight with Cursor**
   - Use your mouse to point at important parts
   - Don't move cursor too fast

5. **If You Make a Mistake**
   - Pause, take a breath
   - You can edit mistakes later
   - Or just continue if it's minor

6. **Keep Energy Up**
   - Smile while talking (it affects your voice)
   - Stay enthusiastic
   - Take breaks if needed

---

## 🎬 Alternative: Record in Sections

You don't have to record everything in one take! You can:

1. Record introduction separately
2. Record code walkthrough separately
3. Record each API test separately
4. Edit them together later

This makes it easier and less stressful!

---

## 📤 After Recording

### Video Editing (Optional):
- Trim unnecessary parts
- Add text overlays for emphasis
- Add intro/outro slides
- Speed up slow parts (like typing)

### Upload to YouTube:
1. Go to youtube.com
2. Click "Create" → "Upload video"
3. Upload your video
4. Set visibility to "Unlisted" (so only people with link can see)
5. Add title: "API Implementation - Product Service System"
6. Add description with assignment details
7. Copy the YouTube link

### Push to GitHub:
```bash
cd /home/ariochi/Desktop/projects/magang-wesclic/magang-14-11-2025

# Initialize git if not already
git init

# Add all files
git add .

# Commit
git commit -m "Add Product Service API implementation with documentation"

# Add remote (replace with your GitHub repo URL)
git remote add origin https://github.com/yourusername/your-repo.git

# Push
git push -u origin main
```

---

## 📋 Final Deliverables

1. **GitHub Repository** with:
   - Complete Laravel project
   - All API controllers and routes
   - Documentation files (MD files)
   - Postman collection JSON
   - README.md explaining the project

2. **Video Recording** showing:
   - Code walkthrough
   - API testing in Postman
   - Error handling demo

3. **Assignment Document** including:
   - API documentation for each endpoint
   - Screenshots from Postman
   - Link to GitHub repo
   - Link to video demonstration

---

## 🎯 Key Points to Emphasize

When recording, make sure to emphasize:

1. **RESTful Design**
   - Proper HTTP methods
   - Meaningful endpoint names
   - Standard status codes

2. **Code Quality**
   - Clean code structure
   - Proper validation
   - Error handling
   - Comments where needed

3. **Response Format**
   - Consistent JSON structure
   - Meaningful messages
   - Proper data nesting

4. **Testing**
   - All endpoints tested successfully
   - Error cases handled
   - Edge cases considered

---

## ❓ Common Questions

**Q: How long should the video be?**
A: 15-20 minutes is ideal. Maximum 30 minutes.

**Q: Should I show my face?**
A: Not necessary. Screen recording with voice-over is fine.

**Q: What if I make a mistake during recording?**
A: Either edit it out later, or pause and redo that section.

**Q: Should I record in English or Bahasa?**
A: Use whatever language is required by your assignment. Mix of both is okay too.

**Q: Do I need to show database?**
A: Not necessary, but you can briefly show migrations if you want.

---

## 🚀 Good Luck!

You've got this! The API is already working perfectly. Just follow this guide, stay calm, and explain clearly what you've built.

Remember: You understand this code because you (we) built it. Just share that understanding naturally in the recording.

**Final tip:** Do a practice run before the actual recording to get comfortable with the flow!

---

**Created for magang assignment - Product Service API Implementation**
