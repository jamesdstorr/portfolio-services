package com.portfoliographql.Portfolio.GraphQL.model;

import java.util.List;

public class ArticleInput {
    private String title;
    private String summary;
    private String content;
    private String imageUrl;
    private List<String> categories;
    private boolean published;
    private String id;
    private boolean project;


    public boolean isProject() {
        return project;
    }

    public void setProject(boolean project) {
        this.project = project;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public boolean getPublished() {
        return published;
    }

    public void setPublished(boolean published) {
        System.out.println(published);
        this.published = published;
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
