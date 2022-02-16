package com.ssafy.pollar.model.dto;

import com.ssafy.pollar.domain.entity.Category;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor

public class CategoryDto {

    private long categoryId;
    private String categoryNameBig;
    private String categoryNameSmall;

    public CategoryDto(Category category){
        this.categoryId=category.getCategoryId();
        this.categoryNameBig=category.getCategoryNameBig();
        this.categoryNameSmall=category.getCategoryNameSmall();
    }
}
