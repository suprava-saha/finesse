import CategoryRepository from '../repositories/CategoryRepository.js';

class CategoryService {
  constructor() {
    this.categoryRepository = new CategoryRepository();
  }

  // Arrow function to get all categories
  getAllCategories = async () => {
    return await this.categoryRepository.findAll();
  };

  // Arrow function to get a category by ID
  getCategoryById = async (id) => {
    return await this.categoryRepository.findById(id);
  };

  // Arrow function to create a new category
  createCategory = async (categoryData) => {
    return await this.categoryRepository.create(categoryData);
  };

  // Arrow function to update a category by ID
  updateCategory = async (id, categoryData) => {
    return await this.categoryRepository.update(id, categoryData);
  };

  // Arrow function to delete a category by ID
  deleteCategory = async (id) => {
    return await this.categoryRepository.delete(id);
  };
}

export default CategoryService;
