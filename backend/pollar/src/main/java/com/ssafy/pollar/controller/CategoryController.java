package com.ssafy.pollar.controller;

import com.ssafy.pollar.model.dto.CategoryDto;
import com.ssafy.pollar.model.dto.UserCategoryDto;
import com.ssafy.pollar.model.service.CategoryService;
//import com.sun.org.apache.regexp.internal.RE;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/category")
@RequiredArgsConstructor
public class CategoryController {

    private final CategoryService categoryService;

    private static final Logger logger = LoggerFactory.getLogger(UserController.class);
    private static final String SUCCESS = "success";
    private static final String FAIL = "fail";

    @ApiOperation(value="모든 카테고리리스트")
    @GetMapping
    public ResponseEntity<List<CategoryDto> > getAllCategories () throws Exception{
        logger.info("getcates");
        List<CategoryDto> list = categoryService.getAllCategories();
        return new ResponseEntity<List<CategoryDto> >(list, HttpStatus.OK);
    }

    @ApiOperation(value = "유저가 선택한 카테고리 목록 반환")
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<CategoryDto> > getUserCategories(@PathVariable("userId") @ApiParam(value = "리스트 받아올 유저 아이디") String userId ) throws Exception{
        logger.info("유저카테고리");
        List<CategoryDto> list = categoryService.getUserCategories(userId);
        return new ResponseEntity<List<CategoryDto> >(list,HttpStatus.OK);
    }

//    @ApiOperation(value = "유저가 선택한 카테고리 목록 모두 삭제")
//    @DeleteMapping("/user/{userId}")
//    public ResponseEntity<String> deleteUserCategories(@PathVariable("userId") @ApiParam(value = "카테고리 삭제할 유저아이디") String userId)throws Exception{
//        logger.info("유저 카테고리 삭제");
//        return new ResponseEntity<String> (SUCCESS,HttpStatus.OK);
//    }

    @ApiOperation(value="유저가 선택한 카테고리 목록 등록")
    @PostMapping("/user")
    public ResponseEntity<String> insertUserCategories(@RequestBody @ApiParam(value = "선택한 카테고리목록 등록")UserCategoryDto userCategoryDto)throws Exception{
        logger.info("유저 카테고리 삭제 후 입력");
        categoryService.deleteUserCategories(userCategoryDto.getUserId());
        for (Long cateId : userCategoryDto.getCategoryList()) {
            categoryService.insertUserCategory(userCategoryDto.getUserId(),cateId);
        }

        return new ResponseEntity<String> (SUCCESS,HttpStatus.OK);
    }

    @ApiOperation(value ="투표에 설정한 카테고리 id 리스트 반환")
    @GetMapping("/vote/{voteId}")
    public ResponseEntity<List<CategoryDto> > getVoteCategories(@PathVariable("voteId") @ApiParam(value="투표아이디") long voteId) throws Exception{
        logger.info("투표 카테고리목록");
        return new ResponseEntity<List<CategoryDto>> (categoryService.getVoteCategories(voteId),HttpStatus.OK);

    }



}
