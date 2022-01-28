package com.ssafy.pollar.model.service;

import com.ssafy.pollar.domain.entity.Category;
import com.ssafy.pollar.domain.entity.User;
import com.ssafy.pollar.domain.entity.UserCategory;
import com.ssafy.pollar.domain.entity.VoteCategory;
import com.ssafy.pollar.model.dto.CategoryDto;
import com.ssafy.pollar.model.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class CategoryServiceImpl implements CategoryService{

    private final UserRepository userRepository;
    private final CategoryRepository categoryRepository;
    private final UserCategoryRepository userCategoryRepository;
    private final VoteCategoryRepository voteCategoryRepository;
    private final VoteRepository voteRepository;

    @Override
    public List<CategoryDto> getAllCategories() throws Exception {
        List<Category> clist = categoryRepository.findAll();

        List<CategoryDto> list = new ArrayList<>();
        for (Category cate: clist) {
            CategoryDto temp= new CategoryDto(cate);
            list.add(temp);
        }

        return list;
    }

    @Override
    public List<CategoryDto> getUserCategories(String userId) throws Exception {
        List<Category> entityList = categoryRepository.getUserCategories(userId);
        List<CategoryDto> dtoList = new ArrayList<>();
        for (Category cateEntity: entityList) {
            CategoryDto temp = new CategoryDto(cateEntity);
            dtoList.add(temp);
        }

        return dtoList;
    }

    @Override
    public void deleteUserCategories(String userId) throws Exception {
        String uid = userRepository.findByUserId(userId).get().getUid();
        int cnt = userCategoryRepository.deleteUserCategories(uid);
        System.out.println(cnt);
    }

    @Override
    public void insertUserCategory(String userId, long categoryId) throws Exception {
        UserCategory userCategory = UserCategory.builder()
                .userCategory(userRepository.findByUserId(userId).get())
                .category(categoryRepository.findById(categoryId).get())
                .build();
        userCategoryRepository.save(userCategory);
    }

    @Override
    public List<CategoryDto> getVoteCategories(long voteId) throws Exception {
        List<Category> entityList = categoryRepository.getVoteCategories(voteId);
        List<CategoryDto> dtoList = new ArrayList<>();
        for (Category cateEntity: entityList) {
            CategoryDto temp = new CategoryDto(cateEntity);
            dtoList.add(temp);
        }

        return dtoList;
    }


}
