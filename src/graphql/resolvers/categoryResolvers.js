const Category = require('../../data/models/category');

const categoryResolvers = {
    Query: {
      getCategories: async () => {
        try {
          const categories = await Category.find({});
          return categories;
        } catch (error) {
          throw new Error('Error fetching categories: ' + error.message);
        }
      },
    },
    Mutation: {
        createCategory: async (_, { categoryName }) => {
            try {
                const newCategory = {
                    name: categoryName,
                }
                const category = await Category.create(newCategory);
                return category;
            } catch (error) {
                throw new Error('Error creating category: ' + error.message);
            }
        },
    }
}

module.exports = categoryResolvers;
