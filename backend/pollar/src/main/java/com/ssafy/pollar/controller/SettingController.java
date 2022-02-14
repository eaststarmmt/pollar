package com.ssafy.pollar.controller;

import com.ssafy.pollar.model.dto.CategoryDto;
import com.ssafy.pollar.model.dto.FollowingDto;
import com.ssafy.pollar.model.dto.UserDto;
import com.ssafy.pollar.model.service.*;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/setting")
@RequiredArgsConstructor
@CrossOrigin
public class SettingController {

    private final UserService userService;
    private final FollowingService followingService;
    private final CategoryService categoryService;
    private final ProfileService profileService;
    private final NotificationService notificationService;
    private static final String SUCCESS = "success";
    private static final String FAIL = "fail";

    @ApiOperation(value = "유저 전체 키기")
    @PutMapping("/allon")
    public ResponseEntity<Map<String,Object>> allNotificationOn(@RequestBody UserDto userDto){
        Map<String,Object> resultMap = new HashMap<>();
        HttpStatus status = null;
        try {
            notificationService.allNotificationOn(userDto.getUserId());
            status = HttpStatus.OK;
            resultMap.put("message",SUCCESS);
        }catch (Exception e){
            status = HttpStatus.INTERNAL_SERVER_ERROR;
            resultMap.put("message",FAIL);
        }

        return new ResponseEntity<>(resultMap,status);
    }

    @ApiOperation(value = "유저 전체 끄기")
    @PutMapping("/alloff")
    public ResponseEntity<Map<String,Object>> allNotificationOff(@RequestBody UserDto userDto){
        Map<String,Object> resultMap = new HashMap<>();
        HttpStatus status = null;
        try {
            notificationService.allNotificationOff(userDto.getUserId());
            status = HttpStatus.OK;
            resultMap.put("message",SUCCESS);
        }catch (Exception e){
            status = HttpStatus.INTERNAL_SERVER_ERROR;
            resultMap.put("message",FAIL);
        }

        return new ResponseEntity<>(resultMap,status);
    }

    @ApiOperation(value = "팔로우 알람 키기")
    @PutMapping("/followon")
    public ResponseEntity<Map<String,Object>> followNotificationOn(@RequestBody UserDto userDto){
        Map<String,Object> resultMap = new HashMap<>();
        HttpStatus status = null;
        try {
            notificationService.followNotificationOn(userDto.getUserId());
            status = HttpStatus.OK;
            resultMap.put("message",SUCCESS);
        }catch (Exception e){
            status = HttpStatus.INTERNAL_SERVER_ERROR;
            resultMap.put("message",FAIL);
        }

        return new ResponseEntity<>(resultMap,status);
    }

    @ApiOperation(value = "팔로우 알람 끄기")
    @PutMapping("/followoff")
    public ResponseEntity<Map<String,Object>> followNotificationOff(@RequestBody UserDto userDto){
        Map<String,Object> resultMap = new HashMap<>();
        HttpStatus status = null;
        try {
            notificationService.followNotificationOff(userDto.getUserId());
            status = HttpStatus.OK;
            resultMap.put("message",SUCCESS);
        }catch (Exception e){
            status = HttpStatus.INTERNAL_SERVER_ERROR;
            resultMap.put("message",FAIL);
        }

        return new ResponseEntity<>(resultMap,status);
    }

    @ApiOperation(value = "피드 알람 키기")
    @PutMapping("/feedon")
    public ResponseEntity<Map<String,Object>> feedNotificationOn(@RequestBody UserDto userDto){
        Map<String,Object> resultMap = new HashMap<>();
        HttpStatus status = null;
        try {
            notificationService.feedNotificationOn(userDto.getUserId());
            status = HttpStatus.OK;
            resultMap.put("message",SUCCESS);
        }catch (Exception e){
            status = HttpStatus.INTERNAL_SERVER_ERROR;
            resultMap.put("message",FAIL);
        }

        return new ResponseEntity<>(resultMap,status);
    }

    @ApiOperation(value = "피드 알람 끄기")
    @PutMapping("/feedoff")
    public ResponseEntity<Map<String,Object>> feedNotificationOff(@RequestBody UserDto userDto){
        Map<String,Object> resultMap = new HashMap<>();
        HttpStatus status = null;
        try {
            notificationService.feedNotificationOff(userDto.getUserId());
            status = HttpStatus.OK;
            resultMap.put("message",SUCCESS);
        }catch (Exception e){
            status = HttpStatus.INTERNAL_SERVER_ERROR;
            resultMap.put("message",FAIL);
        }

        return new ResponseEntity<>(resultMap,status);
    }
}
