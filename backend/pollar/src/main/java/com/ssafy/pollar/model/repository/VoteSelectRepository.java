package com.ssafy.pollar.model.repository;

import com.ssafy.pollar.domain.entity.Vote;
import com.ssafy.pollar.domain.entity.VoteSelect;
import com.ssafy.pollar.model.dto.SelectionDto;
import lombok.extern.java.Log;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface VoteSelectRepository extends JpaRepository<VoteSelect, Long> {
    List<VoteSelect> getAllByVoteSelect(Vote vote);
    @Query(value = "select vs from User u join u.userParticipates up join up.voteParticipate vs join vs.voteSelect v where u.userId=?1 and v.voteId=?2")
    Optional<VoteSelect> isParticipate(String userId, Long voteId);

}
