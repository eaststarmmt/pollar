package com.ssafy.pollar.model.repository;

import com.ssafy.pollar.domain.entity.UserCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

public interface UserCategoryRepository extends JpaRepository<UserCategory, Long>{
    @Modifying(clearAutomatically = true)
    @Transactional
    @Query(value = "delete from UserCategory as uc where uid = ?1",nativeQuery = true)
    int deleteUserCategories(String uid);
}
