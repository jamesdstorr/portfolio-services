package com.portfoliographql.Portfolio.GraphQL.repository;
import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;

import org.springframework.stereotype.Repository;

import com.portfoliographql.Portfolio.GraphQL.model.Category;

@Repository
public interface CategoryRepository extends MongoRepository<Category, String> {
    
}
