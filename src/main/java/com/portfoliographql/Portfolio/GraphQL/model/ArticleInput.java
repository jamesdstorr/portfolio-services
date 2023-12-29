package com.portfoliographql.Portfolio.GraphQL.model;

import java.util.List;

public class ArticleInput {
    private String title;
    private String summary;
    private String content;
    private String imageUrl;
    private List<String> categories;
    private boolean isPublished;


    public boolean isPublished() {
        return isPublished;
    }

    public void setPublished(boolean isPublished) {
        this.isPublished = isPublished;
    }

    public List<String> getCategories(){
        return categories;
    }

    public void setCategories(List<String> categories){
        this.categories = categories;
    }

    public String getTitle(){
        return title;
    }

    public void setTitle(String title){
        this.title = title;
    }

    public String getSummary(){
        return summary;
    }

    public void setSummary(String summary){
        this.summary = summary;
    }

    public String getContent(){
        return content;
    }

    public void setContent(String content){
        this.content = content;
    }

    public String getImageUrl(){
        return imageUrl;
    }

    public void setImageUrl(String imageUrl){
        this.imageUrl = imageUrl;
    }


}
