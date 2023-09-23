
# E-commerce API

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

## Authentication
To authenticate with the API, you need to obtain a JWT token. You can do this by sending a POST request to the /user/login endpoint with your email and password. If the login is successful, the API will return a JWT token in the response body.

To use the JWT token to authenticate with the API, you need to include it in the Authorization header of all requests. The header value should be in the format <token>, where <token> is the JWT token that you obtained from the /user/login endpoint.


## API Reference

### User

| Endpoint          | Method | Input                                       | Output                                                  | Description                                     |
|-------------------|--------|---------------------------------------------|----------------------------------------------------------|-------------------------------------------------|
| `/user/register`  | POST   | `name` (string), `email` (string), `password` (string), `role` (string, optional) | Confirmation message if successful, error message if user already exists | Allows users to register by providing their details. |
| `/user/login`     | POST   | `email` (string), `password` (string)       | JWT token and user ID if successful, error messages otherwise | Allows users to log in by providing their email and password. |


### Product

| Endpoint          | Method | Input                                       | Output                                                  | Description                                     |
|-------------------|--------|---------------------------------------------|----------------------------------------------------------|-------------------------------------------------|
| `/product/addproduct`    | POST   | Product details                            | Confirmation message if successful                        | Allows authorized users to add a new product.   |
| `/product/getproduct`    | GET    | None                                        | List of all products                                      | Allows users to retrieve a list of all available products. |
| `/product/getbycategory/:category` | GET | `category` (string)                        | List of products in the specified category                 | Allows users to retrieve products by category.    |
| `/product/getbyid/:productId` | GET  | `productId` (string)                       | Detailed information about the specified product          | Allows users to retrieve product details by ID.     |


### Categories

| Endpoint          | Method | Input                                       | Output                                                  | Description                                     |
|-------------------|--------|---------------------------------------------|----------------------------------------------------------|-------------------------------------------------|
| `/category/listofcategory` | GET | None                                   | List of distinct product categories                        | Allows users to retrieve a list of product categories. |


### Cart

| Endpoint          | Method | Input                                       | Output                                                  | Description                                     |
|-------------------|--------|---------------------------------------------|----------------------------------------------------------|-------------------------------------------------|
| `/cart/addcart`   | POST   | User ID, Product ID, Quantity              | Confirmation message or product already in cart message   | Allows users to add products to their cart.       |
| `/cart/getcart`   | GET    | User ID                                     | User's cart, including product details                    | Allows users to retrieve their cart.              |
| `/cart/deletecart/:id` | DELETE | Product ID, User ID                     | Confirmation message, no such item message, or cart cleared message | Allows users to remove a specific product from their cart or clear the entire cart. |
| `/cart/updatequantity` | PUT | User ID, Product ID, New Quantity      | Confirmation message or error message                     | Allows users to update the quantity of a product in their cart. |

### Order

| Endpoint          | Method | Input                                       | Output                                                  | Description                                     |
|-------------------|--------|---------------------------------------------|----------------------------------------------------------|-------------------------------------------------|
| `/order/placeorder`    | POST   | User ID, User's Email                     | Confirmation message                                      | Allows users to place an order with products from their cart. |
| `/order/getorder`      | GET    | User's Email                               | List of user's previous orders, including product details | Allows users to retrieve their order history.     |
| `/order/getorderbyid/:id`  | GET    | Order ID, User's Email                    | Detailed information about the specified order, including product details | Allows users to retrieve detailed information about a specific order. |

---
