import CategoryService from '../services/CategoryService.js';

class CategoryController {
  constructor() {
    this.categoryService = new CategoryService();
  }

  createCategory = async (req, res) => {
    try {
      const category = await this.categoryService.createCategory(req.body);
      res.status(201).json(category);
    } catch (error) {
      res.status(500).json({ message: 'Error creating category', error });
    }
  };

  getCategories = async (req, res) => {
    try {
      const categories = await this.categoryService.getAllCategories();
      res.status(200).json(categories);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching categories', error });
    }
  };

  getCategory = async (req, res) => {
    try {
      const category = await this.categoryService.getCategoryById(req.params.id);
      if (!category) {
        return res.status(404).json({ message: 'Category not found' });
      }
      res.status(200).json(category);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching category', error });
    }
  };

  updateCategory = async (req, res) => {
    try {
      const category = await this.categoryService.updateCategory(req.params.id, req.body);
      if (!category) {
        return res.status(404).json({ message: 'Category not found' });
      }
      res.status(200).json(category);
    } catch (error) {
      res.status(500).json({ message: 'Error updating category', error });
    }
  };

  deleteCategory = async (req, res) => {
    try {
      const result = await this.categoryService.deleteCategory(req.params.id);
      if (!result) {
        return res.status(404).json({ message: 'Category not found' });
      }
      res.status(200).json({ message: 'Category deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Error deleting category', error });
    }
  };
}

export default CategoryController;
