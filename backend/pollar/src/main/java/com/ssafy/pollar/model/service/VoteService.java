package com.ssafy.pollar.model.service;

import com.ssafy.pollar.model.dto.VoteDto;

public interface VoteService {
    void create(VoteDto voteDto) throws Exception;  // 게시글 만들기
}
