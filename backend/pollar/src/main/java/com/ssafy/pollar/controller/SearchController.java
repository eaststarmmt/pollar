package com.ssafy.pollar.controller;

import com.ssafy.pollar.model.dto.UserDto;
import com.ssafy.pollar.model.dto.VoteDto;
import com.ssafy.pollar.model.dto.feedSearchDto;
import com.ssafy.pollar.model.service.SearchService;
import com.ssafy.pollar.model.service.UserService;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/search")
@RequiredArgsConstructor
public class SearchController {
    private final SearchService searchService;
    private static final String SUCCESS = "success";
    private static final String FAIL = "fail";

    @ApiOperation(value = "검색바에 나오는 유저들")
    @GetMapping("/usernickname")
    public ResponseEntity<Map<String,Object>> userSearch(@RequestParam @ApiParam(value = "검색 닉네임 userNickname", required = true) String userNickname){
        HashMap<String,Object> resultMap = new HashMap<>();
        HttpStatus status = null;
        try {
            List<UserDto> userList = searchService.searchUser(userNickname);
            resultMap.put("searchUserList",userList);
            resultMap.put("message",SUCCESS);
            status = HttpStatus.OK;
        }catch (Exception e){
            resultMap.put("message",FAIL);
            status = HttpStatus.INTERNAL_SERVER_ERROR;
        }
        return new ResponseEntity<>(resultMap,status);
    }

    @ApiOperation(value = "검색한 결과로 나오는 유저들")
    @GetMapping("/userlist")
    public ResponseEntity<Map<String,Object>> userSearchList(@RequestParam @ApiParam(value = "로그인 아이디 userId", required = true) String userId, @RequestParam @ApiParam(value = "검색 닉네임 userNickname", required = true) String userNickname){
        HashMap<String,Object> resultMap = new HashMap<>();
        HttpStatus status = null;
        try {
            List<UserDto> userList = searchService.searchResultUser(userId,userNickname);
            resultMap.put("searchUserList",userList);
            resultMap.put("message",SUCCESS);
            status = HttpStatus.OK;
        }catch (Exception e){
            resultMap.put("message",FAIL);
            status = HttpStatus.INTERNAL_SERVER_ERROR;
        }
        return new ResponseEntity<>(resultMap,status);
    }

    @ApiOperation(value = "검색바에 나오는 피드 정보")
    @GetMapping("/feedname")
    public ResponseEntity<Map<String,Object>> feedSearch(@RequestParam @ApiParam(value = "피드 제목 feedName", required = true) String feedName){
        HashMap<String,Object> resultMap = new HashMap<>();
        HttpStatus status = null;
        try {
            List<feedSearchDto> voteList = searchService.searchFeed(feedName);
            resultMap.put("feedList",voteList);
            resultMap.put("message",SUCCESS);
            status = HttpStatus.OK;
        }catch (Exception e){
            resultMap.put("message",FAIL);
            status = HttpStatus.INTERNAL_SERVER_ERROR;
        }
        return new ResponseEntity<>(resultMap,status);
    }

    @ApiOperation(value = "유저 전체 리스트")
    @GetMapping("/alluserlist")
    public ResponseEntity<Map<String ,Object>> allUserListSearch(@RequestParam @ApiParam(value = "로그인 userId", required = true) String userId){
        HashMap<String,Object> resultMap = new HashMap<>();
        HttpStatus status = null;
        try {
            List<UserDto> userDtoList = searchService.searchAllUser(userId);
            resultMap.put("allUserList",userDtoList);
            resultMap.put("message",SUCCESS);
            status = HttpStatus.OK;
        }catch (Exception e){
            resultMap.put("message",FAIL);
            status = HttpStatus.INTERNAL_SERVER_ERROR;
        }
        return new ResponseEntity<>(resultMap,status);
    }
}
