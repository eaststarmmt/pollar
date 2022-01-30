package com.ssafy.pollar.model.service;

import com.ssafy.pollar.domain.entity.Following;
import com.ssafy.pollar.domain.entity.User;
import com.ssafy.pollar.model.dto.FollowingDto;
import com.ssafy.pollar.model.repository.FollowingRepository;
import com.ssafy.pollar.model.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class FollowingServiceImpl implements FollowingService {
    private final FollowingRepository followingRepository;
    private final UserRepository userRepository;

    // 팔로우 요청 보내기
    @Override
    public void followsend(String myId, String sendId) throws Exception {
        User followee = userRepository.findByUserId(myId).orElseThrow(IllegalAccessError::new);
        User follower = userRepository.findByUserId(sendId).orElseThrow(IllegalAccessError::new);
        Following following = Following.builder()
                        .followee(followee)
                        .follower(follower)
                        .build();
        followingRepository.save(following);
    }

    // 언팔로우 하기
    @Transactional
    @Override
    public void unfollow(String myId, String unfollowId) throws Exception {
        User followee = userRepository.findByUserId(myId).orElseThrow(IllegalAccessError::new);
        User follower = userRepository.findByUserId(unfollowId).orElseThrow(IllegalAccessError::new);
        Following following = Following.builder()
                .followee(followee)
                .follower(follower)
                .build();
        followingRepository.delete(following);
    }

    // follower List 보여주기
    @Override
    public List<FollowingDto> followerlist(String userId) throws Exception {
        List<Following> follower = followingRepository.getFollower(userId);
        List<FollowingDto> followingDtoList = new ArrayList<>();
        for(int i=0;i<follower.size();i++){
            followingDtoList.add(new FollowingDto(follower.get(i)));
        }
        return followingDtoList;
    }

    // followee List 보여주기
    @Override
    public List<FollowingDto> followeelist(String userId) throws Exception {
        List<Following> followee = followingRepository.getFollowee(userId);
        List<FollowingDto> followingDtoList = new ArrayList<>();
        for(int i=0;i<followee.size();i++){
            followingDtoList.add(new FollowingDto(followee.get(i)));
        }
        return followingDtoList;
    }
}
