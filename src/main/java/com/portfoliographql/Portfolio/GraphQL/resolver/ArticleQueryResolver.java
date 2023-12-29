package com.portfoliographql.Portfolio.GraphQL.resolver;

import graphql.kickstart.tools.GraphQLQueryResolver;
import java.util.List;

import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.stereotype.Controller;

import com.portfoliographql.Portfolio.GraphQL.model.Article;
import com.portfoliographql.Portfolio.GraphQL.repository.ArticleRepository;


@Controller
public class ArticleQueryResolver implements GraphQLQueryResolver {

    private final ArticleRepository articleRepository;
   

    public ArticleQueryResolver(ArticleRepository articleRepository) {
        this.articleRepository = articleRepository;
    }

   

    @QueryMapping
    public List<Article> getAllArticles() {
        return articleRepository.findAll();
    }

    @QueryMapping
    public Article getArticleById(@Argument("id") String id) {
        return articleRepository.findById(id).orElse(null);
    }

    @QueryMapping
    public List<Article> getArticlesByDate(@Argument("from") String from, @Argument("to") String to) {
        return articleRepository.findByDateBetween(from, to);
    }

  
}
