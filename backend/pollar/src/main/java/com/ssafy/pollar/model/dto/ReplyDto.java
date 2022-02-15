package com.ssafy.pollar.model.dto;

import com.ssafy.pollar.domain.entity.Reply;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ApiModel(value = "ReplyDto : 댓글정보", description = "댓글의 상세 정보를 나타낸다.")
public class ReplyDto {

    @ApiModelProperty(value = "댓글 아이디", notes="자동으로 생성되므로 작성 보내지 않는다")
    private Long replyId;
    @ApiModelProperty(value = "댓글을 작성한 유저 id")
    private String replyUser;
    @ApiModelProperty(value = "댓글 작성 유저 닉네임")
    private String replyUserNickname;
    @ApiModelProperty(value = "댓글 작성 유저 프로필")
    private String replyUserProfile;
    @ApiModelProperty(value = "댓글이 작성된 피드의 id")
    private Long voteReply;
    @ApiModelProperty(value = "댓글의 내용")
    private String replyContent;
    @ApiModelProperty(value = "댓글의 생성 시간")
    private LocalDateTime replyCreateTime;
    @ApiModelProperty(value = "대댓글 여부 확인용")
    private long replyDepth;

    public ReplyDto(Reply reply) {
        this.replyId = reply.getReplyId();
        this.replyUser = reply.getReplyUser().getUserId();
        this.replyUserNickname = reply.getReplyUser().getUserNickname();
        this.replyUserProfile = reply.getReplyUser().getUserProfilePhoto();
        this.voteReply = reply.getVoteReply().getVoteId();
        this.replyContent = reply.getReplyContent();
        this.replyCreateTime = reply.getReplyCreateTime();
    }
}
