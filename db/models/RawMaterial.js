import mongoose from 'mongoose';

// Define schema for the RawMaterial model
const rawMaterialSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  categoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: true
  },
  manufactureDate: {
    type: Date,
    required: true
  },
  expirationDate: {
    type: Date,
    required: true
  },
  quantity: {
    type: Number,
    required: true,
    min: [0, 'Quantity cannot be less than 0']
  },
  thresholdLevel: {
    type: Number,
    required: true,
    min: [0, 'Threshold level cannot be less than 0']
  },
  cost: {
    type: Number,
    required: true,
    min: [0, 'Cost cannot be less than 0']
  }

});

class RawMaterialModel {
  constructor() {
    this.model = mongoose.model('RawMaterial', rawMaterialSchema);
  }

  getModel() {
    return this.model;
  }
}

export default new RawMaterialModel().getModel();
