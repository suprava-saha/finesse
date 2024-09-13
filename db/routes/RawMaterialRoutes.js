import express from 'express'; // Import express to create an API router
import RawMaterialController from '../controllers/RawMaterialController.js'; // Import the RawMaterialController

// Define a class for the RawMaterial routes
class RawMaterialRoutes {
    constructor() {
        this.router = express.Router();  // Initialize the express Router
        this.rawMaterialController = new RawMaterialController();  // Instantiate the RawMaterialController
        this.initializeRoutes();  // Setup the routes
    }

    // Define the routes and associate them with controller methods
    initializeRoutes = () => {
        /**
         * @swagger
         * components:
         *   schemas:
         *     RawMaterial:
         *       type: object
         *       properties:
         *         _id:
         *           type: string
         *           description: The unique identifier for the raw material.
         *           example: "60d2f5f7b0b9c0f34f7e5d6c"
         *         name:
         *           type: string
         *           description: The name of the raw material.
         *           example: "Steel"
         *         categoryId:
         *           type: string
         *           description: The ID of the category the raw material belongs to.
         *           example: "60d2f5f7b0b9c0f34f7e5d6c"
         *         manufactureDate:
         *           type: string
         *           format: date
         *           description: The manufacture date of the raw material.
         *           example: "2024-01-15"
         *         expirationDate:
         *           type: string
         *           format: date
         *           description: The expiration date of the raw material.
         *           example: "2025-01-15"
         *         quantity:
         *           type: integer
         *           description: The quantity of the raw material.
         *           example: 100
         *         thresholdLevel:
         *           type: integer
         *           description: The threshold level for inventory alerts.
         *           example: 10
         *       required:
         *         - name
         *         - categoryId
         *         - manufactureDate
         *         - expirationDate
         *         - quantity
         *         - thresholdLevel
         */

        /**
         * @swagger
         * tags:
         *   - name: RawMaterial
         *     description: API endpoints for managing raw materials.
         */

        /**
         * @swagger
         * /api/raw-materials:
         *   post:
         *     tags:
         *       - RawMaterial
         *     summary: Create a new raw material
         *     description: Add a new raw material to the database.
         *     requestBody:
         *       description: Raw material object that needs to be created.
         *       required: true
         *       content:
         *         application/json:
         *           schema:
         *             $ref: '#/components/schemas/RawMaterial'
         *     responses:
         *       201:
         *         description: The raw material was created successfully.
         *         content:
         *           application/json:
         *             schema:
         *               $ref: '#/components/schemas/RawMaterial'
         *       400:
         *         description: Bad request, e.g., missing required fields.
         *       500:
         *         description: Internal server error.
         */
        this.router.post('/', this.rawMaterialController.createRawMaterial); // Create a new raw material

        /**
         * @swagger
         * /api/raw-materials:
         *   get:
         *     tags:
         *       - RawMaterial
         *     summary: Retrieve a list of raw materials
         *     description: Retrieve all raw materials from the database.
         *     responses:
         *       200:
         *         description: A list of raw materials.
         *         content:
         *           application/json:
         *             schema:
         *               type: array
         *               items:
         *                 $ref: '#/components/schemas/RawMaterial'
         *             example:
         *               - _id: "60d2f5f7b0b9c0f34f7e5d6c"
         *                 name: "Steel"
         *                 categoryId: "60d2f5f7b0b9c0f34f7e5d6c"
         *                 manufactureDate: "2024-01-15"
         *                 expirationDate: "2025-01-15"
         *                 quantity: 100
         *                 thresholdLevel: 10
         *               - _id: "60d2f5f7b0b9c0f34f7e5d6d"
         *                 name: "Aluminum"
         *                 categoryId: "60d2f5f7b0b9c0f34f7e5d6d"
         *                 manufactureDate: "2024-02-20"
         *                 expirationDate: "2025-02-20"
         *                 quantity: 200
         *                 thresholdLevel: 20
         */
        this.router.get('/', this.rawMaterialController.getRawMaterials); // Get all raw materials

        /**
         * @swagger
         * /api/raw-materials/{id}:
         *   get:
         *     tags:
         *       - RawMaterial
         *     summary: Retrieve a specific raw material by ID
         *     description: Retrieve a raw material by its unique identifier.
         *     parameters:
         *       - in: path
         *         name: id
         *         required: true
         *         schema:
         *           type: string
         *         description: The ID of the raw material to retrieve.
         *     responses:
         *       200:
         *         description: A single raw material.
         *         content:
         *           application/json:
         *             schema:
         *               $ref: '#/components/schemas/RawMaterial'
         *       404:
         *         description: Raw material not found.
         */
        this.router.get('/:id', this.rawMaterialController.getRawMaterial); // Get a specific raw material by ID

        /**
         * @swagger
         * /api/raw-materials/{id}:
         *   put:
         *     tags:
         *       - RawMaterial
         *     summary: Update a raw material by ID
         *     description: Update the details of a raw material by its unique identifier.
         *     parameters:
         *       - in: path
         *         name: id
         *         required: true
         *         schema:
         *           type: string
         *         description: The ID of the raw material to update.
         *     requestBody:
         *       description: Raw material object that needs to be updated.
         *       required: true
         *       content:
         *         application/json:
         *           schema:
         *             $ref: '#/components/schemas/RawMaterial'
         *     responses:
         *       200:
         *         description: The raw material was updated successfully.
         *         content:
         *           application/json:
         *             schema:
         *               $ref: '#/components/schemas/RawMaterial'
         *       404:
         *         description: Raw material not found.
         */
        this.router.put('/:id', this.rawMaterialController.updateRawMaterial); // Update a raw material by ID

        /**
         * @swagger
         * /api/raw-materials/{id}:
         *   delete:
         *     tags:
         *       - RawMaterial
         *     summary: Delete a raw material by ID
         *     description: Remove a raw material from the database by its unique identifier.
         *     parameters:
         *       - in: path
         *         name: id
         *         required: true
         *         schema:
         *           type: string
         *         description: The ID of the raw material to delete.
         *     responses:
         *       200:
         *         description: The raw material was deleted successfully.
         *       404:
         *         description: Raw material not found.
         */
        this.router.delete('/:id', this.rawMaterialController.deleteRawMaterial); // Delete a raw material by ID

        this.router.post('/sortCategory', this.rawMaterialController.sortRawMaterial);
    }
}

// Export an instance of the RawMaterialRoutes class
export default new RawMaterialRoutes().router;
