const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema({

    title:{
        type: String,
        required: true
    },
    summary:{
        type: String,
        required: true
    },
    content:{
        type: String,
        required: true
    },
    imageUrl:{
        type: String,
        required: true
    },
    date:{
        type: String,
        required: true
    },
    categories:{
        type: [String],
        required: false
    },
    published:{
        type: Boolean,
        required: true
    },
    project:{
        type: Boolean,
        required: true
    }
})

const Article = mongoose.model('Article', articleSchema);

Article.getAllPublishedArticles = async (categories, limit, offset) => {
   
    if(categories && categories.length > 0){
        try {
            const total = await Article.find({ published: true, categories: { $in: categories } }).countDocuments();
            const articles = await Article.find({ published: true, categories: { $in: categories } })
            .sort({date: -1})
            .skip(offset)
            .limit(limit);
            return {articles, total};
          } catch (error) {
            throw new Error('Error fetching published articles: ' + error.message);
          }
    }
    else {
        try {
            const total = await Article.find({ published: true }).countDocuments();
            const articles = await Article.find({ published: true })
            .sort({date: -1})
            .skip(offset)
            .limit(limit);
            return {articles, total};
          } catch (error) {
            throw new Error('Error fetching published articles: ' + error.message);
          }
    }
}
  
  Article.getArticleById = async (id) => {
    try {
      const article = await Article.findOne({ _id: id });
      return article;
    } catch (error) {
      throw new Error('Error fetching article by ID: ' + error.message);
    }
  };
  
  Article.getArticlesByDate = async (from, to) => {
    try {
      const articles = await Article.find({ date: { $gte: from, $lte: to } });
      return articles;
    } catch (error) {
      throw new Error('Error fetching articles by date range: ' + error.message);
    }
  };
  
  Article.getAllProjects = async () => {
    try {
      const articles = await Article.find({ project: true });
      return articles;
    } catch (error) {
      throw new Error('Error fetching project articles: ' + error.message);
    }
  };
  
  Article.getAllArticles = async () => {
    try {
      const articles = await Article.find({});
      return articles;
    } catch (error) {
      throw new Error('Error fetching all articles: ' + error.message);
    }
  };
  
  Article.createArticle = async (input) => {
    try {
      const article = await Article.create(input);
      return article;
    } catch (error) {
      throw new Error('Error creating article: ' + error.message);
    }
  };
 module.exports = Article;