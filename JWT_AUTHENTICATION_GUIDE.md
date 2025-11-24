# 🔐 JWT-like Authentication Guide with Laravel Sanctum

## What is JWT?
JWT (JSON Web Token) is a secure way to authenticate API requests. When a user logs in, they receive a token that must be included in all subsequent API requests.

## Why Sanctum Instead of JWT?
Laravel Sanctum is the official Laravel package for API authentication. It's:
- ✅ Already installed in your project
- ✅ Officially supported by Laravel
- ✅ Simpler to implement
- ✅ Works similar to JWT
- ✅ Perfect for mobile apps and SPAs

---

## 🚀 Implementation Steps

### Step 1: Publish Sanctum Configuration
```bash
php artisan vendor:publish --provider="Laravel\Sanctum\SanctumServiceProvider"
php artisan migrate
```

### Step 2: Add Sanctum to User Model
Already done! Your User model extends `Authenticatable` which includes `HasApiTokens` trait.

### Step 3: Create Authentication Controller
We'll create an API controller for:
- Register
- Login
- Logout
- Get user profile

### Step 4: Add Routes
Add authentication routes to `routes/api.php`

### Step 5: Protect Routes
Add middleware to routes that need authentication

---

## 📝 Files We'll Create/Modify

1. `app/Http/Controllers/Api/AuthController.php` - New
2. `routes/api.php` - Add auth routes
3. `Product_Service_API.postman_collection.json` - Add auth endpoints

---

## 🔑 How Authentication Works

### Registration Flow:
1. User sends: `name`, `email`, `password`
2. System creates user account
3. Returns: User data + Token

### Login Flow:
1. User sends: `email`, `password`
2. System validates credentials
3. Returns: User data + Token

### Protected API Flow:
1. Client sends request with header: `Authorization: Bearer {token}`
2. System validates token
3. If valid, process request
4. If invalid, return 401 Unauthorized

---

## 🎯 API Endpoints We'll Create

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/auth/register` | Create new account | No |
| POST | `/api/auth/login` | Login & get token | No |
| POST | `/api/auth/logout` | Logout & revoke token | Yes |
| GET | `/api/auth/user` | Get current user | Yes |

---

## 📋 Request/Response Examples

### 1. Register
**Request:**
```json
POST /api/auth/register
{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123",
    "password_confirmation": "password123"
}
```

**Response (201 Created):**
```json
{
    "success": true,
    "message": "User registered successfully",
    "data": {
        "user": {
            "id": 1,
            "name": "John Doe",
            "email": "john@example.com",
            "created_at": "2025-11-19T06:00:00.000000Z"
        },
        "token": "1|abc123xyz789token..."
    }
}
```

---

### 2. Login
**Request:**
```json
POST /api/auth/login
{
    "email": "john@example.com",
    "password": "password123"
}
```

**Response (200 OK):**
```json
{
    "success": true,
    "message": "Login successful",
    "data": {
        "user": {
            "id": 1,
            "name": "John Doe",
            "email": "john@example.com"
        },
        "token": "2|xyz789abc123token..."
    }
}
```

**Response (401 Unauthorized):**
```json
{
    "success": false,
    "message": "Invalid credentials"
}
```

---

### 3. Get User Profile
**Request:**
```
GET /api/auth/user
Headers:
  Authorization: Bearer 2|xyz789abc123token...
  Accept: application/json
```

**Response (200 OK):**
```json
{
    "success": true,
    "message": "User retrieved successfully",
    "data": {
        "id": 1,
        "name": "John Doe",
        "email": "john@example.com",
        "email_verified_at": null,
        "created_at": "2025-11-19T06:00:00.000000Z",
        "updated_at": "2025-11-19T06:00:00.000000Z"
    }
}
```

---

### 4. Logout
**Request:**
```
POST /api/auth/logout
Headers:
  Authorization: Bearer 2|xyz789abc123token...
  Accept: application/json
