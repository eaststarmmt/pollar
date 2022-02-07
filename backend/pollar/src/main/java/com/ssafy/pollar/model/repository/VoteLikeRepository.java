package com.ssafy.pollar.model.repository;

import com.ssafy.pollar.domain.entity.User;
import com.ssafy.pollar.domain.entity.Vote;
import com.ssafy.pollar.domain.entity.VoteLike;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface VoteLikeRepository extends JpaRepository<VoteLike,Long> {
    @Query(value = "select vl from VoteLike vl where vl.userVoteLike=?1 and vl.voteLike=?2")
    Optional<VoteLike> findByUserVoteLikesAndVoteLikesByQuery(User user, Vote vote);

    @Query(value="select count (vl) from VoteLike vl where vl.voteLike.voteId=?1")
    int countLike(Long voteId);

    @Query(value = "select u.userId from VoteLike vl join vl.userVoteLike u where vl.voteLike.voteId=?1")
    List<String> getLikeListByQuery(Long voteId);
}
