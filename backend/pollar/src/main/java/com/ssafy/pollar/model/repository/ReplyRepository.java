package com.ssafy.pollar.model.repository;

import com.ssafy.pollar.domain.entity.Reply;
import com.ssafy.pollar.domain.entity.Vote;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ReplyRepository extends JpaRepository<Reply, Long> {
    List<Reply> getAllByVoteReply(Vote vote);
    long existsAllByVoteReply(Vote vote);
}
