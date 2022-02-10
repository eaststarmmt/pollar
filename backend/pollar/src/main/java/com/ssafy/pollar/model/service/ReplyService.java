package com.ssafy.pollar.model.service;

import com.ssafy.pollar.model.dto.ReplyDto;

import java.util.List;

public interface ReplyService {
    void create(ReplyDto replyDto) throws Exception;
    List<ReplyDto> getReplies(Long voteId) throws Exception;
    void delete(Long replyId) throws Exception;
}
