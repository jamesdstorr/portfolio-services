package com.portfoliographql.Portfolio.GraphQL.resolver;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.MutationMapping;
import org.springframework.stereotype.Controller;

import com.portfoliographql.Portfolio.GraphQL.model.Category;
import com.portfoliographql.Portfolio.GraphQL.repository.CategoryRepository;
import graphql.kickstart.tools.GraphQLMutationResolver;

@Controller
public class CategoryMutationResolver implements GraphQLMutationResolver {
    
    private final CategoryRepository categoryRepository;

    public CategoryMutationResolver(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    @MutationMapping
    public Category createCategory(@Argument("categoryName") String categoryName) {
        try {
            Category category = new Category();
            category.setName(categoryName);
            return categoryRepository.save(category);
           
        } catch (Exception e) {
            System.out.println(e);
        }
        return null;
    }
}
