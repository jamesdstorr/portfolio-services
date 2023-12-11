package com.portfoliographql.Portfolio.GraphQL.resolver;
import java.time.LocalDate;

import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.MutationMapping;
import org.springframework.stereotype.Controller;

import com.portfoliographql.Portfolio.GraphQL.model.Article;
import com.portfoliographql.Portfolio.GraphQL.model.ArticleInput;
import com.portfoliographql.Portfolio.GraphQL.repository.ArticleRepository;

import graphql.kickstart.tools.GraphQLMutationResolver;

@Controller
public class ArticleMutationResolver implements GraphQLMutationResolver{
    
    private final ArticleRepository articleRepository;

    public ArticleMutationResolver(ArticleRepository articleRepository) {
        this.articleRepository = articleRepository;
    }

    @MutationMapping
    public Article createArticle(@Argument("input") ArticleInput input) {
        System.out.println("createArticle");
        LocalDate today = LocalDate.now();
        try {
            Article article = new Article();
            article.setTitle(input.getTitle());
            article.setSummary(input.getSummary());
            article.setContent(input.getContent());
            article.setImageUrl(input.getImageUrl());
            article.setDate(today.toString());
            article.setCategories(input.getCategories());
            System.out.println(article.getTitle());
            return articleRepository.save(article);
        } catch (Exception e) {
            System.out.println(e);
        }
        return null;
    }
}
