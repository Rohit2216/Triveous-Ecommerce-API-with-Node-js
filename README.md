

---

# Triveous-Ecommerce-API-with-Node-js

The E-commerce API is built using Node.js and Express.js, with MongoDB as the database. This API provides various features for managing categories and products, user carts, placing orders, and user authentication using JWT tokens. It includes essential security measures such as authentication middleware and error handling.

## Tech Stack

- **Server:** Node.js, Express.js
- **Database:** MongoDB

## Installation

To run the API locally, follow these steps:

1. Clone the repository:

   ```bash
   git clone <repository-url>
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the server:

   ```bash
   npm run server
   ```

## API Reference

Certainly! Here are examples for each API route along with sample JSON payloads in table format:

### User

| Endpoint          | Method | Input (Example JSON) | Output (Example JSON) | Description |
|-------------------|--------|-----------------------|------------------------|-------------|
| `/user/register`  | POST   | ```json { "name": "John Doe", "email": "john@example.com", "password": "securepassword" }``` | ```json { "message": "User registered successfully" }``` | Allows users to register by providing their details. |
| `/user/login`     | POST   | ```json { "email": "user@example.com", "password": "password123" }``` | ```json { "token": "your.jwt.token", "userID": "user123" }``` | Allows users to log in by providing their email and password. |
| `/user/logout/:token` | POST   | JWT token (string) | ```json { "message": "Logout successful" }``` | Allows users to log out by blacklisting the provided JWT token. |

### Product

| Endpoint          | Method | Input (Example JSON) | Output (Example JSON) | Description |
|-------------------|--------|-----------------------|------------------------|-------------|
| `/product/add`    | POST   | ```json { "title": "Product 1", "price": 29.99, "description": "Product description", "availability": true, "category": "Electronics" }``` | ```json { "message": "Product added successfully" }``` | Allows authorized users to add a new product. |
| `/product/all`    | GET    | None | ```json [ {"_id": "product123", "title": "Product 1", "price": 29.99, "description": "Product description", "availability": true, "category": "Electronics" } ]``` | Allows users to retrieve a list of all available products. |
| `/product/category/:category` | GET | ```json { "category": "Electronics" }``` | ```json [ {"_id": "product123", "title": "Product 1", "price": 29.99, "description": "Product description", "availability": true, "category": "Electronics" } ]``` | Allows users to retrieve products by category. |
| `/product/:productId` | GET  | ```json { "productId": "product123" }``` | ```json {"_id": "product123", "title": "Product 1", "price": 29.99, "description": "Product description", "availability": true, "category": "Electronics" }``` | Allows users to retrieve product details by ID. |

### Cart

| Endpoint          | Method | Input (Example JSON) | Output (Example JSON) | Description |
|-------------------|--------|-----------------------|------------------------|-------------|
| `/cart/additem`   | POST   | ```json { "userId": "user123", "productId": "product123", "quantity": 2 }``` | ```json { "message": "Product added to cart" }``` or ```json { "message": "Product already in cart" }``` | Allows users to add products to their cart. |
| `/cart/getcart`   | GET    | ```json { "userId": "user123" }``` | ```json { "cartItems": [ {"_id": "product123", "title": "Product 1", "price": 29.99, "quantity": 2 } ] }``` | Allows users to retrieve their cart. |
| `/cart/deleteitem/:id` | DELETE | ```json { "userId": "user123", "productId": "product123" }``` | ```json { "message": "Product removed from cart" }``` or ```json { "message": "No such item in cart" }``` or ```json { "message": "Cart cleared" }``` | Allows users to remove a specific product from their cart or clear the entire cart. |
| `/cart/updatequantity` | PUT | ```json { "userId": "user123", "productId": "product123", "quantity": 3 }``` | ```json { "message": "Cart updated successfully" }``` or ```json { "message": "Product not found in cart" }``` | Allows users to update the quantity of a product in their cart. |

### Order

| Endpoint          | Method | Input (Example JSON) | Output (Example JSON) | Description |
|-------------------|--------|-----------------------|------------------------|-------------|
| `/order/place`    | POST   | ```json { "userId": "user123", "userEmail": "user@example.com" }``` | ```json { "message": "Order placed successfully" }``` | Allows users to place an order with products from their cart. |
| `/order/get`      | GET    | ```json { "userEmail": "user@example.com" }``` | ```json [ {"_id": "order123", "user": "user123", "products": [ {"_id": "product123", "title": "Product 1", "price": 29.99, "quantity": 2 } ] } ]```

 | Allows users to retrieve their order history. |
| `/order/get/:id`  | GET    | ```json { "id": "order123", "userEmail": "user@example.com" }``` | ```json {"_id": "order123", "user": "user123", "products": [ {"_id": "product123", "title": "Product 1", "price": 29.99, "quantity": 2 } ] }``` | Allows users to retrieve detailed information about a specific order. |

### Categories

| Endpoint          | Method | Input (Example JSON) | Output (Example JSON) | Description |
|-------------------|--------|-----------------------|------------------------|-------------|
| `/product/categories` | GET | None | ```json [ "Electronics", "Clothing", "Home Decor" ] ``` | Allows users to retrieve a list of product categories. |
