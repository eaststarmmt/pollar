package com.ssafy.pollar.controller;

import com.ssafy.pollar.model.dto.UserDto;
import com.ssafy.pollar.model.service.UserService;
import com.sun.org.apache.xpath.internal.operations.Bool;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/user")
@RequiredArgsConstructor
@CrossOrigin
public class UserController {

    private final UserService userService;
    private static final Logger logger = LoggerFactory.getLogger(UserController.class);
    private static final String SUCCESS = "success";
    private static final String FAIL = "fail";

    @ApiOperation(value = "회원가입",notes="회원 정보를 입력한다.")
    @PostMapping("/signup")
    public ResponseEntity<String> signup (@RequestBody @ApiParam(value = "회원가입시 필요한 회원정보", required = true) UserDto userDto )throws Exception {
        userService.signup(userDto);
//        if(userService.nicknameCheck((userDto.getUserNickname()))){
//        }else{
//            return new ResponseEntity<String>(FAIL,HttpStatus.INTERNAL_SERVER_ERROR);
//        }
        return new ResponseEntity<String>(SUCCESS, HttpStatus.OK);
    }

    @ApiOperation(value = "아이디중복체크")
    @GetMapping("/idcheck")
    public ResponseEntity<Boolean> idcheck(@RequestParam String userId) throws Exception{
        boolean checkflag = false;
        if(userService.idCheck((userId))){
            checkflag= true;
        }
        return new ResponseEntity<Boolean>(checkflag,HttpStatus.OK);
    }

    @ApiOperation(value = "닉네임중복체크")
    @GetMapping("/nickcheck")
    public ResponseEntity<Boolean> nicknamecheck(@RequestParam String userNickname) throws Exception{
        boolean checkflag = false;
        if(userService.nicknameCheck((userNickname))){
            checkflag= true;
        }
        return new ResponseEntity<Boolean>(checkflag,HttpStatus.OK);
    }

    @PostMapping("/emailcheck")
    public ResponseEntity<Boolean> emailcheck(@RequestParam String userEmail) throws Exception {
        boolean checkflag = false;
        if(userService.emailCheck(userEmail)){

        }

        return new ResponseEntity<Boolean>(checkflag,HttpStatus.OK);

    }
}
