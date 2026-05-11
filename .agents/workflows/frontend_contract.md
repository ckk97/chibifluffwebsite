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

| HTTP Method | Route | Security | Description |
| :--- | :--- | :--- | :--- |
| **Authentication** | | | |
| `POST` | `/api/auth/login` | Public | Generates a valid JWT for testing secured routes. |
| **Catalog** | | | |
| `GET` | `/api/products` | Public | Retrieves all available products and their variants. |
| `GET` | `/api/products/{id}`| Public | Retrieves a specific product by its ID. |
| **Shopping Cart & Budget** | | | |
| `GET` | `/api/budget/categories` | Public | Retrieves all active, predefined budget tiers (e.g. $50, $100). |
| `GET` | `/api/cart` | Secured | Retrieves the authenticated user's current shopping cart. |
| `POST` | `/api/cart/budget` | Secured | Sets the Budget Target amount and Mode (DIY / Surprise Me). |
| `POST` | `/api/cart/items` | Secured | Adds a product variant to the cart. |
| `PUT` | `/api/cart/items/{id}/quantity`| Secured | Updates the quantity of a specific cart item. |
| `DELETE` | `/api/cart/items/{id}`| Secured | Removes a specific item from the cart. |
| `POST` | `/api/cart/surprise` | Secured | Activates the 'Surprise Me' box curation mode. |
| **Orders** | | | |
| `POST` | `/api/orders/checkout` | Secured | Converts the active cart into a confirmed Order. |
| `GET` | `/api/orders` | Secured | Retrieves all past orders for the authenticated user. |
| `GET` | `/api/orders/{id}` | Secured | Retrieves details for a specific order. |
| **Reviews** | | | |
| `GET` | `/api/reviews` | Public | Retrieves recent customer reviews. |
| **Pet Registry** | | | |
| `POST` | `/api/users/pets` | Secured | Registers a new pet for the authenticated user. |
| `GET` | `/api/users/pets` | Secured | Retrieves all pets registered by the authenticated user. |

---

## 3. Data Contracts (Payloads)

### 🔑 Authentication

#### Request: Login (Stub)
```json
// POST /api/auth/login
{
  "email": "user@example.com",
  "password": "password123"
}
```

#### Response: JWT Token
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### 🛍️ Catalog

#### Response: Product Detail
Note: `isPork` is calculated server-side based on the `ingredientType`. `price` naming is simplified for frontend consumption.
```json
// GET /api/products/{id}
{
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "name": "Premium Pork Jerky",
  "description": "Slow-roasted, locally sourced pork treats.",
  "imageUrl": "https://cdn.chibifluff.com/products/pork-jerky.jpg",
  "isPork": true,
  "ingredients": ["Pork", "Salt"],
  "variants": [
    {
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "name": "50g Pack",
      "weightGrams": 50,
      "price": 15.00,
      "priceCurrency": "MYR",
      "isActive": true
    }
  ]
}
```

### 🛒 Shopping Cart & Budget Box

#### Request: Set Budget
When the user defines their spending limit for a custom treat box. Mode can be `0` (DIY) or `1` (SurpriseMe).
```json
// POST /api/cart/budget
{
  "budgetTargetAmount": 50.00,
  "mode": 0 
}
```

#### Request: Add Item to Cart
```json
// POST /api/cart/items
{
  "productId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "productVariantId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "quantity": 2,
  "isInBudgetBox": true
}
```

#### Request: Update Quantity
```json
// PUT /api/cart/items/{id}/quantity
{
  "newQuantity": 3
}
```

#### Response: Cart State
**CRITICAL**: The `canCheckout` boolean is strictly enforced by the server. It will only be `true` if `Price == BudgetTargetAmount` when a budget is set.
```json
// GET /api/cart
{
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "budgetBox": {
    "budgetTargetAmount": 50.00,
    "currency": "MYR",
    "mode": 0
  },
  "items": [
    {
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "productVariantId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "productName": "Beef Jerky",
      "variantName": "50g",
      "quantity": 2,
      "price": 15.00,
      "isInBudgetBox": true,
      "isSurpriseOrder": false,
      "ingredientType": 0,
      "lineTotalAmount": 30.00
    }
  ],
  "price": 30.00,
  "canCheckout": false 
}
```

### ⭐ Reviews

#### Response: Review Item
```json
// GET /api/reviews
[
  {
    "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "petName": "Mochi",
    "petType": "Dog",
    "petImageUri": "https://cdn.chibifluff.com/pets/mochi.jpg",
    "rating": 5,
    "comment": "My puppy loves these treats!",
    "reviewImageUrl": "https://cdn.chibifluff.com/reviews/happy-pomeranian.jpg",
    "createdAtUtc": "2026-05-09T12:00:00Z"
  }
]
```

### 🐾 Pet Registry

#### Request: Register Pet
```json
// POST /api/users/pets
{
  "name": "Mochi",
  "type": 0, // 0 = Dog, 1 = Cat, 2 = Other
  "breed": "Pomeranian",
  "age": 3,
  "imageUri": "https://cdn.chibifluff.com/pets/mochi.jpg"
}
```

---

## 4. Error Handling

The API strictly adheres to HTTP Status Codes. All domain logic errors are returned using the standard RFC 7807 **Problem Details** JSON format.

---

## 5. Frontend Gap Analysis (Updated)

1.  **`DELETE /api/cart` (Clear Cart)**
2.  **User Profile / Address Management**
3.  **Payment Gateway Handshake**
4.  **`POST /api/cart/promo` (Promo Codes)**
