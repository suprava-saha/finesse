import RawMaterialService from '../services/RawMaterialService.js';

class RawMaterialController {
  constructor() {
    this.rawMaterialService = new RawMaterialService();
  }

  createRawMaterial = async (req, res) => {
    try {
      const rawMaterial = await this.rawMaterialService.createRawMaterial(req.body);
      res.status(201).json(rawMaterial);
    } catch (error) {
      res.status(500).json({ message: 'Error creating raw material', error });
    }
  };

  getRawMaterials = async (req, res) => {
    try {
      const rawMaterials = await this.rawMaterialService.getAllRawMaterials();
      res.status(200).json(rawMaterials);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching raw materials', error });
    }
  };

  getRawMaterial = async (req, res) => {
    try {
      const rawMaterial = await this.rawMaterialService.getRawMaterialById(req.params.id);
      if (!rawMaterial) {
        return res.status(404).json({ message: 'Raw material not found' });
      }
      res.status(200).json(rawMaterial);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching raw material', error });
    }
  };

  updateRawMaterial = async (req, res) => {
    try {
      const rawMaterial = await this.rawMaterialService.updateRawMaterial(req.params.id, req.body);
      if (!rawMaterial) {
        return res.status(404).json({ message: 'Raw material not found' });
      }
      res.status(200).json(rawMaterial);
    } catch (error) {
      res.status(500).json({ message: 'Error updating raw material', error });
    }
  };

  deleteRawMaterial = async (req, res) => {
    try {
      const result = await this.rawMaterialService.deleteRawMaterial(req.params.id);
      if (!result) {
        return res.status(404).json({ message: 'Raw material not found' });
      }
      res.status(200).json({ message: 'Raw material deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Error deleting raw material', error });
    }
  };


  sortRawMaterial = async (req, res) => {
    try {
      const sortedData = await this.rawMaterialService.sortRawMaterial(req.body);
      res.status(200).json(sortedData); // Send sorted data as response
    } catch (error) {
      console.error('Error in sortRawMaterial:', error); // Log error to server console
      res.status(500).json({ message: 'Error sorting raw materials', error: error.message }); // Send error response
    }
  };

}

export default RawMaterialController;
