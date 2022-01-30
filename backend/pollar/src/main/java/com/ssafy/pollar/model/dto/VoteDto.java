package com.ssafy.pollar.model.dto;

import com.ssafy.pollar.domain.entity.Reply;
import com.ssafy.pollar.domain.entity.VoteCategory;
import com.ssafy.pollar.domain.entity.VoteLike;
import com.ssafy.pollar.domain.entity.VoteSelect;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@ApiModel(value = "VoteDto : 피드정보", description = "피드의 상세 정보를 나타낸다.")
public class VoteDto {
    @ApiModelProperty(position = 1, value = "피드 아이디", notes="자동으로 생성되므로 작성 보내지 않는다")
    private Long voteId;
    @ApiModelProperty(position = 2, value = "피드 작성자 이름")
    private String voteName;
    @ApiModelProperty(position = 3, value = "피드 내용", example = "여자친구가 민초단인데 계속 만나야 될까요?")
    private String voteContent;
    @ApiModelProperty(position = 4, value = "투표 타입")
    private Boolean voteType;
    @ApiModelProperty(position = 5, value = "투표 마감 시간.")
    private Date voteExpirationTime;
    @ApiModelProperty(position = 6, value = "작성자 익명 여부.")
    private Boolean userAnonymouseType;
    @ApiModelProperty(position = 7, value = "투표 익명 여부.")
    private Boolean voteAnonymouseType;
    @ApiModelProperty(position = 8, value = "투표 생성 시간.")
    private LocalDateTime voteCreateTime;
    @ApiModelProperty(position = 9, value = "투표에 해당하는 카테고리 리스트.")
    private List<VoteCategory> voteCategories;
    @ApiModelProperty(position = 10, value = "좋아요 받은 투표.")
    private List<VoteLike> iked;
    @ApiModelProperty(position = 11, value = "피드에 달린 댓글들.")
    private List<Reply> voteReplys;
    @ApiModelProperty(position = 12, value = "참여한 투표.")
    private List<VoteSelect> VoteSelects;

}
