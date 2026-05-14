---
description: 
---

# Chibi Fluff API - Frontend Contract

This document provides a comprehensive overview of the Chibi Fluff backend API to assist the frontend development team in integrating with the system.

## 1. Global Configuration & Authentication

*   **Base URL (Local)**: `http://localhost:8080`
*   **Authentication**: The API uses standard **JWT Bearer Token** authentication. 
*   **Headers**: For secured routes (marked below), the frontend must include the JWT token in the HTTP Headers:
    ```http
    Authorization: Bearer <your_jwt_token_here>
    ```
*   **JSON Policy**: All JSON payloads are strictly **camelCase**.

---

## 2. Endpoint Dictionary

### 2.1 Authentication & Identity

These endpoints handle user registration, login, and social authentication.

| HTTP Method | Route | Security | Description |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/auth/login` | Public | **Stubbed**: Generates a test JWT for any email/password. |
| `POST` | `/api/auth/google-callback` | Public | Validates a Google ID Token and issues a Chibi Fluff session. |
| `POST` | `/register` | Public | ASP.NET Identity: Register a new user. |
| `POST` | `/login` | Public | ASP.NET Identity: Login with email/password. |
| `POST` | `/refresh` | Public | ASP.NET Identity: Refresh the session token. |
| `GET` | `/manage/info` | Secured | ASP.NET Identity: Get or update user account info. |

#### `POST /api/auth/google-callback`
*   **Request Body**: `{ "idToken": "string" }`
*   **Success (200 OK)**:
    ```json
    {
      "token": "JWT_STRING",
      "user": {
        "id": "guid",
        "email": "string",
        "fullName": "string",
        "profilePicture": "url"
      }
    }
    ```

---

### 2.2 Catalog (Products)

Publicly accessible product data and Admin-only management.

| HTTP Method | Route | Security | Description |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/products` | Public | Retrieves all available products and their variants. |
| `GET` | `/api/products/{id}`| Public | Retrieves a specific product by its ID. |
| `POST` | `/api/products` | Admin | Creates a new product. |
| `POST` | `/api/products/{id}/variants` | Admin | Adds a new variant (size/color) to an existing product. |

---

### 2.3 Shopping Cart

All endpoints require a valid JWT. User ID is extracted from claims.

| HTTP Method | Route | Security | Description |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/cart` | Secured | Retrieves the current user's active cart. |
| `POST` | `/api/cart/budget` | Secured | Sets the maximum budget for the cart. |
| `POST` | `/api/cart/items` | Secured | Adds a product variant to the cart. |
| `DELETE` | `/api/cart/items/{itemId}` | Secured | Removes a specific item from the cart. |
| `PUT` | `/api/cart/items/{itemId}/quantity` | Secured | Updates the quantity of a cart item. |
| `POST` | `/api/cart/surprise` | Secured | Activates "Surprise Box" mode based on remaining budget. |

---

### 2.4 Budget Box & Reviews

| HTTP Method | Route | Security | Description |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/budget/categories` | Public | Returns available categories for budget allocation. |
| `GET` | `/api/reviews` | Public | Returns a list of recent product reviews for the landing page. |

---

### 2.5 Orders & Checkout

| HTTP Method | Route | Security | Description |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/orders/checkout` | Secured | Converts the current cart into a finalized order. |
| `GET` | `/api/orders` | Secured | Retrieves the order history for the current user. |
| `GET` | `/api/orders/{id}` | Secured | Retrieves details for a specific order. |

---

### 2.6 Users & Pets

| HTTP Method | Route | Security | Description |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/users/pets` | Secured | Registers a new pet to the user's profile. |
| `GET` | `/api/users/pets` | Secured | Retrieves all pets associated with the current user. |

---

### 2.7 Administration & Inventory

| HTTP Method | Route | Security | Description |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/inventory/{variantId}/add` | Admin | Adds physical stock quantity for a variant. |
| `POST` | `/api/admin/products/upload` | Admin | Uploads a product image to Cloudinary. |

---

## 3. Data Models

### Money
```json
{
  "amount": 29.99,
  "currency": "USD"
}
```

### Product
```json
{
  "id": "guid",
  "name": "string",
  "description": "string",
  "basePrice": { "amount": 0, "currency": "MYR" },
  "imageUrl": "url",
  "isPork": false,
  "variants": []
}
```

### Cart
```json
{
  "id": "guid",
  "userId": "guid",
  "budgetBox": {
    "budgetTargetAmount": 30.00,
    "currency": "MYR",
    "mode": "DIY"
  },
  "items": [
    {
      "id": "guid",
      "productVariantId": "guid",
      "productName": "string",
      "variantName": "string",
      "quantity": 1,
      "price": 15.00,
      "unitPriceCurrency": "MYR",
      "weightGrams": 100,
      "isPartOfBox": true,
      "isSurpriseOrder": false,
      "isPork": false,
      "ingredientType": "Standard",
      "lineTotalAmount": 15.00
    }
  ],
  "price": 15.00,
  "canCheckout": false
}
```
