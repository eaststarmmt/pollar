package com.ssafy.pollar.controller;

import com.ssafy.pollar.model.dto.CategoryDto;
import com.ssafy.pollar.model.dto.FollowingDto;
import com.ssafy.pollar.model.dto.ProfileDto;
import com.ssafy.pollar.model.dto.UserDto;
import com.ssafy.pollar.model.service.CategoryService;
import com.ssafy.pollar.model.service.FollowingService;
import com.ssafy.pollar.model.service.UserService;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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
    private static final Logger logger = LoggerFactory.getLogger(ProfileController.class);
    private static final String SUCCESS = "success";
    private static final String FAIL = "fail";

    @ApiOperation(value = "유저 프로필 정보")
    @PostMapping("/{usernickname}")
    public ResponseEntity<Map<String,Object>> profileInfo(@RequestBody ProfileDto profileDto){
        Map<String,Object> resultMap = new HashMap<>();
        HttpStatus status = null;
        try {
            UserDto userDto = userService.getUserInfo(profileDto.getProfileUserId());
            List<CategoryDto> interests = categoryService.getUserCategories(profileDto.getProfileUserId());

            resultMap.put("userId",userDto.getUserId());
            resultMap.put("userNickname",userDto.getUserNickname());

            List<FollowingDto> followerIdlist = followingService.followerList(profileDto.getProfileUserId());
            List<FollowingDto> followingIdlist = followingService.followingList(profileDto.getProfileUserId());

            resultMap.put("followerCount",followerIdlist.size());
            resultMap.put("followingCount",followingIdlist.size());
            resultMap.put("interests",interests);

            Boolean isFollow = followingService.isFollow(profileDto.getLoginUserId(),profileDto.getProfileUserId());
            resultMap.put("isFollow",isFollow);
            status = HttpStatus.OK;
        }catch (Exception e){
            status = HttpStatus.INTERNAL_SERVER_ERROR;
        }

        return new ResponseEntity<>(resultMap,status);
    }
}
