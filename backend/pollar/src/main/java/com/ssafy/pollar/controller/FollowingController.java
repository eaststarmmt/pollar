package com.ssafy.pollar.controller;

import com.ssafy.pollar.domain.entity.Following;
import com.ssafy.pollar.jwt.service.JwtUserDetailsService;
import com.ssafy.pollar.model.dto.FollowingDto;
import com.ssafy.pollar.model.service.FollowingService;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/follow")
@CrossOrigin
public class FollowingController {

    private final JwtUserDetailsService jwtUserDetailsService;
    private final FollowingService followingService;
    private static final String SUCCESS = "success";
    private static final String FAIL = "fail";

    // User follow 요청 통신
    @PostMapping("/following")
    public ResponseEntity<String> followsend(@RequestBody FollowingDto followingDto){
        String result = "";
        HttpStatus status = null;
        try {
            String followeeUser = followingDto.getFolloweeId();
            String followerUser = followingDto.getFollowerId();
            followingService.followsend(followeeUser,followerUser);
            result = SUCCESS;
            status = HttpStatus.ACCEPTED;
        }catch (Exception e){
            result = FAIL;
            status = HttpStatus.INTERNAL_SERVER_ERROR;
        }
        return new ResponseEntity<>(result,status);
    }

    // User unfollow 요청 통신 아직 비활성
    @PostMapping("/unfollow")
    public ResponseEntity<String> unfollow(@RequestBody FollowingDto followingDto){
        String result = "";
        HttpStatus status = null;
        try {
            String followeeUser = followingDto.getFolloweeId();
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
    @GetMapping("/followerlist")
    public ResponseEntity<List<?>> followerlist(@RequestParam String userId) throws Exception {
        List<FollowingDto> followerlist= null;
        followerlist = followingService.followerlist(userId);
        return new ResponseEntity<>(followerlist,HttpStatus.OK);
    }

    // followee 유저들을 통신하는 기능
    @GetMapping("/followeelist")
    public ResponseEntity<List<?>> followeelist(@RequestParam String userId) throws Exception {
        List<FollowingDto> followeelist= null;
        followeelist = followingService.followeelist(userId);
        return new ResponseEntity<>(followeelist,HttpStatus.OK);
    }
}
