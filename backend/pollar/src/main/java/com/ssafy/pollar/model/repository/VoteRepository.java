package com.ssafy.pollar.model.repository;

import com.ssafy.pollar.domain.entity.Category;
import com.ssafy.pollar.domain.entity.User;
import com.ssafy.pollar.domain.entity.Vote;
import com.ssafy.pollar.domain.entity.VoteSelect;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalDateTime;
import java.util.Optional;
import java.util.List;

public interface VoteRepository extends JpaRepository<Vote,Long> {
    List<Vote> findAllByAuthor(User user);  //유저가 만든 투표 반환
    long countAllByAuthor(User user);       //유저가 만든 투표 개수
    @Query(value = "select v from User u join u.userParticipates up join up.voteParticipate vs join vs.voteSelect v where u.userId=?1")
    List<Vote> getUserParticipateVoteList(String userId);   //유저가 참여한 투표 리스트
    @Query(value = "select v from User u join u.userVoteLikes ul join ul.voteLike v where u.userId=?1")
    List<Vote> getUserLikeVoteList(String userId);          //유저가 좋아요 누른 투표 리스트
    Optional<Vote> findByVoteId(Long voteReply);
    @Query(value = "select v from Vote v join v.voteCategories vc where vc.category =?1")
    List<Vote> getUserInterestVoteList(Category cate);      //유저 관심분야 투표 리스트
    List<Vote> findByOrderByVoteCreateTimeDesc();           //투표 최신순 정렬
    @Query(value = "select  v from VoteParticipate vp join vp.voteParticipate vs join vs.voteSelect v where v.voteExpirationTime > ?1 group by v.voteId order by count(v.voteId) desc")
    List<Vote> getTop3TrendingVote(LocalDateTime now, Pageable pageable);


}
