# JAWABAN SOAL API - PRODUK SERVICE

## Soal 1: Rancangan Endpoint API untuk Menambahkan Kategori Produk Baru

### Endpoint
```
POST /api/categories
```

### Method
`POST`

### Request Headers
```
Content-Type: application/json
Accept: application/json
```

### Request Body
```json
{
    "name": "Electronics",
    "description": "Kategori untuk produk elektronik dan gadget"
}
```

### Contoh Response Berhasil (201 Created)
```json
{
    "success": true,
    "message": "Category created successfully",
    "data": {
        "id": 1,
        "name": "Electronics",
        "description": "Kategori untuk produk elektronik dan gadget",
        "created_at": "2025-11-17T02:48:00.000000Z",
        "updated_at": "2025-11-17T02:48:00.000000Z"
    }
}
```

### Contoh Response Gagal - Validasi (422 Unprocessable Entity)
```json
{
    "message": "The name field is required.",
    "errors": {
        "name": [
            "The name field is required."
        ]
    }
}
```

---

## Soal 2: API untuk Menampilkan Daftar Transaksi Pembelian Produk

### Endpoint
```
GET /api/transactions
```

### Method
`GET`

### Request Headers
```
Accept: application/json
```

### Format Response
```json
{
    "success": boolean,
    "message": string,
    "data": [
        {
            "id": integer,
            "product_id": integer,
            "quantity": integer,
            "total_price": string (decimal),
            "customer_name": string,
            "created_at": string (datetime),
            "updated_at": string (datetime),
            "product": {
                "id": integer,
                "name": string,
                "category": string,
                "price": string (decimal),
                "stock": integer,
                "status": string
            }
        }
    ]
}
```

### Contoh Data Response
```json
{
    "success": true,
    "message": "Transactions retrieved successfully",
    "data": [
        {
            "id": 1,
            "product_id": 1,
            "quantity": 5,
            "total_price": "500.00",
            "customer_name": "John Doe",
            "created_at": "2025-11-17T02:50:00.000000Z",
            "updated_at": "2025-11-17T02:50:00.000000Z",
            "product": {
                "id": 1,
                "name": "Laptop HP Pavilion",
                "category": "Electronics",
                "price": "100.00",
                "stock": 45,
                "status": "active"
            }
        },
        {
            "id": 2,
            "product_id": 3,
            "quantity": 2,
            "total_price": "80.00",
            "customer_name": "Jane Smith",
            "created_at": "2025-11-17T03:15:00.000000Z",
            "updated_at": "2025-11-17T03:15:00.000000Z",
            "product": {
                "id": 3,
                "name": "Mouse Wireless Logitech",
                "category": "Electronics",
                "price": "40.00",
                "stock": 98,
                "status": "active"
            }
        },
        {
            "id": 3,
            "product_id": 5,
            "quantity": 10,
            "total_price": "250.00",
            "customer_name": "Bob Wilson",
            "created_at": "2025-11-17T04:00:00.000000Z",
            "updated_at": "2025-11-17T04:00:00.000000Z",
            "product": {
                "id": 5,
                "name": "Keyboard Mechanical",
                "category": "Electronics",
                "price": "25.00",
                "stock": 30,
                "status": "active"
            }
        }
    ]
}
```

---

## Soal 3: API untuk Update Stok Produk Berdasarkan ID Produk

### Endpoint
```
PUT /api/products/{id}/stock
```

### Method
`PUT`

### URL Parameters
- `{id}` - ID produk (integer, required)

### Request Headers
```
Content-Type: application/json
Accept: application/json
```

### Request Body
```json
{
    "stock": 100
}
```

**Keterangan Field**:
- `stock` (required, integer, min: 0) - Jumlah stok baru untuk produk

### Contoh Request
```
PUT /api/products/1/stock
```
Body:
```json
{
    "stock": 150
}
```

### Contoh Response Berhasil (200 OK)
```json
{
    "success": true,
    "message": "Stock updated successfully",
    "data": {
        "id": 1,
        "name": "Laptop HP Pavilion",
        "category": "Electronics",
        "price": "100.00",
        "stock": 150,
        "status": "active",
        "created_at": "2025-11-17T02:48:00.000000Z",
        "updated_at": "2025-11-17T05:30:00.000000Z"
    }
}
```

### Contoh Response Gagal - Produk Tidak Ditemukan (404 Not Found)
```json
{
    "success": false,
    "message": "Product not found",
    "data": null
}
```

### Contoh Response Gagal - Validasi (422 Unprocessable Entity)
```json
{
    "message": "The stock field is required.",
    "errors": {
        "stock": [
            "The stock field is required."
        ]
    }
}
```

### Contoh Response Gagal - Stok Negatif (422 Unprocessable Entity)
```json
{
    "message": "The stock field must be at least 0.",
    "errors": {
        "stock": [
            "The stock field must be at least 0."
        ]
    }
}
```

---

## Soal 4: Endpoint untuk Menghapus Seluruh Produk yang Stoknya Habis

### Nama Endpoint
```
DELETE /api/products/out-of-stock
```

### Method
`DELETE`

### Request Headers
```
Accept: application/json
```

