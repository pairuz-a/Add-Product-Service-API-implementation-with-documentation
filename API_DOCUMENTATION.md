# API Documentation & Postman Tutorial

## Tutorial: Testing APIs with Postman

### What is Postman?
Postman is a tool for testing APIs. It allows you to send HTTP requests (GET, POST, PUT, DELETE) to your API endpoints and see the responses.

### Download Postman
1. Go to https://www.postman.com/downloads/
2. Download and install Postman for your operating system

---

## API Endpoints Documentation

### Base URL
```
http://localhost:8000/api
```

---

## 1. Add New Product Category (CREATE)

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

### Request Body (JSON)
```json
{
    "name": "Electronics",
    "description": "Electronic products and gadgets"
}
```

### Success Response (201 Created)
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

### Error Response (400 Bad Request)
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

### How to Test in Postman:
1. Open Postman
2. Click "New" → "HTTP Request"
3. Set method to `POST`
4. Enter URL: `http://localhost:8000/api/categories`
5. Click "Headers" tab:
   - Add: `Content-Type` = `application/json`
   - Add: `Accept` = `application/json`
6. Click "Body" tab:
   - Select "raw"
   - Select "JSON" from dropdown
   - Paste the Request Body JSON
7. Click "Send"

---

## 2. Display List of Product Purchase Transactions

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

### Success Response (200 OK)
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
                "name": "Laptop HP",
                "category": "Electronics",
                "price": "100.00",
                "stock": 45,
                "status": "active"
            }
        },
        {
            "id": 2,
            "product_id": 2,
            "quantity": 3,
            "total_price": "150.00",
            "customer_name": "Jane Smith",
            "created_at": "2025-11-17T03:00:00.000000Z",
            "updated_at": "2025-11-17T03:00:00.000000Z",
            "product": {
                "id": 2,
                "name": "Mouse Wireless",
                "category": "Electronics",
                "price": "50.00",
                "stock": 97,
                "status": "active"
            }
        }
    ]
}
```

### How to Test in Postman:
1. Create new request
2. Set method to `GET`
3. Enter URL: `http://localhost:8000/api/transactions`
4. Add Header: `Accept` = `application/json`
5. Click "Send"

---

## 3. Update Product Stock by ID

### Endpoint
```
PUT /api/products/{id}/stock
```

### Method
`PUT`

### URL Parameters
- `{id}` - Product ID (integer)

### Request Headers
```
Content-Type: application/json
Accept: application/json
```

### Request Body (JSON)
```json
{
    "stock": 100
}
```

### Success Response (200 OK)
```json
{
    "success": true,
    "message": "Stock updated successfully",
    "data": {
        "id": 1,
        "name": "Laptop HP",
        "category": "Electronics",
        "price": "100.00",
        "stock": 100,
        "status": "active",
        "created_at": "2025-11-17T02:48:00.000000Z",
        "updated_at": "2025-11-17T03:15:00.000000Z"
    }
}
```

### Error Response - Product Not Found (404)
```json
{
    "success": false,
    "message": "Product not found",
    "data": null
}
```

### Error Response - Validation Failed (422)
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

### How to Test in Postman:
1. Create new request
2. Set method to `PUT`
3. Enter URL: `http://localhost:8000/api/products/1/stock` (replace 1 with actual product ID)
4. Add Headers:
   - `Content-Type` = `application/json`
   - `Accept` = `application/json`
5. Click "Body" → "raw" → "JSON"
6. Paste the Request Body JSON
7. Click "Send"

---

## 4. Delete All Products with Zero Stock

### Endpoint
```
DELETE /api/products/out-of-stock
```

### Method
`DELETE`

### Request Headers
```
Accept: application/json
```

### Success Response (200 OK)
```json
{
    "success": true,
    "message": "Successfully deleted 3 products with zero stock",
    "deleted_count": 3
}
```

### Success Response - No Products Deleted (200 OK)
```json
{
    "success": true,
    "message": "Successfully deleted 0 products with zero stock",
    "deleted_count": 0
}
```

### How to Test in Postman:
1. Create new request
2. Set method to `DELETE`
3. Enter URL: `http://localhost:8000/api/products/out-of-stock`
4. Add Header: `Accept` = `application/json`
5. Click "Send"

---

## 5. Search Products by Name (Query Parameter)

### Endpoint
```
GET /api/products/search?name={search_term}
```

### Method
`GET`

### Query Parameters
- `name` (required) - Search term for product name

### Request Headers
```
Accept: application/json
```

### Example Request URL
```
http://localhost:8000/api/products/search?name=laptop
```

### Success Response (200 OK)
```json
{
    "success": true,
    "message": "Products found",
    "data": [
        {
            "id": 1,
            "name": "Laptop HP",
            "category": "Electronics",
            "price": "100.00",
            "stock": 50,
            "status": "active",
            "created_at": "2025-11-17T02:48:00.000000Z",
            "updated_at": "2025-11-17T02:48:00.000000Z"
        },
        {
            "id": 3,
            "name": "Laptop Dell",
            "category": "Electronics",
            "price": "120.00",
            "stock": 30,
            "status": "active",
            "created_at": "2025-11-17T02:50:00.000000Z",
            "updated_at": "2025-11-17T02:50:00.000000Z"
        }
    ]
}
```

### Error Response - Missing Query Parameter (400)
```json
{
    "success": false,
    "message": "Search query parameter \"name\" is required",
    "data": []
}
```

### Success Response - No Products Found (200 OK)
```json
{
    "success": true,
    "message": "Products found",
    "data": []
}
```

### How to Test in Postman:
1. Create new request
2. Set method to `GET`
3. Enter URL: `http://localhost:8000/api/products/search`
4. Click "Params" tab
5. Add Key: `name`, Value: `laptop` (or any search term)
6. Add Header: `Accept` = `application/json`
7. Click "Send"

---

## Additional Endpoints

### Get All Categories
```
GET /api/categories
```

### Get All Products
```
GET /api/products
```

### Create Transaction
```
POST /api/transactions
```
Body:
```json
{
    "product_id": 1,
    "quantity": 5,
    "total_price": 500.00,
    "customer_name": "John Doe"
}
```

---

## Common HTTP Status Codes

- **200 OK** - Request successful
- **201 Created** - Resource created successfully
- **400 Bad Request** - Invalid request (missing parameters)
- **404 Not Found** - Resource not found
- **422 Unprocessable Entity** - Validation failed
- **500 Internal Server Error** - Server error

---

## Tips for Using Postman

1. **Save your requests**: Click "Save" to organize requests in collections
2. **Use Variables**: Set base URL as variable for easy switching between environments
3. **Test tab**: Write automated tests for your APIs
4. **History**: Access previous requests from the History tab
5. **Documentation**: Generate API documentation from your Postman collections

---

## Testing Order (Recommended)

1. First, test GET endpoints to see current data
2. Test POST to create new data
3. Test PUT to update data
4. Test DELETE to remove data
5. Test error cases (invalid data, missing parameters)

---

## Before Testing

Make sure your Laravel development server is running:
```bash
php artisan serve
```

The server should be available at: http://localhost:8000
