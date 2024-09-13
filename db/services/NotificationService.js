import NotificationRepository from '../repositories/NotificationRepository.js';

class NotificationService {
    constructor() {
        this.notificationRepository = new NotificationRepository();
    }

    // Arrow function to get all notifications
    getAllNotifications = async () => {
        return await this.notificationRepository.findAll();
    };

    // Arrow function to get a notification by ID
    getNotificationById = async (id) => {
        return await this.notificationRepository.findById(id);
    };

    // Arrow function to create a new notification
    createNotification = async (notificationData) => {
        return await this.notificationRepository.create(notificationData);
    };

    // Arrow function to update a notification by ID
    updateNotification = async (id, notificationData) => {
        return await this.notificationRepository.update(id, notificationData);
    };

    // Arrow function to delete a notification by ID
    deleteNotification = async (id) => {
        return await this.notificationRepository.delete(id);
    };
}

export default NotificationService;
