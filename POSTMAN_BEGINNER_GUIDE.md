# POSTMAN QUICK START GUIDE - FOR BEGINNERS

## What You Need to Know

### What is an API?
API (Application Programming Interface) is a way for different software to communicate. Think of it like a waiter in a restaurant:
- You (client) ask the waiter for food
- Waiter takes your order to the kitchen (server)
- Kitchen prepares the food
- Waiter brings back your food (response)

### HTTP Methods (Like different types of requests):
- **GET** = "Show me" (Read data)
- **POST** = "Create this" (Create new data)
- **PUT** = "Update this" (Modify existing data)
- **DELETE** = "Remove this" (Delete data)

---

## Step-by-Step: Your First API Test

### STEP 1: Install Postman
1. Go to https://www.postman.com/downloads/
2. Download for your OS (Windows/Mac/Linux)
3. Install and open Postman
4. You can skip sign-in and click "Skip and go to the app"

### STEP 2: Start Your Laravel Server
Open terminal and run:
```bash
cd /home/ariochi/Desktop/projects/magang-wesclic/magang-14-11-2025
php artisan serve
```

You should see: "Server running on [http://127.0.0.1:8000]"
**KEEP THIS TERMINAL OPEN!**

### STEP 3: Import the Collection (Easy Way)
1. In Postman, click "Import" button (top left)
2. Click "Upload Files"
3. Select file: `Product_Service_API.postman_collection.json`
4. Click "Import"
5. You'll see "Product Service API" in the left sidebar

---

## Testing Each API Endpoint

### TEST 1: Get All Products (GET Request)

**Goal**: See all products in database

**Steps**:
1. In Postman, click "Product Service API" → "3. Products" → "Get All Products"
2. You'll see the request is already set up:
   - Method: GET
   - URL: http://localhost:8000/api/products
3. Click the blue "Send" button
4. Look at the bottom panel for the response

**What You Should See**:
```json
{
    "success": true,
    "message": "Products retrieved successfully",
    "data": [
        {
            "id": 1,
            "name": "Hel",
            "category": null,
            "price": "25.00",
            "stock": 2,
            "status": "active"
        }
    ]
}
```

✅ **Success!** You just made your first API call!

---

### TEST 2: Create a Category (POST Request)

**Goal**: Add a new product category

**Steps**:
1. Click "1. Categories" → "Create Category"
2. Notice:
   - Method: POST
   - URL: http://localhost:8000/api/categories
   - Body tab is selected with JSON
3. You'll see this in the Body:
```json
{
    "name": "Electronics",
    "description": "Electronic products and gadgets"
}
```
4. Click "Send"

**What You Should See**:
```json
{
    "success": true,
    "message": "Category created successfully",
    "data": {
        "id": 1,
        "name": "Electronics",
        "description": "Electronic products and gadgets",
        "created_at": "2025-11-17T02:48:00.000000Z",
        "updated_at": "2025-11-17T02:48:00.000000Z"
    }
}
```

✅ **Success!** You created a new category!

**Try Again**: Change the name to "Furniture" and description, then Send again.

---

### TEST 3: Update Product Stock (PUT Request)

**Goal**: Change the stock quantity of a product

**Steps**:
1. First, make sure you have a product (use GET /api/products to check)
2. Note the product ID (let's say it's 1)
3. Click "3. Products" → "Update Product Stock"
4. In the URL, change the number to your product ID:
   - `http://localhost:8000/api/products/1/stock`
5. In the Body, you'll see:
```json
{
    "stock": 100
}
```
6. Change 100 to any number you want (e.g., 50)
7. Click "Send"

**What You Should See**:
```json
{
    "success": true,
    "message": "Stock updated successfully",
    "data": {
        "id": 1,
        "name": "Hel",
        "stock": 50,
        ...
    }
}
```

✅ **Success!** You updated the stock!

---

### TEST 4: Search Products (GET with Query Parameters)

**Goal**: Find products by name

**Steps**:
1. Click "3. Products" → "Search Products by Name"
2. Look at the URL: `http://localhost:8000/api/products/search?name=laptop`
3. Click on "Params" tab (next to Headers)
4. You'll see:
   - Key: `name`
   - Value: `laptop`
5. Change the value to search for something else (e.g., "Hel")
6. Click "Send"

**What You Should See**:
```json
{
    "success": true,
    "message": "Products found",
    "data": [
        {
            "id": 1,
            "name": "Hel",
            ...
        }
    ]
}
```

