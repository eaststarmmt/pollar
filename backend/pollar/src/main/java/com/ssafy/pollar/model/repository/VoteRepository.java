package com.ssafy.pollar.model.repository;

import com.ssafy.pollar.domain.entity.User;
import com.ssafy.pollar.domain.entity.Vote;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface VoteRepository extends JpaRepository<Vote,Long> {
    List<Vote> findAllByAuthor(User user);
    long countAllByAuthor(User user);
    @Query(value = "select v from User u join u.userParticipates up join up.voteParticipate vs join vs.voteSelect v where u.userId=?1")
    List<Vote> getUserParticipateVoteList(String userId);
    @Query(value = "select v from User u join u.userVoteLikes ul join ul.voteLike v where u.userId=?1")
    List<Vote> getUserLikeVoteList(String userId);

}
