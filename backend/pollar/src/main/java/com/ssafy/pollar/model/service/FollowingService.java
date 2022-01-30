package com.ssafy.pollar.model.service;

import com.ssafy.pollar.domain.entity.Following;
import com.ssafy.pollar.model.dto.FollowingDto;

import java.util.List;

public interface FollowingService {
    void followsend(String myId,String sendId) throws Exception;
    void unfollow(String myId, String unfollowId) throws Exception;
    List<FollowingDto> followerlist(String userId) throws Exception;
    List<FollowingDto> followeelist(String userId) throws Exception;
}
