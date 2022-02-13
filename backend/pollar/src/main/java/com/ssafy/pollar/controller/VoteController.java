package com.ssafy.pollar.controller;

import com.ssafy.pollar.domain.entity.Vote;
import com.ssafy.pollar.model.dto.ParticipateDto;
import com.ssafy.pollar.model.dto.SelectionDto;

import com.ssafy.pollar.model.dto.VoteDto;
import com.ssafy.pollar.model.service.NotificationService;
import com.ssafy.pollar.model.service.VoteService;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import io.swagger.models.auth.In;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
//@Tag(name = "VoteController")
@RequestMapping("/vote")
@RequiredArgsConstructor
@CrossOrigin
public class VoteController {

    private final VoteService voteService;
    private final NotificationService notificationService; // 알람 서비스
    private static final String SUCCESS = "success";
    @ApiOperation(value = "피드생성", notes = "피드 정보를 입력한다.")
    @PostMapping("/create")
    public ResponseEntity<Map<String,Object>> createVote(@RequestPart(value = "voteDto") VoteDto voteDto, @RequestPart(value = "votePhotos", required = false) List<MultipartFile> votePhotos) throws Exception {
        Long voteId = voteService.create(voteDto, votePhotos);
        Map<String,Object> resultMap = new HashMap<>();
        resultMap.put("message",SUCCESS);
        resultMap.put("voteId",voteId);
        return new ResponseEntity<>(resultMap, HttpStatus.OK);  // status 200과 success라는 문자열을 반환
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

    @ApiOperation(value = "피드 전체목록")
    @GetMapping
    public ResponseEntity<List<VoteDto>> getVoteList() throws Exception{
        List<VoteDto> list = voteService.getVoteList();
        return new ResponseEntity<>(list,HttpStatus.OK);
    }

    @ApiOperation(value = "좋아요 누르기")
    @PostMapping("/like")
    public ResponseEntity<String> likeVote(@RequestBody @ApiParam(value ="좋아요 누른 유저 id , 피드 id")Map<String,Object> map)throws Exception{
        String userId =(String) map.get("userId");
        int voteId = (int) map.get("voteId");
        voteService.insertLike(userId, (long)voteId);
        // 좋아요 알림
        String receiveId = voteService.detail((long)voteId).getAuthor();
        notificationService.feedLikeNotification((long)voteId,(String)map.get("userId"),receiveId);
        return new ResponseEntity<>(SUCCESS,HttpStatus.OK);
    }

    @ApiOperation(value = "좋아요 취소")
    @DeleteMapping("/like")
    public ResponseEntity<String> cancelLikeVote(@RequestBody @ApiParam(value ="좋아요 누른 유저 id , 피드 id")Map<String,Object> map)throws Exception{
        String userId =(String) map.get("userId");
        int voteId = (int) map.get("voteId");
        voteService.cancelLike(userId, (long)voteId);
        return new ResponseEntity<>(SUCCESS,HttpStatus.OK);
    }

    @ApiOperation(value="좋아요 개수 반환")
    @GetMapping("/{voteId}/vlike")
    public ResponseEntity<Integer> countLike(@PathVariable @ApiParam(value = "피드 id") Long voteId)throws Exception{

        return new ResponseEntity<>(voteService.countLike(voteId),HttpStatus.OK);
    }

    @ApiOperation(value="좋아요 id 리스트 반환")
    @GetMapping("/{voteId}/vlikelist")
    public ResponseEntity<List<String> > getLikeList(@PathVariable @ApiParam(value = "피드 id") Long voteId)throws Exception{

        return new ResponseEntity<>(voteService.getLikeList(voteId),HttpStatus.OK);
    }

    @ApiOperation(value = "해당 투표의 선택지 불러오기")
    @GetMapping("{voteId}/selectionlist")
    public ResponseEntity<List<SelectionDto>> getVoteSelectionList(@PathVariable @ApiParam(value = "투표 아이디") Long voteId) throws Exception{

        return new ResponseEntity<>(voteService.getVoteSelectionList(voteId),HttpStatus.OK);
    }

    @ApiOperation(value = "유저가 선택지에 투표")
    @PostMapping("{userId}/{selectionId}")
    public ResponseEntity<String> userVoteSelection(@PathVariable @ApiParam(value = "유저아이디") String userId, @PathVariable @ApiParam(value = "투표할 선택지 아이디")Long selectionId) throws Exception{
        voteService.userVoteSelection(userId,selectionId);
        return new ResponseEntity<>(SUCCESS,HttpStatus.OK);
    }

    @ApiOperation(value = "유저가 선택지에 투표 취소")
    @DeleteMapping("{userId}/{selectionId}")
    public ResponseEntity<String> cancelUserVoteSelection(@PathVariable @ApiParam(value = "유저아이디") String userId, @PathVariable @ApiParam(value = "투표할 선택지 아이디")Long selectionId) throws Exception{
        voteService.cancelUserVoteSelection(userId,selectionId);
        return new ResponseEntity<>(SUCCESS,HttpStatus.OK);
    }

    @ApiOperation(value = "투표에서 누가 어디에 투표했는지 리스트")
    @GetMapping("{voteId}/vparlist")
    public ResponseEntity<List<ParticipateDto>> getVoteUserList(@PathVariable @ApiParam(value = "투표아이디") Long voteId)throws Exception{
        List<ParticipateDto> list = voteService.getVoteUserList(voteId);
        return new ResponseEntity<>(list,HttpStatus.OK);
    }

    @ApiOperation(value = "투표 참여자 수")
    @GetMapping("{voteId}/vparcount")
    public ResponseEntity<Long> getVoteParticipateCount(@PathVariable @ApiParam(value = "투표아이디") Long voteId)throws Exception{
        long cnt = voteService.getVoteUserList(voteId).size();
        return new ResponseEntity<>(cnt,HttpStatus.OK);
    }

    @ApiOperation(value = "유저가 만든 투표리스트")
    @GetMapping("{userId}/uvotelist")
    public ResponseEntity<List<VoteDto>> getUserMadeVoteList(@PathVariable @ApiParam(value = "유저 아이디") String userId)throws Exception{

        return new ResponseEntity<>(voteService.getUserMadeVoteList(userId),HttpStatus.OK);
    }

    @ApiOperation(value = "유저가 만든 투표 개수")
    @GetMapping("{userId}/uvotecount")
    public ResponseEntity<Long> getUserMadeVoteCount(@PathVariable @ApiParam(value = "유저 아이디") String userId)throws Exception{

        return new ResponseEntity<>(voteService.getUserMadeVoteCount(userId),HttpStatus.OK);
    }

    @ApiOperation(value = "유저가 참여한 투표 리스트")
    @GetMapping("{userId}/uparlist")
    public ResponseEntity<List<VoteDto>> getUserParticipateVoteList(@PathVariable @ApiParam(value = "유저 아이디") String userId)throws Exception{

        return new ResponseEntity<>(voteService.getUserParticipateVoteList(userId),HttpStatus.OK);
    }

    @ApiOperation(value = "유저가 참여한 투표 개수")
    @GetMapping("{userId}/uparcount")
    public ResponseEntity<Long> getUserParticipateVoteCount(@PathVariable @ApiParam(value = "유저 아이디") String userId)throws Exception{

        return new ResponseEntity<>(voteService.getUserParticipateVoteCount(userId),HttpStatus.OK);
    }

    @ApiOperation(value = "유저가 좋아요한 투표 리스트")
    @GetMapping("{userId}/ulikelist")
    public ResponseEntity<List<VoteDto>> getUserLikeVoteList(@PathVariable @ApiParam(value = "유저 아이디") String userId)throws Exception{

        return new ResponseEntity<>(voteService.getUserLikeVoteList(userId),HttpStatus.OK);
    }

    @ApiOperation(value = "유저 관심분야 투표 리스트")
    @GetMapping("{userId}/interlist")
    public ResponseEntity<List<VoteDto>> getUserInterVoteList(@PathVariable @ApiParam(value = "유저 아이디") String userId)throws Exception{

        return new ResponseEntity<>(voteService.getUserInterestVoteList(userId),HttpStatus.OK);
    }

    @ApiOperation(value = "유저 팔로잉 투표 리스트")
    @GetMapping("{userId}/fvotelist")
    public ResponseEntity<List<VoteDto>> getUserFollowVoteList(@PathVariable @ApiParam(value = "유저 아이디") String userId)throws Exception{

        return new ResponseEntity<>(voteService.getUserFollowVoteList(userId),HttpStatus.OK);
    }

    @ApiOperation(value = "인기투표")
    @GetMapping("/trendingvote")
    public ResponseEntity<List<VoteDto>> getTrendingVote()throws Exception{
        return new ResponseEntity<>(voteService.getTrendingVote(),HttpStatus.OK);
    }
}
