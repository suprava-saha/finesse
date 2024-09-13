import  Category from '../models/Category.js';

class CategoryRepository {
  // Arrow function to find all categories with error handling
  findAll = async () => {
    try {
      return await Category.find();
    } catch (error) {
      throw new Error(`Error finding all categories: ${error.message}`);
    }
  };

  // Arrow function to find a category by ID with error handling
  findById = async (id) => {
    try {
      return await Category.findById(id);
    } catch (error) {
      throw new Error(`Error finding category by ID: ${error.message}`);
    }
  };

  // Arrow function to create a new category with error handling
  create = async (categoryData) => {
    try {
      const category = new Category(categoryData);
      return await category.save();
    } catch (error) {
      throw new Error(`Error creating category: ${error.message}`);
    }
  };

  // Arrow function to update a category by ID with error handling
  update = async (id, categoryData) => {
    try {
      return await Category.findByIdAndUpdate(id, categoryData, { new: true });
    } catch (error) {
      throw new Error(`Error updating category: ${error.message}`);
    }
  };

  // Arrow function to delete a category by ID with error handling
  delete = async (id) => {
    try {
      return await Category.findByIdAndDelete(id);
    } catch (error) {
      throw new Error(`Error deleting category: ${error.message}`);
    }
  };
}

export default CategoryRepository;
