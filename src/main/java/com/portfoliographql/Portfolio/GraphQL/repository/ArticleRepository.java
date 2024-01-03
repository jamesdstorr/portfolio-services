package com.portfoliographql.Portfolio.GraphQL.repository;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import com.portfoliographql.Portfolio.GraphQL.model.Article;

@Repository
public interface ArticleRepository extends MongoRepository<Article, String> {

    @Query("{ 'date' : { $gte:?0, $lte:?1 } }")
    List<Article> findByDateBetween(String from, String to);

    @Query("{ 'published' : true, 'project' : false }")
    List<Article> findAllPublished();

    @Query("{ 'project' : true, 'published' : true }")
    List<Article> findAllProjects();

  
}
