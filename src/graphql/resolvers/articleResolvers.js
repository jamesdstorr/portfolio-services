const { format } = require("path");
const Article = require("../../data/models/article");
const jwt = require("jsonwebtoken");

function verifyToken(token, secret) {
  try {
    const decoded = jwt.verify(token, secret);

    return decoded;
  } catch (error) {
    throw new Error(error.message);
  }
}

function formatDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${day}-${month}-${year}`;
  }

const articleResolvers = {
  Query: {
    getAllPublishedArticles: async (_, { categories, limit, offset }) => {
      try {
        const articles = await Article.getAllPublishedArticles(categories, limit, offset);
        return articles;
      } catch (error) {
        throw new Error("Error fetching published articles: " + error.message);
      }
    },
    getArticleById: async (_, { id }) => {
      try {
        const article = await Article.getArticleById(id);
        return article;
      } catch (error) {
        throw new Error("Error fetching article by ID: " + error.message);
      }
    },
    getArticlesByDate: async (_, { from, to }) => {
      try {
        const articles = await Article.getArticlesByDate(from, to);
        return articles;
      } catch (error) {
        throw new Error("Error fetching articles by date: " + error.message);
      }
    },
    getAllProjects: async () => {
      try {
        const articles = await Article.getAllProjects();
        return articles;
      } catch (error) {
        throw new Error("Error fetching projects: " + error.message);
      }
    },
    getAllArticles: async (_, args, context) => {
        const {token} = context;
        
        if(!token){
            throw new Error('Authentication required');
        }
        const decoded = verifyToken(token, process.env.SECRET);
      
      try {
        const articles = await Article.getAllArticles();
        return articles;
      } catch (error) {
        throw new Error("Error fetching all articles: " + error.message);
      }
    },
  },
  Mutation: {
    createArticle: async (_, { input }, context) => {
      const {token} = context;
      if(!token){
        throw new Error('Authentication required');
      }
      
      if(verifyToken(token, process.env.SECRET).username !== 'admin'){
        throw new Error('Authentication failed');
      }

      if (input.id) {
        try {
          const updatedArticle = {
            title: input.title,
            summary: input.summary,
            content: input.content,
            imageUrl: input.imageUrl,
            categories: input.categories,
            published: input.published,
            project: input.project,
            date: formatDate(new Date()),
          };
          const response = await Article.updateOne(
            { _id: input.id },
            updatedArticle
          );
          if (response.nModified === 0) {
            throw new Error("Article not updated");
          }
          else{
            const article = await Article.getArticleById(input.id);
            return article;
          }
          
          
        } catch (error) {
          throw new Error("Error updating article: " + error.message);
        }
      }
      try {
        const newArticle = {
          title: input.title,
          summary: input.summary,
          content: input.content,
          imageUrl: input.imageUrl,
          categories: input.categories,
          published: input.published,
          project: input.project,
          date: formatDate(new Date()),
        };
        const response = await Article.createArticle(newArticle);
        console.log(response)
        return response;
      } catch (error) {
        throw new Error("Error creating article: " + error.message);
      }
    },
     deleteArticle: async (_, { id }) => {
        try {
          const response = await Article.deleteOne({ _id: id });
          return response;
        } catch (error) {
          throw new Error("Error deleting article: " + error.message);
        }
      } 
  },
 
};

module.exports = articleResolvers;
