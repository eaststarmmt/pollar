package com.ssafy.pollar.model.service;

import com.ssafy.pollar.model.dto.VoteDto;

import java.util.List;

public interface ProfileService {
    List<VoteDto> getProfileUploadVotes(String loggedUserId, String profileUserId) throws Exception;
    List<VoteDto> getProfileLikeVotes(String loggedUserId, String profileUserId) throws Exception;
    List<VoteDto> getProfileParticipateVotes(String loggedUserId, String profileUserId) throws Exception;
}
