import express from 'express'; // Import express to create an API router
import NotificationController from '../controllers/NotificationController.js'; // Import the NotificationController

// Define a class for the Notification routes
class NotificationRoutes {
    constructor() {
        this.router = express.Router();  // Initialize the express Router
        this.notificationController = new NotificationController();  // Instantiate the NotificationController
        this.initializeRoutes();  // Setup the routes
    }

    // Define the routes and associate them with controller methods
    initializeRoutes = () => {
        /**
         * @swagger
         * components:
         *   schemas:
         *     Notification:
         *       type: object
         *       properties:
         *         _id:
         *           type: string
         *           description: The unique identifier for the notification.
         *           example: "60d2f5f7b0b9c0f34f7e5d6c"
         *         message:
         *           type: string
         *           description: The message of the notification.
         *           example: "Your order has been shipped."
         *         status:
         *           type: integer
         *           description: The status code of the notification.
         *           example: 1
         *       required:
         *         - message
         *         - status
         */

        /**
         * @swagger
         * tags:
         *   - name: Notification
         *     description: Operations related to notifications
         */

        /**
         * @swagger
         * /api/notifications:
         *   post:
         *     tags:
         *       - Notification
         *     summary: Create a new notification
         *     description: Add a new notification to the database.
         *     requestBody:
         *       description: Notification object that needs to be created.
         *       required: true
         *       content:
         *         application/json:
         *           schema:
         *             $ref: '#/components/schemas/Notification'
         *     responses:
         *       201:
         *         description: The notification was created successfully.
         *         content:
         *           application/json:
         *             schema:
         *               $ref: '#/components/schemas/Notification'
         *       400:
         *         description: Bad request, e.g., missing required fields.
         *       500:
         *         description: Internal server error.
         */
        this.router.post('/', this.notificationController.createNotification); // Create a new notification

        /**
         * @swagger
         * /api/notifications:
         *   get:
         *     tags:
         *       - Notification
         *     summary: Retrieve a list of notifications
         *     description: Retrieve all notifications from the database.
         *     responses:
         *       200:
         *         description: A list of notifications.
         *         content:
         *           application/json:
         *             schema:
         *               type: array
         *               items:
         *                 $ref: '#/components/schemas/Notification'
         *             example:
         *               - _id: "60d2f5f7b0b9c0f34f7e5d6c"
         *                 message: "Your order has been shipped."
         *                 status: 1
         *               - _id: "60d2f5f7b0b9c0f34f7e5d6d"
         *                 message: "Your order is out for delivery."
         *                 status: 2
         *               - _id: "60d2f5f7b0b9c0f34f7e5d6e"
         *                 message: "Your order has been delivered."
         *                 status: 3
         */
        this.router.get('/', this.notificationController.getNotifications); // Get all notifications

        /**
         * @swagger
         * /api/notifications/{id}:
         *   get:
         *     tags:
         *       - Notification
         *     summary: Retrieve a specific notification by ID
         *     description: Retrieve a notification by its unique identifier.
         *     parameters:
         *       - in: path
         *         name: id
         *         required: true
         *         schema:
         *           type: string
         *         description: The ID of the notification to retrieve.
         *     responses:
         *       200:
         *         description: A single notification.
         *         content:
         *           application/json:
         *             schema:
         *               $ref: '#/components/schemas/Notification'
         *       404:
         *         description: Notification not found.
         */
        this.router.get('/:id', this.notificationController.getNotification); // Get a specific notification by ID

        /**
         * @swagger
         * /api/notifications/{id}:
         *   put:
         *     tags:
         *       - Notification
         *     summary: Update a notification by ID
         *     description: Update the details of a notification by its unique identifier.
         *     parameters:
         *       - in: path
         *         name: id
         *         required: true
         *         schema:
         *           type: string
         *         description: The ID of the notification to update.
         *     requestBody:
         *       description: Notification object that needs to be updated.
         *       required: true
         *       content:
         *         application/json:
         *           schema:
         *             $ref: '#/components/schemas/Notification'
         *     responses:
         *       200:
         *         description: The notification was updated successfully.
         *         content:
         *           application/json:
         *             schema:
         *               $ref: '#/components/schemas/Notification'
         *       404:
         *         description: Notification not found.
         */
        this.router.put('/:id', this.notificationController.updateNotification); // Update a notification by ID

        /**
         * @swagger
         * /api/notifications/{id}:
         *   delete:
         *     tags:
         *       - Notification
         *     summary: Delete a notification by ID
         *     description: Remove a notification by its unique identifier.
         *     parameters:
         *       - in: path
         *         name: id
         *         required: true
         *         schema:
         *           type: string
         *         description: The ID of the notification to delete.
         *     responses:
         *       200:
         *         description: The notification was deleted successfully.
         *       404:
         *         description: Notification not found.
         */
        this.router.delete('/:id', this.notificationController.deleteNotification); // Delete a notification by ID
    }
}

// Export an instance of the NotificationRoutes class
export default new NotificationRoutes().router;
