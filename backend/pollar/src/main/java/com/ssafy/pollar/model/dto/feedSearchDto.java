package com.ssafy.pollar.model.dto;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@ApiModel(value = "feedSearchDto : 피드 검색 정보")
public class feedSearchDto {
    @ApiModelProperty(position = 1, value = "피드 아이디", notes="자동으로 생성되므로 작성 보내지 않는다")
    private Long voteId;
    @ApiModelProperty(position = 2, value = "피드 제목")
    private String voteName;
    @ApiModelProperty(position = 3, value = "투표 타입, true: 글, false: 사진")
    private Boolean voteType;
    @ApiModelProperty(position = 4, value = "투표 선택지 리스트")
    private List<SelectionDto> voteSelects;
    @ApiModelProperty(position = 5, value = "피드를 작성한 유저 id")
    private String author;
    @ApiModelProperty(position = 6, value = "피드를 좋아요수")
    private long voteLikeCount;
    @ApiModelProperty(position = 7, value = "피드를 댓글 수")
    private long voteReplyCount;
    @ApiModelProperty(position = 8, value = "투표 카테고리 이름")
    private List<String> voteCategoriesName;
    @ApiModelProperty(position = 9, value = "작성자 사진")
    private String userProfilePhoto;
    @ApiModelProperty(position = 10, value = "총 투표수")
    private long voteParticipateCount;
    public feedSearchDto(long voteId, String voteName, String author, Boolean voteType, List<String> voteCategoriesName
            , List<SelectionDto> voteSelects, long voteLikeCount, long voteReplyCount, String userProfilePhoto, long voteParticipateCount ){
        this.voteId = voteId;
        this.voteName = voteName;
        this.author = author;
        this.voteType = voteType;
        this.voteCategoriesName = voteCategoriesName;
        this.voteSelects = voteSelects;
        this.voteLikeCount = voteLikeCount;
        this.voteReplyCount = voteReplyCount;
        this.userProfilePhoto = userProfilePhoto;
        this.voteParticipateCount = voteParticipateCount;
    }
}
