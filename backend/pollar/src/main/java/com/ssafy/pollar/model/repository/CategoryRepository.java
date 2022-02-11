package com.ssafy.pollar.model.repository;

import com.ssafy.pollar.domain.entity.Category;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface CategoryRepository extends JpaRepository<Category,Long> {

    @Query(value = "select c from Category c join c.UserCategories uc join uc.userCategory u where u.userId  = ?1 ")
    List<Category> getUserCategories(String userId);

    @Query(value = "select c from Category c join c.voteCategories vc join vc.voteCategory v where v.voteId = ?1")
    List<Category> getVoteCategories(long voteId);
    Optional<Category> findByCategoryNameSmall(String categoryName);
}
