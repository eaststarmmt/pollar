package com.ssafy.pollar.model.service;

import com.ssafy.pollar.model.dto.UserDto;

public interface UserService {

    void signup(UserDto userDto) throws Exception;
    boolean idCheck(String userId) throws Exception;
    boolean nicknameCheck(String userNickname) throws Exception;
    boolean emailCheck(String userEmail) throws Exception;
    void modifyUserInfo(UserDto userDto) throws Exception;
    void deleteUserInfo(String userId) throws Exception;
    boolean login(UserDto userDto) throws Exception;

}
