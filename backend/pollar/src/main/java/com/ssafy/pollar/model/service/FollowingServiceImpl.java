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
    @Transactional
    @Override
    public boolean followSend(String myId, String sendId) throws Exception {
        User followee = userRepository.findByUserId(myId).orElseThrow(IllegalAccessError::new);
        User follower = userRepository.findByUserId(sendId).orElseThrow(IllegalAccessError::new);
        Following following = Following.builder()
                        .followee(followee)
                        .follower(follower)
                        .build();
        if(followingRepository.findByFollowerAndAndFollowee(follower,followee).isPresent()){// 이미 팔로우 존재
            return false;
        }else{
            followingRepository.save(following);
            return true;
        }
    }

    // 언팔로우 하기
    @Transactional
    @Override
    public void unfollow(String myId, String unfollowId) throws Exception {
        User followee = userRepository.findByUserId(myId).orElseThrow(IllegalAccessError::new);
        User follower = userRepository.findByUserId(unfollowId).orElseThrow(IllegalAccessError::new);

        Following following = followingRepository.findByFollowerAndAndFollowee(follower,followee).get();
        followingRepository.delete(following);
    }

    // follower List 보여주기
    @Override
    public List<FollowingDto> followerList(String userId) throws Exception {
        User user = userRepository.findByUserId(userId).get();
        List<Following> follower = followingRepository.findAllByFollower(user).get();  // 팔로워 리스트
        List<Following> anotherFollower = followingRepository.findAllByFollowee(user).get(); // 맞 팔로우 확인용 리스트
        List<FollowingDto> followingDtoList = new ArrayList<>();

        for(int i = 0 ; i < follower.size() ; i++){
            String followerUserId = follower.get(i).getFollower().getUserId(); // 나를 팔로우하는 아이디
            String followeeUserId = follower.get(i).getFollowee().getUserId(); // 현재 프로필 아이디
            String followerUserNickname = follower.get(i).getFollower().getUserNickname();
            String followeeUserNickname = follower.get(i).getFollowee().getUserNickname();
            Boolean isFollow = false;
            String followUserProfilePhoto = follower.get(i).getFollower().getUserProfilePhoto();

            for(int j=0; j < anotherFollower.size() ; j++){
                String anotherFollowerUserId = anotherFollower.get(j).getFollower().getUserId();
                if(anotherFollowerUserId.equals(followerUserId)){
                    isFollow = true;
                    break;
                }
            }
            FollowingDto followingDto = new FollowingDto(followerUserId,followeeUserId,followerUserNickname,followeeUserNickname,isFollow,followUserProfilePhoto);
            followingDtoList.add(followingDto);
        }
        return followingDtoList;
    }

    // following  List 보여주기
    @Override
    public List<FollowingDto> followingList(String userId) throws Exception {
        User user = userRepository.findByUserId(userId).get();
        List<Following> following = followingRepository.findAllByFollowee(user).get();
        List<FollowingDto> followingDtoList = new ArrayList<>();

        for(int i = 0; i < following.size() ; i++){
            String followerUserId = following.get(i).getFollower().getUserId(); // 나를 팔로우하는 아이디
            String followeeUserId = following.get(i).getFollowee().getUserId(); // 현재 프로필 아이디
            String followerUserNickname = following.get(i).getFollower().getUserNickname();
            String followeeUserNickname = following.get(i).getFollowee().getUserNickname();
            String followUserProfilePhoto = following.get(i).getFollowee().getUserProfilePhoto();
            FollowingDto followingDto = new FollowingDto(followerUserId,followeeUserId,followerUserNickname,followeeUserNickname,true,followUserProfilePhoto);
            followingDtoList.add(followingDto);
        }
        return followingDtoList;
    }

    @Override
    public Boolean isFollow(String myId, String profileId) throws Exception {
        User loginUser = userRepository.findByUserId(myId).get();
        List<Following> loginfollowing = followingRepository.findAllByFollowee(loginUser).get();
        for(int i = 0 ; i < loginfollowing.size() ; i++){
            String followerUserId = loginfollowing.get(i).getFollower().getUserId(); // 내가 팔로우 하는 아이디
            if(followerUserId.equals(profileId)){
                return true;
            }
        }
        return false;
    }

}
