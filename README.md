# Ecommerce API

Build a Node.js-based e-commerce API with features for listing categories and products, managing user carts, placing orders, and user authentication via JWT. The API uses MongoDB to store data and includes security measures, such as authentication middleware and error handling.


## Tech Stack

**Server:** Node, Express, MongoDB
## Installation

```bash
npm install
npm run server
```
## API Reference

### User

| Endpoint | Method | Input | Output | Description |
| --- | --- | --- | --- | --- |
| `/user/login` | POST | `email` (string), `password` (string) | JWT token and user ID if successful, error messages otherwise | Allows users to log in by providing their email and password. |
| `/user/register` | POST | `name` (string), `email` (string), `password` (string), `role` (string, optional) | Confirmation message if successful, error message if user already exists | Allows users to register by providing their details. |
| `/user/logout/:token` | POST | JWT token (string) | Confirmation message if successful | Allows users to log out by blacklisting the provided JWT token. |

### Product

| Endpoint | Method | Input | Output | Description |
| --- | --- | --- | --- | --- |
| `/product/add` | POST | Product details | Confirmation message if successful | Allows authorized users to add a new product. |
| `/product/all` | GET | None | List of all products | Allows users to retrieve a list of all available products. |
| `/product/category/:category` | GET | `category` (string) | List of products in the specified category | Allows users to retrieve products by category. |
| `/product/:productId` | GET | `productId` (string) | Detailed information about the specified product | Allows users to retrieve product details by ID. |

### Cart

| Endpoint | Method | Input | Output | Description |
| --- | --- | --- | --- | --- |
| `/cart/additem` | POST | User ID, Product ID, Quantity | Confirmation message or product already in cart message | Allows users to add products to their cart. |
| `/cart/getcart` | GET | User ID | User's cart, including product details | Allows users to retrieve their cart. |
| `/cart/deleteitem/:id` | DELETE | Product ID, User ID | Confirmation message, no such item message, or cart cleared message | Allows users to remove a specific product from their cart or clear the entire cart. |
| `/cart/updatequantity` | PUT | User ID, Product ID, New Quantity | Confirmation message or error message | Allows users to update the quantity of a product in their cart. |

### Order

| Endpoint | Method | Input | Output | Description |
| --- | --- | --- | --- | --- |
| `/order/place` | POST | User ID, User's Email | Confirmation message | Allows users to place an order with products from their cart. |
| `/order/get` | GET | User's Email | List of user's previous orders, including product details | Allows users to retrieve their order history. |
| `/order/get/:id` | GET | Order ID, User's Email | Detailed information about the specified order, including product details | Allows users to retrieve detailed information about a specific order. |

### Categories

| Endpoint | Method | Input | Output | Description |
| --- | --- | --- | --- | --- |
| `/product/categories` | GET | None | List of distinct product categories | Allows users to retrieve a list of product categories. |

