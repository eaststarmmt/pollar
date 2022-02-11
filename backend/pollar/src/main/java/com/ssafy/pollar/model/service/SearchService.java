package com.ssafy.pollar.model.service;

import com.ssafy.pollar.model.dto.UserDto;
import com.ssafy.pollar.model.dto.VoteDto;

import java.util.List;

public interface SearchService {
    List<UserDto> searchUser(String userNickname) throws Exception; // 검색창 유저
    List<UserDto> searchResultUser(String userNickname) throws Exception; // 검색한 결과창 유저
    List<VoteDto> searchFeed(String feedName) throws Exception;
    List<VoteDto> searchCategory(String categoryName) throws Exception;
}
