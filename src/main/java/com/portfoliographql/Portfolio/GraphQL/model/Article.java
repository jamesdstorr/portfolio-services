package com.portfoliographql.Portfolio.GraphQL.model;

import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "articles")
public class Article {
    
    @Id
    private String id;
    private String title;
    private String summary;
    private String content;
    private String imageUrl;
    private String date;
    private List<String> categories;
    private boolean published;


    public boolean getPublished() {
        return published;
    }


    public void setPublished(boolean published) {
        this.published = published;
    }


    public List<String> getCategories(){
        return categories;
    }


    public void setCategories(List<String> categories){
        this.categories = categories;
    }


public String getId(){
    return id;
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

public String getDate(){
    return date;
}

public void setDate(String date){
    this.date = date;
}

}