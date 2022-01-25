package com.ssafy.pollar.model.repository;

import com.ssafy.pollar.domain.entity.UserCategory;
import org.springframework.data.jpa.repository.JpaRepository;

public interface userCategoryRepository extends JpaRepository<UserCategory, Long>{

}
