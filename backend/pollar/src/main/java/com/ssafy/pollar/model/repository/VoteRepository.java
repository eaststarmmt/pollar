package com.ssafy.pollar.model.repository;

import com.ssafy.pollar.domain.entity.Vote;
import org.springframework.data.jpa.repository.JpaRepository;

public interface VoteRepository extends JpaRepository<Vote,Long> {

}
