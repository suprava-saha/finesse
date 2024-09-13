import mongoose from 'mongoose';

// Define schema for the Category model
const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  }
});

class CategoryModel {
  constructor() {
    this.model = mongoose.model('Category', categorySchema);
  }

  getModel() {
    return this.model;
  }
}

export default new CategoryModel().getModel();
