package com.ssafy.pollar.model.repository;

import com.ssafy.pollar.domain.entity.Vote;
import com.ssafy.pollar.domain.entity.VoteSelect;
import com.ssafy.pollar.model.dto.SelectionDto;
import lombok.extern.java.Log;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface VoteSelectRepository extends JpaRepository<VoteSelect, Long> {
    List<VoteSelect> getAllByVoteSelect(Vote vote);
}
