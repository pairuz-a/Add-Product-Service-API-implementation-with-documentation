# 🚀 Quick Start - Testing JWT Authentication

## ✅ What I've Done For You

I've implemented JWT-like authentication using **Laravel Sanctum**. Everything is ready to test!

### Files Created/Modified:
1. ✅ `app/Http/Controllers/Api/AuthController.php` - Auth controller
2. ✅ `app/Models/User.php` - Added HasApiTokens trait
3. ✅ `routes/api.php` - Added auth routes
4. ✅ `Product_Service_API.postman_collection.json` - Added auth endpoints
5. ✅ `JWT_AUTHENTICATION_GUIDE.md` - Complete guide

---

## 🎯 5 New Auth Endpoints

| Endpoint | Method | Auth Required | Description |
|----------|--------|---------------|-------------|
| `/api/auth/register` | POST | No | Create account |
| `/api/auth/login` | POST | No | Get token |
| `/api/auth/user` | GET | Yes | Get profile |
| `/api/auth/logout` | POST | Yes | Revoke current token |
| `/api/auth/logout-all` | POST | Yes | Revoke all tokens |

---

## 🧪 Test Now in 3 Steps

### Step 1: Import Updated Collection
1. Open Postman
2. Delete old "Product Service API" collection
3. Click "Import"
4. Select `Product_Service_API.postman_collection.json`
5. You'll see new "0. Authentication" folder

### Step 2: Register a User
```
POST http://localhost:8000/api/auth/register

Body (JSON):
{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123",
    "password_confirmation": "password123"
}
```

**Copy the token from response!**

### Step 3: Test Protected Endpoint
```
GET http://localhost:8000/api/auth/user

Headers:
Authorization: Bearer YOUR_TOKEN_HERE
```

---

## 🔑 How to Use Token in Postman

### Method 1: Manual (Simple)
1. Go to any request
2. Click "Headers" tab
3. Add header:
   - Key: `Authorization`
   - Value: `Bearer YOUR_TOKEN_HERE` (replace with actual token)

### Method 2: Collection Variable (Recommended)
1. After login/register, **copy the token**
2. Click on "Product Service API" collection
3. Go to "Variables" tab
4. Add variable:
   - Variable: `auth_token`
   - Initial Value: `YOUR_TOKEN_HERE`
   - Current Value: `YOUR_TOKEN_HERE`
5. Save
6. In requests, use: `Authorization: Bearer {{auth_token}}`

---

## 📋 Complete Testing Flow

### 1. Register New User
```bash
POST /api/auth/register
{
    "name": "Test User",
    "email": "test@example.com",
    "password": "password123",
    "password_confirmation": "password123"
}
```

**Response:**
```json
{
    "success": true,
    "message": "User registered successfully",
    "data": {
        "user": {...},
        "token": "1|abc123xyz..."  ← COPY THIS!
    }
}
```

---

### 2. Login (Alternative to Register)
```bash
POST /api/auth/login
{
    "email": "test@example.com",
    "password": "password123"
}
```

---

### 3. Get User Profile (Protected)
```bash
GET /api/auth/user
Headers:
  Authorization: Bearer 1|abc123xyz...
```

---

### 4. Test Protected Product API
```bash
POST /api/products
Headers:
  Authorization: Bearer 1|abc123xyz...
Body:
{
    "name": "New Product",
    "price": 100,
    "stock": 50
}
```

---

### 5. Logout
```bash
POST /api/auth/logout
Headers:
  Authorization: Bearer 1|abc123xyz...
```

---

## 🛡️ Making APIs Protected (Optional)

Want to require authentication for some endpoints? Add middleware:

### Option A: Protect Individual Routes
```php
Route::post('/products', [ProductApiController::class, 'store'])
    ->middleware('auth:sanctum');
```

### Option B: Protect Multiple Routes
```php
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/products', [ProductApiController::class, 'store']);
    Route::put('/products/{id}/stock', [ProductApiController::class, 'updateStock']);
    Route::delete('/products/out-of-stock', [ProductApiController::class, 'deleteOutOfStock']);
});
```

**Current Status:** All product/category/transaction APIs are **public** (no auth required). You can add protection as needed.

---

## ❌ Common Errors & Solutions

### "Unauthenticated" (401)
**Problem:** Token not provided or invalid

**Solutions:**
- Make sure you copied the full token
- Check Authorization header format: `Bearer {token}`
- Try logging in again for new token

---

### "The email has already been taken"
**Problem:** Email already registered

**Solutions:**
- Use different email
- Or login with existing credentials

---

### "Invalid credentials" (401)
**Problem:** Wrong email or password

**Solutions:**
- Check email/password spelling
- Make sure you registered first

---

### "Route not found" (404)
**Problem:** Wrong URL

**Solutions:**
- Make sure server is running: `php artisan serve`
- Check URL: `http://localhost:8000/api/auth/...`

---

## 📱 Real-World Usage

### For Mobile Apps:
1. User registers/logs in
2. Save token to device storage (SharedPreferences/UserDefaults)
3. Include token in all API calls
4. If 401 error, delete token & show login screen

### For Web Apps:
1. User logs in
2. Save token to `localStorage` or cookie
3. Include token in fetch/axios headers
4. If 401 error, redirect to login page

---

## 🎓 Understanding Token Authentication

### What is a Token?
A long string that proves you're logged in. Example:
```
1|abc123xyz789longrandomstring...
```

### Why Use Tokens?
- ✅ Stateless (no server-side sessions)
- ✅ Perfect for mobile apps
- ✅ Scalable
- ✅ Secure when used with HTTPS

### Token vs Session
| Feature | Token (JWT/Sanctum) | Session/Cookie |
|---------|---------------------|----------------|
| Storage | Client-side | Server-side |
| Mobile Apps | ✅ Perfect | ❌ Difficult |
| Scalability | ✅ High | ⚠️ Medium |
| API-first | ✅ Yes | ❌ No |

---

## 🔐 Security Best Practices

1. ✅ **Use HTTPS** in production (not HTTP)
2. ✅ **Don't commit tokens** to git
3. ✅ **Set token expiration** (see guide)
4. ✅ **Validate all input**
5. ✅ **Use strong passwords**
6. ✅ **Implement rate limiting**
7. ✅ **Add password reset** (for production)

---

## 📚 Learn More

Read the detailed guide: **`JWT_AUTHENTICATION_GUIDE.md`**

It includes:
- How authentication works
- Request/response examples
- Protecting routes
- Token expiration
- Error handling
- Best practices

---

## ✨ Quick Commands

```bash
# Check if routes exist
php artisan route:list --path=api/auth

# Clear cache (if issues)
php artisan config:clear
php artisan cache:clear

# Run migrations (if needed)
php artisan migrate
```

---

## 🎉 You Now Have

- ✅ User registration
- ✅ User login with token
- ✅ Token-based authentication
- ✅ User profile endpoint
- ✅ Logout functionality
- ✅ Multi-device logout
- ✅ Ready-to-use Postman collection

**Time to test:** 5 minutes  
**Difficulty:** Easy  
**Ready to demo:** Yes!

---

Start with **Register** → **Login** → **Get Profile** in Postman! 🚀