### Deskripsi
Endpoint ini akan menghapus semua produk yang memiliki stok = 0 (habis) dari database secara permanen.

### Bentuk Response Berhasil (200 OK)

**Ketika ada produk yang dihapus**:
```json
{
    "success": true,
    "message": "Successfully deleted 5 products with zero stock",
    "deleted_count": 5
}
```

**Ketika tidak ada produk yang dihapus**:
```json
{
    "success": true,
    "message": "Successfully deleted 0 products with zero stock",
    "deleted_count": 0
}
```

### Contoh Skenario

**Sebelum menjalankan endpoint** (ada 3 produk dengan stok 0):
| ID | Nama Produk | Stok |
|----|-------------|------|
| 1  | Laptop HP   | 50   |
| 2  | Mouse       | 0    |
| 3  | Keyboard    | 0    |
| 4  | Monitor     | 25   |
| 5  | Speaker     | 0    |

**Response**:
```json
{
    "success": true,
    "message": "Successfully deleted 3 products with zero stock",
    "deleted_count": 3
}
```

**Setelah menjalankan endpoint** (produk dengan stok 0 sudah terhapus):
| ID | Nama Produk | Stok |
|----|-------------|------|
| 1  | Laptop HP   | 50   |
| 4  | Monitor     | 25   |

---

## Soal 5: API untuk Pencarian Produk Berdasarkan Nama (Query Parameter)

### Endpoint
```
GET /api/products/search
```

### Method
`GET`

### Query Parameters
- `name` (required, string) - Kata kunci pencarian nama produk

### Request Headers
```
Accept: application/json
```

### Contoh Request

**Request 1 - Mencari "laptop"**:
```
GET /api/products/search?name=laptop
```

**Request 2 - Mencari "mouse"**:
```
GET /api/products/search?name=mouse
```

**Request 3 - Mencari dengan spasi**:
```
GET /api/products/search?name=wireless%20keyboard
```
(Note: %20 adalah encoding untuk spasi di URL)

### Contoh Response

**Response Berhasil - Produk Ditemukan (200 OK)**:
```json
{
    "success": true,
    "message": "Products found",
    "data": [
        {
            "id": 1,
            "name": "Laptop HP Pavilion",
            "category": "Electronics",
            "price": "1200.00",
            "stock": 50,
            "status": "active",
            "created_at": "2025-11-17T02:48:00.000000Z",
            "updated_at": "2025-11-17T02:48:00.000000Z"
        },
        {
            "id": 5,
            "name": "Laptop Dell Inspiron",
            "category": "Electronics",
            "price": "1500.00",
            "stock": 30,
            "status": "active",
            "created_at": "2025-11-17T03:00:00.000000Z",
            "updated_at": "2025-11-17T03:00:00.000000Z"
        },
        {
            "id": 8,
            "name": "Laptop Asus ROG",
            "category": "Electronics",
            "price": "2000.00",
            "stock": 15,
            "status": "active",
            "created_at": "2025-11-17T03:30:00.000000Z",
            "updated_at": "2025-11-17T03:30:00.000000Z"
        }
    ]
}
```

**Response Berhasil - Produk Tidak Ditemukan (200 OK)**:
```json
{
    "success": true,
    "message": "Products found",
    "data": []
}
```

**Response Gagal - Parameter Tidak Ada (400 Bad Request)**:
```json
{
    "success": false,
    "message": "Search query parameter \"name\" is required",
    "data": []
}
```

### Cara Kerja Pencarian
- Pencarian menggunakan operator `LIKE` dengan wildcard (`%`)
- Tidak case-sensitive (tidak membedakan huruf besar/kecil)
- Mencari substring di dalam nama produk

**Contoh**:
- Query: `?name=lap` → Akan menemukan "Laptop HP", "Laptop Dell"
- Query: `?name=HP` → Akan menemukan "Laptop HP", "Printer HP"
- Query: `?name=wireless` → Akan menemukan "Mouse Wireless", "Keyboard Wireless"

---

## Rangkuman Endpoint yang Telah Dibuat

| No | Endpoint | Method | Deskripsi |
|----|----------|--------|-----------|
| 1  | `/api/categories` | POST | Tambah kategori baru |
| 2  | `/api/transactions` | GET | Daftar transaksi pembelian |
| 3  | `/api/products/{id}/stock` | PUT | Update stok produk |
| 4  | `/api/products/out-of-stock` | DELETE | Hapus produk stok habis |
| 5  | `/api/products/search` | GET | Cari produk berdasarkan nama |

## Cara Testing dengan Postman

1. Import file `Product_Service_API.postman_collection.json`
2. Pastikan Laravel server berjalan (`php artisan serve`)
3. Test setiap endpoint sesuai nomor soal
4. Screenshot response untuk dokumentasi

## File Pendukung

- `API_DOCUMENTATION.md` - Dokumentasi lengkap semua endpoint
- `POSTMAN_BEGINNER_GUIDE.md` - Panduan Postman untuk pemula
- `Product_Service_API.postman_collection.json` - Collection untuk import ke Postman

---

**Catatan**: Semua endpoint sudah dibuat dan siap digunakan. Database migrations juga sudah dijalankan. Anda tinggal testing menggunakan Postman.
