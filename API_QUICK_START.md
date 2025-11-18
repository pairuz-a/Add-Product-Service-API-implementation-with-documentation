# 🚀 API Assignment - Quick Start

Saya sudah membuatkan semua API yang diminta untuk assignment kamu! Ini adalah panduan cepat untuk memulai.

## ✅ Yang Sudah Dibuat

### 1️⃣ API Categories (Soal 1)
- **POST** `/api/categories` - Tambah kategori baru
- **GET** `/api/categories` - Lihat semua kategori

### 2️⃣ API Transactions (Soal 2)  
- **GET** `/api/transactions` - Lihat daftar transaksi pembelian
- **POST** `/api/transactions` - Buat transaksi baru

### 3️⃣ API Update Stock (Soal 3)
- **PUT** `/api/products/{id}/stock` - Update stok produk

### 4️⃣ API Delete Out of Stock (Soal 4)
- **DELETE** `/api/products/out-of-stock` - Hapus produk stok habis

### 5️⃣ API Search Products (Soal 5)
- **GET** `/api/products/search?name=laptop` - Cari produk by nama

## 📁 File-File Penting

1. **POSTMAN_BEGINNER_GUIDE.md** 👈 **BACA INI DULU!**
   - Panduan lengkap Postman dari NOL
   - Step-by-step dengan gambar penjelasan
   - Cocok untuk pemula

2. **JAWABAN_SOAL_API.md** 📝
   - Jawaban lengkap untuk ke-5 soal
   - Format request & response
   - Siap untuk dikumpulkan

3. **API_DOCUMENTATION.md** 📚
   - Dokumentasi teknis semua endpoint
   - Contoh request & response detail

4. **Product_Service_API.postman_collection.json** 📦
   - Import file ini ke Postman
   - Semua request sudah siap pakai!

## 🎯 Cara Mulai Testing (3 Langkah)

### Step 1: Jalankan Server
```bash
cd /home/ariochi/Desktop/projects/magang-wesclic/magang-14-11-2025
php artisan serve
```
Biarkan terminal ini tetap terbuka!

### Step 2: Buka Postman
1. Download Postman dari https://www.postman.com/downloads/
2. Install dan buka aplikasinya
3. Skip sign-in (klik "Skip and go to the app")

### Step 3: Import Collection
1. Di Postman, klik tombol "Import" (pojok kiri atas)
2. Klik "Upload Files"
3. Pilih file: `Product_Service_API.postman_collection.json`
4. Klik "Import"

**SELESAI!** Sekarang kamu punya 11 request yang siap di-test! 🎉

## 🧪 Testing Sequence (Urutan yang Disarankan)

1. **GET** `/api/products` - Lihat produk yang ada
2. **POST** `/api/categories` - Buat kategori baru
3. **POST** `/api/transactions` - Buat transaksi (pastikan product_id exist)
4. **GET** `/api/transactions` - Lihat transaksi yang baru dibuat
5. **PUT** `/api/products/1/stock` - Update stok produk
6. **GET** `/api/products/search?name=Hel` - Cari produk
7. **DELETE** `/api/products/out-of-stock` - Hapus produk stok habis

## 📸 Untuk Assignment Kamu

1. Test semua 5 endpoint sesuai soal
2. Screenshot response yang berhasil
3. Copy-paste format dari `JAWABAN_SOAL_API.md`
4. Tambahkan screenshot ke dokumen

## ❓ Troubleshooting

### "Could not get any response"
→ Server belum jalan. Jalankan `php artisan serve`

### "404 Not Found"
→ Cek URL-nya, pastikan sama dengan dokumentasi

### "500 Internal Server Error"  
→ Cek log di `storage/logs/laravel.log`

### Response HTML bukan JSON
→ Tambahkan header `Accept: application/json`

## 🎓 Belajar Lebih Lanjut

Baca file **POSTMAN_BEGINNER_GUIDE.md** untuk:
- Penjelasan apa itu API
- HTTP Methods (GET, POST, PUT, DELETE)
- Cara membuat request manual
- Tips & tricks Postman

## 📞 Struktur Project

```
magang-14-11-2025/
├── app/
│   ├── Http/Controllers/Api/
│   │   ├── CategoryController.php      (Soal 1)
│   │   ├── TransactionController.php   (Soal 2)
│   │   └── ProductApiController.php    (Soal 3,4,5)
│   └── Models/
│       ├── Category.php
│       ├── Transaction.php
│       └── Product.php
├── routes/
│   └── api.php                         (Semua route API)
├── database/migrations/
│   ├── create_categories_table.php
│   └── create_transactions_table.php
└── Documentation/
    ├── POSTMAN_BEGINNER_GUIDE.md       👈 BACA DULU
    ├── JAWABAN_SOAL_API.md             👈 UNTUK DIKUMPULKAN
    ├── API_DOCUMENTATION.md
    └── Product_Service_API.postman_collection.json
```

## ✨ Tips

1. **Selalu test GET dulu** sebelum POST/PUT/DELETE
2. **Simpan request** kamu di Postman (klik Save)
3. **Gunakan Collections** untuk organize requests
4. **Perhatikan status code**: 200=OK, 201=Created, 404=Not Found
5. **Baca error message** dengan teliti

---

**Semoga berhasil dengan assignment-nya! 🚀**

Kalau ada yang bingung, baca file `POSTMAN_BEGINNER_GUIDE.md` step by step.
