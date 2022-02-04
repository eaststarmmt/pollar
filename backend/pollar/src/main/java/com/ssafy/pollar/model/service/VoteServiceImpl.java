package com.ssafy.pollar.model.service;

import com.ssafy.pollar.domain.entity.Vote;
import com.ssafy.pollar.model.dto.VoteDto;
import com.ssafy.pollar.model.repository.VoteRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.Optional;
import java.time.LocalDateTime;


@Service
@RequiredArgsConstructor
public class VoteServiceImpl implements VoteService {
    // private final을 사용해야 RequiredArgsConstructor 을 통해 초기화 됨
    private final VoteRepository voteRepository;

    @Override
    public void create(VoteDto voteDto) throws Exception {  // 피드 생성
        // vote Entity 객체를 생성해서 dto에서 값 받아오기
        Vote vote = Vote.builder()  // vote entity 객체에 vote dto 객체 값 전달
                .voteName(voteDto.getVoteName())
                .voteContent(voteDto.getVoteContent())
                .voteType(voteDto.getVoteType())
                .userAnonymouseType(voteDto.getUserAnonymouseType())
                .voteAnonymouseType(voteDto.getVoteAnonymouseType())
                .voteExpirationTime(LocalDateTime.now().plusDays(7))    // 현재시간에서 7일 더함
                .build();
        voteRepository.save(vote);  // DB에 전달 받은 vote 정보 저장
    }

    @Override
    public void delete(Long voteId) throws Exception {  // 피드 삭제
        Optional<Vote> vote = voteRepository.findById(voteId);  // 파라미터로 받아온 id를 이용해서 삭제할 vote 가져오기
        voteRepository.delete(vote.get());  // 해당 피드 DB에서 삭제
    }

    @Override
    public VoteDto detail(Long voteId) throws Exception {   // 피드 상세보기
        Optional<Vote> vote = voteRepository.findById(voteId);  // 아이디로 해당 투표 찾기
        return new VoteDto(vote.get());     // 해당 투표를 dto로 변환 후 리턴
    }
}