**Try This**:
- Search for "xyz" (product that doesn't exist) → You'll get empty array
- Remove the name parameter → You'll get an error message

---

### TEST 5: Delete Out of Stock Products (DELETE Request)

**Goal**: Remove all products with 0 stock

**Steps**:
1. First, update a product to have 0 stock (use Update Stock API)
2. Click "3. Products" → "Delete Out of Stock Products"
3. Click "Send"

**What You Should See**:
```json
{
    "success": true,
    "message": "Successfully deleted 1 products with zero stock",
    "deleted_count": 1
}
```

⚠️ **Warning**: This will permanently delete products!

---

## Understanding the Postman Interface

### Main Parts:
```
┌─────────────────────────────────────────┐
│  [Method ▼] [URL Bar]           [Send]  │ ← Top: Request setup
├─────────────────────────────────────────┤
│  Params | Headers | Body | Settings     │ ← Tabs: Request details
│                                          │
│  (Your request data goes here)          │
│                                          │
├─────────────────────────────────────────┤
│  Body | Cookies | Headers | Test        │ ← Bottom: Response
│                                          │
│  (Server response shows here)           │
└─────────────────────────────────────────┘
```

### Request Tabs:
- **Params**: For URL parameters (like ?name=laptop)
- **Headers**: For metadata (like Content-Type)
- **Body**: For data you're sending (POST/PUT)

### Response Tabs:
- **Body**: The actual data returned
- **Headers**: Metadata from server
- **Test Results**: If you write tests

---

## Common Mistakes & Solutions

### ❌ Error: "Could not get any response"
**Solution**: Make sure your Laravel server is running (`php artisan serve`)

### ❌ Error: "404 Not Found"
**Solution**: Check the URL. Make sure it matches your routes in `routes/api.php`

### ❌ Error: "500 Internal Server Error"
**Solution**: Check Laravel logs in `storage/logs/laravel.log`

### ❌ Error: "The name field is required"
**Solution**: You're missing required data in the Body. Check the JSON format.

### ❌ Response is HTML instead of JSON
**Solution**: Add header `Accept: application/json`

---

## Creating Your Own Request (Manual)

### For GET Request:
1. Click "New" → "HTTP Request"
2. Set method to "GET"
3. Enter URL: `http://localhost:8000/api/products`
4. Add Header: Key=`Accept`, Value=`application/json`
5. Click "Send"

### For POST Request:
1. Click "New" → "HTTP Request"
2. Set method to "POST"
3. Enter URL: `http://localhost:8000/api/categories`
4. Add Headers:
   - Key=`Accept`, Value=`application/json`
   - Key=`Content-Type`, Value=`application/json`
5. Click "Body" tab → "raw" → Select "JSON"
6. Paste your JSON data:
```json
{
    "name": "Test Category",
    "description": "This is a test"
}
```
7. Click "Send"

---

## Tips for Learning

1. **Start Simple**: Always test GET requests first
2. **Read Responses**: Pay attention to success/error messages
3. **Use Collections**: Save your requests for later
4. **Experiment**: Change values and see what happens
5. **Check Status Codes**:
   - 200 = OK
   - 201 = Created
   - 404 = Not Found
   - 422 = Validation Error

---

## Answering Your Assignment Questions

### 1. Rancangan Endpoint Kategori Produk Baru
**Method**: POST
**Endpoint**: `/api/categories`
**Request Body**:
```json
{
    "name": "Electronics",
    "description": "Electronic products"
}
```
**Response**: See "Create Category" in Postman

### 2. API Daftar Transaksi
**Method**: GET
**Endpoint**: `/api/transactions`
**Response**: See "Get All Transactions" in Postman

### 3. Update Stok Produk
**Method**: PUT
**Endpoint**: `/api/products/{id}/stock`
**Body**: `{"stock": 100}`
**Response**: See "Update Product Stock" in Postman

### 4. Hapus Produk Stok Habis
**Method**: DELETE
**Endpoint**: `/api/products/out-of-stock`
**Response**: See "Delete Out of Stock Products" in Postman

### 5. Pencarian Produk
**Method**: GET
**Endpoint**: `/api/products/search?name=laptop`
**Response**: See "Search Products" in Postman

---

## Next Steps

1. Test all 5 endpoints required for your assignment
2. Take screenshots of successful responses
3. Document the Request Body and Response for each
4. Try error cases (missing data, wrong ID, etc.)

**Good luck with your assignment! 🚀**
