package com.ssafy.pollar.model.repository;

import com.ssafy.pollar.domain.entity.User;
import com.ssafy.pollar.domain.entity.Vote;
import com.ssafy.pollar.domain.entity.VoteParticipate;
import com.ssafy.pollar.domain.entity.VoteSelect;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface VoteParticipateRepository extends JpaRepository<VoteParticipate,Long> {
    Optional<VoteParticipate> findByUserParticipateAndVoteParticipate(User user, VoteSelect voteSelect);
    long countAllByUserParticipate(User user);
    long countAllByVoteParticipate(VoteSelect voteSelect);
    Optional<List<VoteParticipate>> findAllByUserParticipate(User user);

    @Query(value = "select u from VoteParticipate vp join vp.userParticipate u where vp.voteParticipate=?1")
    List<User> getUserList(VoteSelect select);
}
