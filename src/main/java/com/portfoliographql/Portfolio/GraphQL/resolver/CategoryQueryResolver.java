package com.portfoliographql.Portfolio.GraphQL.resolver;

import java.util.List;

import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.stereotype.Controller;

import com.portfoliographql.Portfolio.GraphQL.model.Category;
import com.portfoliographql.Portfolio.GraphQL.repository.CategoryRepository;

import graphql.kickstart.tools.GraphQLQueryResolver;

@Controller
public class CategoryQueryResolver implements GraphQLQueryResolver {

    private final CategoryRepository categoryRepository;

    public CategoryQueryResolver(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    @QueryMapping
    public List<Category> getCategories() {
        return categoryRepository.findAll();
    }

}
