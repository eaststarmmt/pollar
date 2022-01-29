package com.ssafy.pollar.model.dto;

import com.ssafy.pollar.domain.entity.Reply;
import com.ssafy.pollar.domain.entity.VoteCategory;
import com.ssafy.pollar.domain.entity.VoteLike;
import com.ssafy.pollar.domain.entity.VoteSelect;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;

@Getter
@NoArgsConstructor
@AllArgsConstructor
//@ApiModel(value = "VoteDto : 피드정보", description = "피드의 상세 정보를 나타낸다.")
public class VoteDto {
    @Schema(description = "피드 아이디. 자동으로 생성되므로 작성 보내지 않는다")
    private Long voteId;
    @Schema(description = "피드 작성자 이름.", example = "홍길동")
    private String voteName;
    @Schema(description = "피드 내용.", example = "여자친구가 민초단인데 계속 만나야 될까요?")
    private String voteContent;
    @Schema(description = "투표 타입. 익명성 여부 판단.", example = "false")
    private Boolean voteType;
    @Schema(description = "투표 마감 시간.")
    private Date voteExpirationTime;
    @Schema(description = "작성자 익명 여부.")
    private Boolean userAnonymouseType;
    @Schema(description = "투표 익명 여부.")
    private Boolean voteAnonymouseType;
    @Schema(description = "투표 생성 시간.")
    private LocalDateTime voteCreateTime;
    @Schema(description = "투표에 해당하는 카테고리 리스트.")
    private List<VoteCategory> voteCategories;
    @Schema(description = "좋아요 받은 투표.")
    private List<VoteLike> iked;
    @Schema(description = "피드에 달린 댓글들.")
    private List<Reply> voteReplys;
    @Schema(description = "참여한 투표.")
    private List<VoteSelect> VoteSelects;
}
