import RawMaterialRepository from '../repositories/RawMaterialRepository.js';

class RawMaterialService {
  constructor() {
    this.rawMaterialRepository = new RawMaterialRepository();
  }

  // Arrow function to get all raw materials
  getAllRawMaterials = async () => {
    return await this.rawMaterialRepository.findAll();
  };

  // Arrow function to get a raw material by ID
  getRawMaterialById = async (id) => {
    return await this.rawMaterialRepository.findById(id);
  };

  // Arrow function to create a new raw material
  createRawMaterial = async (rawMaterialData) => {
    return await this.rawMaterialRepository.create(rawMaterialData);
  };

  // Arrow function to update a raw material by ID
  updateRawMaterial = async (id, rawMaterialData) => {
    return await this.rawMaterialRepository.update(id, rawMaterialData);
  };

  // Arrow function to delete a raw material by ID
  deleteRawMaterial = async (id) => {
    return await this.rawMaterialRepository.delete(id);
  };

  sortRawMaterial = async (columnName) => {
    try {
      return await this.rawMaterialRepository.sortCategory(columnName);
    } catch (error) {
      throw new Error(`Error in RawMaterialService: ${error.message}`);
    }
  };


}
export default RawMaterialService;
