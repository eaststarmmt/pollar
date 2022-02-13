package com.ssafy.pollar.model.repository;

import com.ssafy.pollar.domain.entity.Category;
import com.ssafy.pollar.domain.entity.Vote;
import com.ssafy.pollar.domain.entity.VoteCategory;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface VoteCategoryRepository extends JpaRepository<VoteCategory,Long> {
    Optional<List<VoteCategory>> findAllByCategory(Category category);
    Optional<List<VoteCategory>> findAllByVoteCategory(Vote vote);
}
