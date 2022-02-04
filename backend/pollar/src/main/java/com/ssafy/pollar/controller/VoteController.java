package com.ssafy.pollar.controller;

import com.ssafy.pollar.model.dto.VoteDto;
import com.ssafy.pollar.model.service.VoteService;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
//@Tag(name = "VoteController")
@RequestMapping("/vote")
@RequiredArgsConstructor
@CrossOrigin
public class VoteController {

    private final VoteService voteService;
    private static final String SUCCESS = "success";
    @ApiOperation(value = "피드생성", notes = "피드 정보를 입력한다.")
    @PostMapping("/create")
    public ResponseEntity<String> createVote(@RequestBody @ApiParam(value = "피드 작성시 필요한 피드정보", required = true) VoteDto voteDto)throws Exception {
        voteService.create(voteDto);
        return new ResponseEntity<String>(SUCCESS, HttpStatus.OK);  // status 200과 success라는 문자열을 반환
    }

    @ApiOperation(value = "피드 삭제", notes = "해당 피드를 삭제한다.")
    @DeleteMapping("/{voteId}")
    public ResponseEntity<String> deleteVote(@PathVariable @ApiParam(value = "피드의 id", required = true) Long voteId) throws Exception {
        voteService.delete(voteId);
        return new ResponseEntity<String>(SUCCESS, HttpStatus.OK);
    }

    @ApiOperation(value = "피드 상세 페이지", notes = "해당 피드 상세정보를 불러온다.")
    @GetMapping("/{voteId}")
    public ResponseEntity<VoteDto> detailVote(@PathVariable @ApiParam(value = "피드의 id", required = true) Long voteId) throws Exception {
        return new ResponseEntity<VoteDto>(voteService.detail(voteId), HttpStatus.OK);
    }
}
