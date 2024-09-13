import express from 'express'; // Import express to create an API router
import CategoryController from '../controllers/CategoryController.js'; // Import the CategoryController

// Define a class for the Category routes
class CategoryRoutes {
    constructor() {
        this.router = express.Router();  // Initialize the express Router
        this.categoryController = new CategoryController();  // Instantiate the CategoryController
        this.initializeRoutes();  // Setup the routes
    }

    // Define the routes and associate them with controller methods
    initializeRoutes = () => {
        /**
         * @swagger
         * components:
         *   schemas:
         *     Category:
         *       type: object
         *       properties:
         *         _id:
         *           type: string
         *           description: The unique identifier for the category.
         *           example: 66d547a4417b8f8772c5b15f
         *         name:
         *           type: string
         *           description: The name of the category.
         *           example: Fruit
         *       required:
         *         - name
         */

        /**
         * @swagger
         * tags:
         *   - name: Category
         *     description: Operations related to categories
         */

        /**
         * @swagger
         * /api/categories:
         *   post:
         *     tags:
         *       - Category
         *     summary: Create a new category
         *     description: Add a new category to the database.
         *     requestBody:
         *       description: Category object that needs to be created.
         *       required: true
         *       content:
         *         application/json:
         *           schema:
         *             $ref: '#/components/schemas/Category'
         *     responses:
         *       201:
         *         description: The category was created successfully.
         *         content:
         *           application/json:
         *             schema:
         *               $ref: '#/components/schemas/Category'
         *       400:
         *         description: Bad request, e.g., missing required fields.
         *       500:
         *         description: Internal server error.
         */
        this.router.post('/', this.categoryController.createCategory); // Create a new category

        /**
         * @swagger
         * /api/categories:
         *   get:
         *     tags:
         *       - Category
         *     summary: Retrieve a list of categories
         *     description: Retrieve all categories in the database.
         *     responses:
         *       200:
         *         description: A list of categories.
         *         content:
         *           application/json:
         *             schema:
         *               type: array
         *               items:
         *                 $ref: '#/components/schemas/Category'
         *             example:
         *               - _id: "66d547a4417b8f8772c5b15f"
         *                 name: "Fruit"
         *               - _id: "66d547cc417b8f8772c5b160"
         *                 name: "Biscuit"
         *               - _id: "66d547fa417b8f8772c5b161"
         *                 name: "Meat"
         */
        this.router.get('/', this.categoryController.getCategories); // Get all categories

        /**
         * @swagger
         * /api/categories/{id}:
         *   get:
         *     tags:
         *       - Category
         *     summary: Retrieve a specific category by ID
         *     description: Retrieve a category by its unique identifier.
         *     parameters:
         *       - in: path
         *         name: id
         *         required: true
         *         schema:
         *           type: string
         *         description: The ID of the category to retrieve.
         *     responses:
         *       200:
         *         description: A single category.
         *         content:
         *           application/json:
         *             schema:
         *               $ref: '#/components/schemas/Category'
         *       404:
         *         description: Category not found.
         */
        this.router.get('/:id', this.categoryController.getCategory); // Get a specific category by ID

        /**
         * @swagger
         * /api/categories/{id}:
         *   put:
         *     tags:
         *       - Category
         *     summary: Update a category by ID
         *     description: Update the details of a category by its unique identifier.
         *     parameters:
         *       - in: path
         *         name: id
         *         required: true
         *         schema:
         *           type: string
         *         description: The ID of the category to update.
         *     requestBody:
         *       description: Category object that needs to be updated.
         *       required: true
         *       content:
         *         application/json:
         *           schema:
         *             $ref: '#/components/schemas/Category'
         *     responses:
         *       200:
         *         description: The category was updated successfully.
         *         content:
         *           application/json:
         *             schema:
         *               $ref: '#/components/schemas/Category'
         *       404:
         *         description: Category not found.
         */
        this.router.put('/:id', this.categoryController.updateCategory); // Update a category by ID

        /**
         * @swagger
         * /api/categories/{id}:
         *   delete:
         *     tags:
         *       - Category
         *     summary: Delete a category by ID
         *     description: Remove a category by its unique identifier.
         *     parameters:
         *       - in: path
         *         name: id
         *         required: true
         *         schema:
         *           type: string
         *         description: The ID of the category to delete.
         *     responses:
         *       200:
         *         description: The category was deleted successfully.
         *       404:
         *         description: Category not found.
         */
        this.router.delete('/:id', this.categoryController.deleteCategory); // Delete a category by ID
    }
}

// Export an instance of the CategoryRoutes class
export default  new CategoryRoutes().router;
