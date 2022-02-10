package com.ssafy.pollar.model.service;

import com.ssafy.pollar.domain.entity.Reply;
import com.ssafy.pollar.domain.entity.User;
import com.ssafy.pollar.domain.entity.Vote;
import com.ssafy.pollar.model.dto.ReplyDto;
import com.ssafy.pollar.model.repository.ReplyRepository;
import com.ssafy.pollar.model.repository.UserRepository;
import com.ssafy.pollar.model.repository.VoteRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ReplyServiceImpl implements ReplyService {
    // private final을 사용해야 RequiredArgsConstructor 을 통해 초기화 됨
    private final ReplyRepository replyRepository;
    private final UserRepository userRepository;
    private final VoteRepository voteRepository;
    @Override
    public void create(ReplyDto replyDto) throws Exception {    // 댓글 생성

        User replyUser = userRepository.findByUserId(replyDto.getReplyUser()).get();    // user id로 user 객체 찾아오기
        Vote voteReply = voteRepository.findByVoteId(replyDto.getVoteReply()).get();    // vote id로 vote 객체 찾아오기
        Reply reply = Reply.builder()
                .replyUser(replyUser)
                .voteReply(voteReply)
                .replyContent(replyDto.getReplyContent())
                .replyCreateTime(LocalDateTime.now())   // 현재시간 입력
                .build();
        replyRepository.save(reply);    // DB에 reply 정보 저장
    }

    @Override
    public List<ReplyDto> getReplies(Long voteId) throws Exception {    // 해당 투표의 댓글들 불러오기

        Vote vote = voteRepository.findById(voteId).get();  // 아이디를 이용하여 해당 투표를 가져옴
        List<Reply> replies = replyRepository.getAllByVoteReply(vote);  // 투표의 댓글 엔티티 불러옴
        List<ReplyDto> dtoList = new ArrayList<>();     // 리턴할 reply dto list 생성

        for(Reply reply : replies) {    // reply 엔티티를 reply dto로 변환해서 list에 추가
            dtoList.add(new ReplyDto(reply));
        }

        return dtoList;
    }

    @Override
    public void delete(Long replyId) throws Exception {   // 해당 댓글의 아이디를 이용해서 댓글 삭제
        Optional<Reply> reply = replyRepository.findById(replyId); 
        replyRepository.delete(reply.get());
    }
}
