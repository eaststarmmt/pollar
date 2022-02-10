package com.ssafy.pollar.controller;

import com.ssafy.pollar.model.dto.ReplyDto;
import com.ssafy.pollar.model.service.ReplyService;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/reply")
@RequiredArgsConstructor
@CrossOrigin
public class ReplyController {

    private final ReplyService replyService;
    private static final String SUCCESS = "success";

    @ApiOperation(value = "댓글생성", notes = "댓글 정보를 입력한다.")
    @PostMapping("/create")
    public ResponseEntity<String> createReply(@RequestBody @ApiParam(value = "댓글 정보.", required = true) ReplyDto replyDto) throws Exception {
        replyService.create(replyDto);
        return new ResponseEntity<String>(SUCCESS, HttpStatus.OK);  // status 200과 success라는 문자열을 반환
    }
    @ApiOperation(value = "댓글 목록", notes = "해당 게시글의 모든 댓글 정보를 반환", response = List.class)
    @GetMapping("/{voteId}")
    public ResponseEntity<List<ReplyDto>> getReplies(@PathVariable("voteId") @ApiParam(value = "댓글을 얻기 위한 투표의 아이디", required = true) Long voteId) throws Exception {
        return new ResponseEntity<List<ReplyDto>>(replyService.getReplies(voteId), HttpStatus.OK);
    }
}