```

**Response (200 OK):**
```json
{
    "success": true,
    "message": "Logged out successfully"
}
```

---

## 🔒 Protecting Your Existing APIs

After implementing auth, protect your endpoints by adding `auth:sanctum` middleware:

```php
// Before (No Authentication)
Route::post('/products', [ProductApiController::class, 'store']);

// After (Requires Authentication)
Route::post('/products', [ProductApiController::class, 'store'])->middleware('auth:sanctum');
```

### Example Protected Routes:
```php
// Public routes (no auth needed)
Route::get('/products', [ProductApiController::class, 'index']);
Route::get('/products/search', [ProductApiController::class, 'search']);

// Protected routes (auth required)
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/products', [ProductApiController::class, 'store']);
    Route::put('/products/{id}/stock', [ProductApiController::class, 'updateStock']);
    Route::delete('/products/out-of-stock', [ProductApiController::class, 'deleteOutOfStock']);
    
    Route::post('/categories', [CategoryController::class, 'store']);
    Route::post('/transactions', [TransactionController::class, 'store']);
});
```

---

## 🧪 Testing with Postman

### Step 1: Register or Login
1. Send POST request to `/api/auth/register` or `/api/auth/login`
2. Copy the token from response

### Step 2: Use Token in Other Requests
1. Go to any protected endpoint (e.g., Create Product)
2. Click "Headers" tab
3. Add new header:
   - Key: `Authorization`
   - Value: `Bearer YOUR_TOKEN_HERE`
4. Send request

### Postman Pro Tip:
Save token as environment variable:
1. After login, go to "Tests" tab
2. Add script:
```javascript
var response = pm.response.json();
pm.environment.set("auth_token", response.data.token);
```
3. In other requests, use: `Bearer {{auth_token}}`

---

## ⚠️ Important Security Notes

1. **Never commit tokens** to version control
2. **Use HTTPS** in production (not HTTP)
3. **Set token expiration** for better security
4. **Validate input** to prevent injection attacks
5. **Hash passwords** (Laravel does this automatically)

---

## 🔄 Token Expiration (Optional)

By default, Sanctum tokens don't expire. To add expiration:

In `config/sanctum.php`:
```php
'expiration' => 60, // Token expires in 60 minutes
```

---

## 📱 Real-World Usage Example

### Mobile App Flow:
1. **User opens app** → Check if token exists locally
2. **No token** → Show login screen
3. **User logs in** → Save token to local storage
4. **All API calls** → Include token in Authorization header
5. **Token invalid/expired** → Redirect to login
6. **User logs out** → Delete token from local storage

### Web App Flow:
Same as mobile, but store token in:
- `localStorage` (persists after browser close)
- `sessionStorage` (cleared when tab closes)
- Cookie (if you prefer)

---

## 🐛 Common Errors & Solutions

### Error: "Unauthenticated" (401)
**Causes:**
- Token not provided
- Token expired
- Token format wrong (missing "Bearer ")
- Token revoked

**Solution:**
- Check Authorization header format: `Bearer {token}`
- Login again to get new token

### Error: "CSRF token mismatch" (419)
**Cause:** Sanctum CSRF protection

**Solution:**
In `config/sanctum.php`, ensure your API routes are in `stateful` domains:
```php
'stateful' => explode(',', env('SANCTUM_STATEFUL_DOMAINS', 'localhost,127.0.0.1')),
```

---

## 📚 Additional Resources

- [Laravel Sanctum Docs](https://laravel.com/docs/11.x/sanctum)
- [API Authentication Best Practices](https://www.oauth.com/oauth2-servers/access-tokens/)
- [Postman Authorization](https://learning.postman.com/docs/sending-requests/authorization/)

---

## 🎓 What You'll Learn

By implementing this, you'll understand:
- ✅ How token-based authentication works
- ✅ Protecting API endpoints
- ✅ User registration & login
- ✅ HTTP Authorization headers
- ✅ Middleware in Laravel
- ✅ Security best practices

---

## 🚀 Ready to Implement?

Follow the implementation steps in the next section!

**Time needed:** 15-20 minutes  
**Difficulty:** Intermediate  
**Prerequisites:** Basic Laravel knowledge
