package com.ssafy.pollar.controller;

import com.ssafy.pollar.model.dto.*;
import com.ssafy.pollar.model.service.*;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/profile")
@RequiredArgsConstructor
@CrossOrigin
public class ProfileController {

    private final UserService userService;
    private final FollowingService followingService;
    private final CategoryService categoryService;
    private final ProfileService profileService;
    private static final String SUCCESS = "success";
    private static final String FAIL = "fail";

    @ApiOperation(value = "유저 프로필 정보")
    @GetMapping("/userInfo")
    public ResponseEntity<Map<String,Object>> profileInfo(@RequestParam String logInUserId, @RequestParam String profileUserId){
        Map<String,Object> resultMap = new HashMap<>();
        HttpStatus status = null;
        try {
            UserDto userDto = userService.getUserInfo(profileUserId);
            List<CategoryDto> interests = categoryService.getUserCategories(profileUserId);

            resultMap.put("userId",userDto.getUserId());
            resultMap.put("userNickname",userDto.getUserNickname());
            resultMap.put("userProfilePhoto",userDto.getUserProfilePhoto());

            List<FollowingDto> followerIdList = followingService.followerList(logInUserId, profileUserId);
            List<FollowingDto> followingIdList = followingService.followingList(logInUserId, profileUserId);

            resultMap.put("followerCount",followerIdList.size());
            resultMap.put("followingCount",followingIdList.size());
            resultMap.put("interests",interests);

            Boolean isFollow = followingService.isFollow(logInUserId,profileUserId);
            resultMap.put("isFollow",isFollow);
            status = HttpStatus.OK;
            resultMap.put("message",SUCCESS);
        }catch (Exception e){
            status = HttpStatus.INTERNAL_SERVER_ERROR;
            resultMap.put("message",FAIL);
        }

        return new ResponseEntity<>(resultMap,status);
    }

    @ApiOperation(value = "업로드한 투표")
    @GetMapping("/uploads")
    public ResponseEntity<Map<String,Object>> profileUploadVotes(@RequestParam String logInUserId, @RequestParam String profileUserId){
        Map<String,Object> resultMap = new HashMap<>();
        HttpStatus status = null;
        List<VoteDto> voteDtoList = new ArrayList<>();
        try {
            voteDtoList = profileService.getProfileUploadVotes(logInUserId,profileUserId);
            resultMap.put("uploadsVoteList",voteDtoList);
            status = HttpStatus.OK;
            resultMap.put("message",SUCCESS);
        }catch (Exception e){
            status = HttpStatus.INTERNAL_SERVER_ERROR;
            resultMap.put("message",FAIL);
        }
        return new ResponseEntity<>(resultMap,status);
    }

    @ApiOperation(value = "좋아요한 투표")
    @PostMapping("/likes")
    public ResponseEntity<Map<String,Object>> profileLikeVotes(@RequestParam String logInUserId, @RequestParam String profileUserId){
        Map<String,Object> resultMap = new HashMap<>();
        HttpStatus status = null;
        List<VoteDto> voteDtoList = new ArrayList<>();
        try {
            voteDtoList = profileService.getProfileLikeVotes(logInUserId,profileUserId);
            resultMap.put("uploadsVoteList",voteDtoList);
            status = HttpStatus.OK;
            resultMap.put("message",SUCCESS);
        }catch (Exception e){
            status = HttpStatus.INTERNAL_SERVER_ERROR;
            resultMap.put("message",FAIL);
        }

        return new ResponseEntity<>(resultMap,status);
    }

    @ApiOperation(value = "참여한 투표")
    @PostMapping("/participates")
    public ResponseEntity<Map<String,Object>> profileUserParticipateVote(@RequestBody ProfileDto profileDto){
        Map<String,Object> resultMap = new HashMap<>();
        HttpStatus status = null;
        List<VoteDto> voteDtoList = new ArrayList<>();
        try {
            voteDtoList = profileService.getProfileParticipateVotes(profileDto.getLoginUserId(),profileDto.getProfileUserId());
            resultMap.put("uploadsVoteList",voteDtoList);
            status = HttpStatus.OK;
            resultMap.put("message",SUCCESS);
        }catch (Exception e){
            status = HttpStatus.INTERNAL_SERVER_ERROR;
            resultMap.put("message",FAIL);
        }

        return new ResponseEntity<>(resultMap,status);
    }
}
