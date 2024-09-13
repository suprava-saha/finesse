import Notification from '../models/Notification.js';
import MailRepository from './MailRepository.js';

class NotificationRepository {
    constructor() {
        // Initialize NotificationRepository
        this.mailRepository = new MailRepository();
    }

    // Arrow function to find all notifications with error handling
    findAll = async () => {
        try {
            return await Notification.find();
        } catch (error) {
            throw new Error(`Error finding all notifications: ${error.message}`);
        }
    };

    // Arrow function to find a notification by ID with error handling
    findById = async (id) => {
        try {
            return await Notification.findById(id);
        } catch (error) {
            throw new Error(`Error finding notification by ID: ${error.message}`);
        }
    };

    // Arrow function to create a new notification with error handling
    create = async (notificationData) => {
        try {
            const notification = new Notification(notificationData);
            const savedNotification = await notification.save();
            // Check if the notification was successfully saved
            if (savedNotification) {
                // Create mail options for sending an email
                const mailOptions = this.mailRepository.setMailOptions(
                    process.env.ADMIN_EMAIL,      // Sender email address from environment variable
                    process.env.ADMIN_EMAIL,      // Recipient email address (same as sender for admin notifications)
                    "System Notification: Resturant Manager", // Subject of the email
                    notification.message          // Body of the email, using the notification message
                );

                // Send the email using the mail repository
                await this.mailRepository.sendMail(mailOptions);
            }

            return savedNotification;
        } catch (error) {
            throw new Error(`Error creating notification: ${error.message}`);
        }
    };

    // Arrow function to update a notification by ID with error handling
    update = async (id, notificationData) => {
        try {
            return await Notification.findByIdAndUpdate(id, notificationData, { new: true });
        } catch (error) {
            throw new Error(`Error updating notification: ${error.message}`);
        }
    };

    // Arrow function to delete a notification by ID with error handling
    delete = async (id) => {
        try {
            return await Notification.findByIdAndDelete(id);
        } catch (error) {
            throw new Error(`Error deleting notification: ${error.message}`);
        }
    };
}

export default NotificationRepository;
