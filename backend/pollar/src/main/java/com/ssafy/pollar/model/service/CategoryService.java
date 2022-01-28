package com.ssafy.pollar.model.service;

import com.ssafy.pollar.model.dto.CategoryDto;

import java.util.List;

public interface CategoryService {
    List<CategoryDto> getAllCategories()throws Exception;
    List<CategoryDto> getUserCategories(String userId)throws Exception;
    void deleteUserCategories(String userId) throws Exception;
    void insertUserCategory(String userId , long categoryId )throws Exception;
    List<CategoryDto> getVoteCategories(long voteId)throws Exception;

}
