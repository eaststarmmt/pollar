package com.ssafy.pollar.model.service;

import com.ssafy.pollar.model.dto.VoteDto;

import java.util.List;

public interface VoteService {
    void create(VoteDto voteDto) throws Exception;  // 게시글 만들기
    void delete(Long voteId) throws Exception;  // 게시글 삭제
    VoteDto detail(Long voteId) throws Exception;                // 게시글 상세보기
    List<VoteDto> getVoteList() throws Exception;
}
