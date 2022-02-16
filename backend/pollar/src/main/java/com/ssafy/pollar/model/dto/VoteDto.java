package com.ssafy.pollar.model.dto;

import com.ssafy.pollar.domain.entity.*;
import com.ssafy.pollar.model.repository.VoteRepository;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ApiModel(value = "VoteDto : 피드정보", description = "피드의 상세 정보를 나타낸다.")
public class VoteDto {

    public VoteDto(Vote vote,long likeCount ,long parCount,long replyCount,String userProfilePhoto,boolean isVoted,boolean isLiked, List<String> voteCategoriesName, List<SelectionDto> voteSelections, long selectionId) {     // vote entity 받아와서 vote dto로 변환. list로 딸려있는 애들은 따로 요청해서 보내야 될거 같음
        this.voteId = vote.getVoteId();
        this.voteName = vote.getVoteName();
        this.author=vote.getAuthor().getUserId();
        this.voteContent = vote.getVoteContent();
        this.voteType = vote.getVoteType();
        this.voteCreateTime = vote.getVoteCreateTime();
        this.voteExpirationTime = vote.getVoteExpirationTime();
        this.userAnonymousType = vote.getUserAnonymouseType();
        this.voteAnonymousType = vote.getVoteAnonymouseType();
        this.voteLikeCount=likeCount;
        this.voteParticipateCount=parCount;
        this.voteReplyCount=replyCount;//
        this.voteCategoriesName=voteCategoriesName;//
        this.voteSelects=voteSelections;//
        this.userProfilePhoto=userProfilePhoto;//
        this.isUserVoted=isVoted;//
        this.isUserLiked=isLiked;//
        this.userVoteSelection=selectionId;//
    }
    
    public VoteDto(Vote vote,long likeCount ,long parCount) {     // vote entity 받아와서 vote dto로 변환. list로 딸려있는 애들은 따로 요청해서 보내야 될거 같음
        this.voteId = vote.getVoteId();
        this.voteName = vote.getVoteName();
        this.author=vote.getAuthor().getUserId();
        this.voteContent = vote.getVoteContent();
        this.voteType = vote.getVoteType();
        this.voteCreateTime = vote.getVoteCreateTime();
        this.voteExpirationTime = vote.getVoteExpirationTime();
        this.userAnonymousType = vote.getUserAnonymouseType();
        this.voteAnonymousType = vote.getVoteAnonymouseType();
        this.voteLikeCount=likeCount;
        this.voteParticipateCount=parCount;
    }

    public VoteDto(long voteId, String voteName,String author,String userProfilePhoto, long voteLikeCount, long voteReplyCount){// 피드 검색용
        this.voteId = voteId;
        this.voteName =voteName;
        this.author = author;
        this.userProfilePhoto = userProfilePhoto;
        this.voteLikeCount = voteLikeCount;
        this.voteReplyCount = voteReplyCount;
    }

    public VoteDto(long voteId, String voteName, String author,String voteContent,Boolean voteType,LocalDateTime voteCreateTime
            ,LocalDateTime voteExpirationTime ,Boolean userAnonymousType,Boolean voteAnonymousType
            ,List<String> voteCategoriesName,List<SelectionDto> voteSelects,long voteLikeCount, long voteReplyCount,String userProfilePhoto
            ,long voteParticipateCount,Boolean isVoted,Boolean isLiked,long userVoteSelection ){
        this.voteId = voteId;
        this.voteName = voteName;
        this.author = author;
        this.voteContent = voteContent;
        this.voteType = voteType;
        this.voteCreateTime = voteCreateTime;
        this.voteExpirationTime = voteExpirationTime;
        this.userAnonymousType = userAnonymousType;
        this.voteAnonymousType = voteAnonymousType;
        this.voteCategoriesName = voteCategoriesName;
        this.voteSelects = voteSelects;
        this.voteLikeCount = voteLikeCount;
        this.voteReplyCount = voteReplyCount;
        this.userProfilePhoto = userProfilePhoto;
        this.voteParticipateCount = voteParticipateCount;
        this.isUserVoted = isVoted;
        this.isUserLiked = isLiked;
        this.userVoteSelection = userVoteSelection;
    }

    @ApiModelProperty(position = 1, value = "피드 아이디", notes="자동으로 생성되므로 작성 보내지 않는다")
    private Long voteId;
    @ApiModelProperty(position = 2, value = "피드 제목")
    private String voteName;
    @ApiModelProperty(position = 3, value = "피드 내용", example = "여자친구가 민초단인데 계속 만나야 될까요?")
    private String voteContent;
    @ApiModelProperty(position = 4, value = "투표 타입, true: 글, false: 사진")
    private Boolean voteType;
    @ApiModelProperty(position = 5, value = "투표 마감 시간.")
    private LocalDateTime voteExpirationTime;
    @ApiModelProperty(position = 6, value = "작성자 익명 여부.")
    private Boolean userAnonymousType;
    @ApiModelProperty(position = 7, value = "투표 익명 여부.")
    private Boolean voteAnonymousType;
    @ApiModelProperty(position = 8, value = "투표 생성 시간.")
    private LocalDateTime voteCreateTime;
    @ApiModelProperty(position = 9, value = "투표에 해당하는 카테고리 리스트.")
    private List<Long> voteCategories;
    @ApiModelProperty(position = 10, value = "투표 선택지 리스트")
    private List<SelectionDto> voteSelects;
    @ApiModelProperty(position = 11, value="투표 참여 유저 id 리스트")
    private List<String> voteParticipates;
    @ApiModelProperty(position = 12, value = "좋아요 누른 유저 id 리스트.")
    private List<String> voteLiked;
    @ApiModelProperty(position = 13, value = "피드에 달린 댓글들 리스트.")
    private List<Long> voteReplys;
    @ApiModelProperty(position = 14, value = "피드를 작성한 유저 id")
    private String author;
    @ApiModelProperty(position = 15, value = "피드를 좋아요수")
    private long voteLikeCount;
    @ApiModelProperty(position = 16, value = "피드를 댓글 수")
    private long voteReplyCount;
    @ApiModelProperty(position = 17, value = "투표 카테고리 이름")
    private List<String> voteCategoriesName;
    @ApiModelProperty(position = 18, value = "작성자 사진")
    private String userProfilePhoto;
    @ApiModelProperty(position = 19, value = "총 투표수")
    private long voteParticipateCount;
    @ApiModelProperty(position = 20, value = "투표 여부")
    private Boolean isUserVoted;
    @ApiModelProperty(position = 21, value = "좋아요 여부")
    private Boolean isUserLiked;
    @ApiModelProperty(position = 22, value = "투표 참여 여부")
    private long userVoteSelection ;

}
