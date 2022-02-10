package com.ssafy.pollar.controller;

import com.ssafy.pollar.model.dto.FollowingDto;
import com.ssafy.pollar.model.service.FollowingService;
import com.ssafy.pollar.model.service.NotificationService;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/follow")
@CrossOrigin
public class FollowingController {

    private final FollowingService followingService;
    private final NotificationService notificationService;
    private static final String SUCCESS = "success";
    private static final String FAIL = "fail";

    // User follow 요청 통신
    @ApiOperation(value = "팔로우 하기")
    @PostMapping("/following")
    public ResponseEntity<String> followSend(@RequestBody FollowingDto followingDto){
        String result = "";
        HttpStatus status = null;
        try {
            String followeeUser = followingDto.getFollowingId();
            String followerUser = followingDto.getFollowerId();
            if(followingService.followSend(followeeUser,followerUser)){
                notificationService.followNotification(followeeUser,followerUser); // 팔로우 알림
                result = SUCCESS;
            }else{
                result = FAIL;
            }
            status = HttpStatus.ACCEPTED;
        }catch (Exception e){
            result = FAIL;
            status = HttpStatus.INTERNAL_SERVER_ERROR;
        }
        return new ResponseEntity<>(result,status);
    }

    // User unfollow 요청 통신 아직 비활성
    @ApiOperation(value = "언팔로우 하기")
    @PostMapping("/unfollow")
    public ResponseEntity<String> unfollow(@RequestBody FollowingDto followingDto){
        String result = "";
        HttpStatus status = null;
        try {
            String followeeUser = followingDto.getFollowingId();
            String followerUser = followingDto.getFollowerId();
            followingService.unfollow(followeeUser,followerUser);
            result = SUCCESS;
            status = HttpStatus.ACCEPTED;
        }catch (Exception e){
            result = FAIL;
            status = HttpStatus.INTERNAL_SERVER_ERROR;
        }
        return new ResponseEntity<>(result,status);
    }

    // follower 유저들을 통신하는기능
    @ApiOperation(value = "팔로워 목록을 확인")
    @GetMapping("/followerlist")
    public ResponseEntity<Map<String,List>> followerList(@RequestParam String logInUserId,@RequestParam String profileUserId) throws Exception {
        Map<String,List> resultMap = new HashMap<>();
        List<FollowingDto> followerList = followingService.followerList(logInUserId,profileUserId);
        resultMap.put("followerList",followerList);
        return new ResponseEntity<>(resultMap,HttpStatus.OK);
    }

    // followee 유저들을 통신하는 기능
    @ApiOperation(value = "팔로잉 목록을 확인")
    @GetMapping("/followinglist")
    public ResponseEntity<Map<String,List>> followeeList(@RequestParam String logInUserId,@RequestParam String profileUserId) throws Exception {
        Map<String,List> resultMap = new HashMap<>();
        List<FollowingDto> followingList = followingService.followingList(logInUserId,profileUserId);
        resultMap.put("followingList",followingList);
        return new ResponseEntity<>(resultMap,HttpStatus.OK);
    }
}
