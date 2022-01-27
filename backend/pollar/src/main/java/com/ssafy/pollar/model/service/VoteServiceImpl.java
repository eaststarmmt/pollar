package com.ssafy.pollar.model.service;

import com.ssafy.pollar.domain.entity.Vote;
import com.ssafy.pollar.model.dto.VoteDto;
import com.ssafy.pollar.model.repository.VoteRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class VoteServiceImpl implements VoteService {

    private VoteRepository voteRepository;

    @Override
    public void create(VoteDto voteDto) throws Exception {
        // vote Entity 객체를 생성해서 dto에서 값 받아오기
        Vote vote = Vote.builder()
                .voteName(voteDto.getVoteName())
                .build();
        voteRepository.save(vote);  // DB에 vote 정보 저장
    }
}
