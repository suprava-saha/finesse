import NotificationService from '../services/NotificationService.js';

class NotificationController {
    constructor() {
        this.notificationService = new NotificationService();
    }

    createNotification = async (req, res) => {
        try {
            const notification = await this.notificationService.createNotification(req.body);
            res.status(201).json(notification);
        } catch (error) {
            res.status(500).json({ message: 'Error creating notification', error });
        }
    };

    getNotifications = async (req, res) => {
        try {
            const categories = await this.notificationService.getAllNotifications();
            res.status(200).json(categories);
        } catch (error) {
            res.status(500).json({ message: 'Error fetching categories', error });
        }
    };

    getNotification = async (req, res) => {
        try {
            const notification = await this.notificationService.getNotificationById(req.params.id);
            if (!notification) {
                return res.status(404).json({ message: 'Notification not found' });
            }
            res.status(200).json(notification);
        } catch (error) {
            res.status(500).json({ message: 'Error fetching notification', error });
        }
    };

    updateNotification = async (req, res) => {
        try {
            const notification = await this.notificationService.updateNotification(req.params.id, req.body);
            if (!notification) {
                return res.status(404).json({ message: 'Notification not found' });
            }
            res.status(200).json(notification);
        } catch (error) {
            res.status(500).json({ message: 'Error updating notification', error });
        }
    };

    deleteNotification = async (req, res) => {
        try {
            const result = await this.notificationService.deleteNotification(req.params.id);
            if (!result) {
                return res.status(404).json({ message: 'Notification not found' });
            }
            res.status(200).json({ message: 'Notification deleted successfully' });
        } catch (error) {
            res.status(500).json({ message: 'Error deleting notification', error });
        }
    };
}

export default NotificationController;
