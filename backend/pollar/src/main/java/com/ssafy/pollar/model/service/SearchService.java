package com.ssafy.pollar.model.service;

import com.ssafy.pollar.model.dto.UserDto;
import com.ssafy.pollar.model.dto.VoteDto;
import com.ssafy.pollar.model.dto.feedSearchDto;

import java.util.List;

public interface SearchService {
    List<UserDto> searchUser(String userNickname) throws Exception; // 검색창 유저
    List<UserDto> searchResultUser(String logInUserId, String userNickname) throws Exception; // 검색한 결과창 유저
    List<feedSearchDto> searchFeed(String feedName) throws Exception;
    List<VoteDto> searchResultFeed(String userId,String feedName) throws Exception;
    List<VoteDto> searchCategory(String categoryName) throws Exception;
    List<UserDto> searchAllUser(String logInUserId) throws Exception;
}
