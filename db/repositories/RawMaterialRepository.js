import RawMaterial from '../models/RawMaterial.js';
import NotificationRepository from './NotificationRepository.js'; // Adjust the path as needed

class RawMaterialRepository {
  constructor() {
    // Initialize NotificationRepository
    this.notificationRepository = new NotificationRepository();
  }

  /**
   * Arrow function to find all raw materials with populated categoryId and error handling.
   * @returns {Promise<Array>} - Resolves with an array of raw materials.
   * @throws {Error} - Throws an error if finding raw materials fails.
   */
  findAll = async () => {
    try {
      return await RawMaterial.find();
    } catch (error) {
      throw new Error(`Error finding all raw materials: ${error.message}`);
    }
  };

  /**
   * Arrow function to find a raw material by ID with populated categoryId and error handling.
   * @param {string} id - ID of the raw material.
   * @returns {Promise<Object|null>} - Resolves with the raw material object or null if not found.
   * @throws {Error} - Throws an error if finding raw material by ID fails.
   */
  findById = async (id) => {
    try {
      return await RawMaterial.findById(id);
    } catch (error) {
      throw new Error(`Error finding raw material by ID: ${error.message}`);
    }
  };

  /**
   * Arrow function to create a new raw material with error handling.
   * @param {Object} rawMaterialData - Data for the new raw material.
   * @returns {Promise<Object>} - Resolves with the created raw material.
   * @throws {Error} - Throws an error if creating the raw material fails.
   */
  create = async (rawMaterialData) => {
    try {
      const rawMaterial = new RawMaterial(rawMaterialData);
      const savedRawMaterial = await rawMaterial.save();

      // Check if quantity is below or equal to the threshold level and create notification if needed
      if (savedRawMaterial.quantity <= savedRawMaterial.thresholdLevel) {
        await this.#createStockThresholdNotification(savedRawMaterial);
      }

      return savedRawMaterial;
    } catch (error) {
      throw new Error(`Error creating raw material: ${error.message}`);
    }
  };

  /**
   * Arrow function to update a raw material by ID with error handling.
   * @param {string} id - ID of the raw material to update.
   * @param {Object} rawMaterialData - Updated data for the raw material.
   * @returns {Promise<Object|null>} - Resolves with the updated raw material or null if not found.
   * @throws {Error} - Throws an error if updating the raw material fails.
   */
  update = async (id, rawMaterialData) => {
    try {
      const updatedRawMaterial = await RawMaterial.findByIdAndUpdate(id, rawMaterialData, { new: true });

      // Check if quantity is below or equal to the threshold level and create notification if needed
      if (updatedRawMaterial && updatedRawMaterial.quantity <= updatedRawMaterial.thresholdLevel) {
        await this.#createStockThresholdNotification(updatedRawMaterial);
      }

      return updatedRawMaterial;
    } catch (error) {
      throw new Error(`Error updating raw material: ${error.message}`);
    }
  };


  sortCategory = async (columnName) => {
    try {

      // Log columnName to verify it's received
      const sortedRawMaterials = await RawMaterial.find({});
      let sortedProducts = sortedRawMaterials.sort((p1, p2) => {
        let val1 = p1[columnName[0]];
        let val2 = p2[columnName[0]];


        if (columnName[1] === 2) { // Descending order
          [val1, val2] = [val2, val1];
        }


        if (columnName === '_id') {
          val1 = val1.toString();  // Convert ObjectId to string
          val2 = val2.toString();  // Convert ObjectId to string
        }

        // For numbers or dates, direct comparison works
        if (typeof val1 === 'number' || val1 instanceof Date) {
          return val1 - val2;
        }

        // For strings, use localeCompare for proper string sorting
        if (typeof val1 === 'string') {
          return val1.localeCompare(val2);
        }

        // Default fallback comparison
        return (val1 < val2) ? 1 : (val1 > val2) ? -1 : 0;
      });
      console.log(columnName)
      return sortedProducts;
    } catch (error) {
      throw new Error(`Error sorting raw materials: ${error.message}`);
    }
  };

  /**
   * Method to delete a raw material by ID and then handle associated stock notifications.
   * @param {string} id - ID of the raw material to delete.
   * @returns {Promise<Object|null>} - Resolves with the deleted raw material or null if not found.
   * @throws {Error} - Throws an error if deleting the raw material fails.
   */
  delete = async (id) => {
    try {
      // Find and delete the raw material by ID
      const deletedRawMaterial = await RawMaterial.findByIdAndDelete(id);

      // If the raw material was found and deleted, handle the associated notifications
      if (deletedRawMaterial) {
        await this.#createDeleteStockNotification(deletedRawMaterial);
      }

      return deletedRawMaterial;
    } catch (error) {
      throw new Error(`Error deleting raw material: ${error.message}`);
    }
  };

  /**
   * Method to check a raw material data and create a notification if quantity is below the threshold.
   * @param {Object} rawMaterial - The raw material object with data to check.
   * @returns {Promise<void>}
   */
  #createStockThresholdNotification = async (rawMaterial) => {
    try {
      // Check if raw material quantity is below or equal to the threshold level
      if (rawMaterial && rawMaterial.quantity <= rawMaterial.thresholdLevel) {
        // Create a new notification using NotificationRepository
        const notificationData = {
          message: `Raw material ${rawMaterial.name} is below the threshold level.`,
          status: 1
        };
        await this.notificationRepository.create(notificationData);
      }
    } catch (error) {
      throw new Error(`Error checking raw material and creating notification: ${error.message}`);
    }
  };


  /**
   * Method to find and delete notifications associated with a deleted raw material.
   * @param {Object} rawMaterial - The raw material object that was deleted.
   * @returns {Promise<void>}
   * @throws {Error} - Throws an error if finding or deleting notifications fails.
   */
  #createDeleteStockNotification = async (rawMaterial) => {
    try {
      // If the raw material exists, delete the associated notifications
      if (rawMaterial) {
        // Create a new notification using NotificationRepository
        const notificationData = {
          message: `Raw material ${rawMaterial.name} is deleted.`,
          status: 1
        };
        await this.notificationRepository.create(notificationData);
      }
    } catch (error) {
      throw new Error(`Error deleting stock notification: ${error.message}`);
    }
  };
}

export default RawMaterialRepository;
