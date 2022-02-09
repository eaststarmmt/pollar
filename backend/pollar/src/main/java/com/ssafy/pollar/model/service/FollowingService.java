package com.ssafy.pollar.model.service;

import com.ssafy.pollar.model.dto.FollowingDto;

import java.util.List;

public interface FollowingService {
    boolean followSend(String myId,String sendId) throws Exception;
    void unfollow(String myId, String unfollowId) throws Exception;
    List<FollowingDto> followerList(String loggedId,String profileId) throws Exception;
    List<FollowingDto> followingList(String loggedId,String profileId) throws Exception;
    Boolean isFollow(String myId, String profileId) throws Exception;
}
