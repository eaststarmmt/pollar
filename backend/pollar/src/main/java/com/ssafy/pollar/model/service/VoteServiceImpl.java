package com.ssafy.pollar.model.service;

import com.ssafy.pollar.domain.entity.Vote;
import com.ssafy.pollar.model.dto.VoteDto;
import com.ssafy.pollar.model.repository.VoteRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class VoteServiceImpl implements VoteService {
    // private final을 사용해야 RequiredArgsConstructor 을 통해 초기화 됨
    private final VoteRepository voteRepository;

    @Override
    public void create(VoteDto voteDto) throws Exception {
        // vote Entity 객체를 생성해서 dto에서 값 받아오기
        Vote vote = Vote.builder()  // vote entity 객체에 vote dto 객체 값 전달
                .voteName(voteDto.getVoteName())
                .voteContent(voteDto.getVoteContent())
                .voteType(voteDto.getVoteType())
                .userAnonymouseType(voteDto.getUserAnonymouseType())
                .voteAnonymouseType(voteDto.getVoteAnonymouseType())
                .build();
        voteRepository.save(vote);  // DB에 전달 받은 vote 정보 저장
    }
}
