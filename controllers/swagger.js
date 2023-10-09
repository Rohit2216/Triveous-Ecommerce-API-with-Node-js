
// user and admin login to here
/**
 * @swagger
 * tags:
 *   name: User 
 *   description: User management
 */



/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *         email:
 *           type: string
 *         password:
 *           type: string
 *         role:
 *           type: string
 *       example:
 *         name: John Doe
 *         email: john@example.com
 *         password: secret
 *         role: user
 */



/**
 * @swagger
 * /user/register:
 *   post:
 *     summary: Register a new user
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       '200':
 *         description: User registration successful
 *       '400':
 *         description: Bad request or user already exists
 */


/**
 * @swagger
 * /user/login:
 *   post:
 *     summary: Login to the application
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Login successful
 *       '400':
 *         description: Incorrect password or user not found
 */



//products

/**
 * @swagger
 * tags:
 *   name: Product
 *   description: Product management
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       properties:
 *         title:
 *           type: string
 *           description: Product title
 *         price:
 *           type: number
 *           description: Product price
 *         description:
 *           type: string
 *           description: Product description
 *         availability:
 *           type: boolean
 *           description: Product availability
 *         category:
 *           type: string
 *           description: Product category
 *       example:
 *         title: Sample Product
 *         price: 29.99
 *         description: This is a sample product
 *         availability: true
 *         category: Electronics
 */

/**
 * @swagger
 * /product/addproduct:
 *   post:
 *     summary: Add a new product by Admin
 *     tags: [Product]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Product'
 *     responses:
 *       '200':
 *         description: Product added successfully
 *       '400':
 *         description: Bad request - Invalid data
 *       '401':
 *         description: Unauthorized - Token is missing or invalid
 */




/**
 * @swagger
 * /product/getproduct:
 *   get:
 *     summary: Get all products
 *     tags: [Product]
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 *       '500':
 *         description: Internal server error
 */



/**
 * @swagger
 * /product/getbycategory/{category}:
 *   get:
 *     summary: Get products by category
 *     tags: [Product]
 *     parameters:
 *       - in: path
 *         name: category
 *         required: true
 *         description: The category to filter by
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 *       '500':
 *         description: Internal server error
 */


/**
 * @swagger
 * /product/getbyid/{productId}:
 *   get:
 *     summary: Get product by ID
 *     tags: [Product]
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         description: The ID of the product to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       '404':
 *         description: Product not found
 *       '500':
 *         description: Internal server error
 */


// cart

/**
 * @swagger
 * tags:
 *   name: Cart
 *   description: Cart management
 */

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     BearerAuth:
 *       type: apiKey
 *       in: header
 *       name: Authorization
 *       description: Bearer token authorization header
*/

/**
 * @swagger
 * /cart/addcart:
 *   post:
 *     summary: Add an item to the user's cart
 *     tags: [Cart]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *                 description: User ID
 *               productId:
 *                 type: string
 *                 description: Product ID
 *               quantity:
 *                 type: number
 *                 description: Quantity of the product to add to the cart
 *             required:
 *               - userId
 *               - productId
 *               - quantity
 *     responses:
 *       200:
 *         description: Product added to cart successfully
 *       400:
 *         description: Bad request - Invalid data
 *       401:
 *         description: Unauthorized - Token is missing or invalid
 *       500:
 *         description: Internal server error
 */



/**
 * @swagger
 * /cart/getcart:
 *   get:
 *     summary: Get user's cart
 *     tags: [Cart]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: query
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User's cart retrieved successfully
 *       404:
 *         description: User or cart not found
 *       500:
 *         description: Internal server error
 */



/**
 * @swagger
 * /cart/deletecart/{id}:
 *   delete:
 *     summary: Remove a product from the user's cart or clear the entire cart
 *     tags: [Cart]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Product ID to remove from the cart (use "clear" to clear the entire cart)
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *                 description: User ID
 *             required:
 *               - userId
 *     responses:
 *       204:
 *         description: Product removed from cart or cart cleared successfully
 *       404:
 *         description: Product or user not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /cart/updatequantity:
 *   put:
 *     summary: Update the quantity of a product in the user's cart
 *     tags: [Cart]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *                 description: User ID
 *               productId:
 *                 type: string
 *                 description: Product ID
 *               quantity:
 *                 type: number
 *                 description: New quantity of the product in the cart
 *             required:
 *               - userId
 *               - productId
 *               - quantity
 *     responses:
 *       200:
 *         description: Cart item quantity updated successfully
 *       404:
 *         description: User not found or product not in cart
 *       500:
 *         description: Internal server error
 */



/**
 * @swagger
 * tags:
 *   name: Orders
 *   description: Order management
 */


/**
 * @swagger
 * components:
 *   schemas:
 *     Order:
 *       type: object
 *       properties:
 *         email:
 *           type: string
 *           description: Email of the user who placed the order
 *         products:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               product:
 *                 type: string
 *                 description: Product ID (Reference to the Product model)
 *               quantity:
 *                 type: number
 *                 description: Quantity of the product in the order
 *         amount:
 *           type: number
 *           description: Total amount of the order
 *         status:
 *           type: string
 *           enum: ["pending", "completed"]
 *           default: "pending"
 *           description: Status of the order (pending or completed)
 *       example:
 *         email: user@example.com
 *         products:
 *           - product: 605c4eb2d4f22f11e8d5e786 (Product ID)
 *             quantity: 2
 *         amount: 59.98
 *         status: completed
 */




/**
 * @swagger
 * /order/placeOrder:
 *   post:
 *     summary: Place an order
 *     tags: [Orders]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *               email:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Order placed successfully
 *       '401':
 *         description: Unauthorized - Token is missing or invalid
 *       '404':
 *         description: User not found or cart not found
 *       '500':
 *         description: Internal server error
 */

/**
 * @swagger
 * /order/getOrder:
 *   get:
 *     summary: Get user's orders
 *     tags: [Orders]
 *     parameters:
 *       - in: query
 *         name: email
 *         required: true
 *         schema:
 *           type: string
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Order'
 *       '401':
 *         description: Unauthorized - Token is missing or invalid
 *       '404':
 *         description: Order not found
 *       '500':
 *         description: Internal server error
 */

/**
 * @swagger
 * /order/getOrderById/{id}:
 *   get:
 *     summary: Get order by ID
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *       - in: query
 *         name: email
 *         required: true
 *         schema:
 *           type: string
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Order'
 *       '401':
 *         description: Unauthorized - Token is missing or invalid
 *       '404':
 *         description: Order not found
 *       '500':
 *         description: Internal server error
 */
