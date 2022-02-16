package com.ssafy.pollar.model.dto;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@ApiModel(value = "NotificationDto : 알람정보")
public class NotificationDto {

    @ApiModelProperty(value = "알람 아이디")
    private long notificationId;
    @ApiModelProperty(value = "알람을 보내는 아이디")
    private String sendId;
    @ApiModelProperty(value = "알람을 받는 아이디")
    private String receiveId;
    @ApiModelProperty(value = "알람생성 시각")
    private LocalDateTime notificationCreateTime;
    @ApiModelProperty(value = "알람 타입")
    private int notificationType;
    @ApiModelProperty(value = "투표 아이디")
    private long voteId;
    @ApiModelProperty(value = "알람 읽음 여부")
    private Boolean notificationRead;
    @ApiModelProperty(value = "알람 내용")
    private String notificationContents;
    @ApiModelProperty(value = "알람 아이디 리스트")
    private List<Long> notificationIdList;
    @ApiModelProperty(value = "피드 이름")
    private String voteName;
    @ApiModelProperty(value = "유저 사진")
    private String userProfilePhoto;

    public NotificationDto(long notificationId, String sendId, String receiveId,LocalDateTime notificationCreateTime
            ,long voteId,Boolean notificationRead, String notificationContents, int notificationType
            ,String voteName,String userProfilePhoto){
        this.notificationContents = notificationContents;
        this.notificationId = notificationId;
        this.sendId = sendId;
        this.receiveId = receiveId;
        this.notificationCreateTime = notificationCreateTime;
        this.voteId = voteId;
        this.notificationRead = notificationRead;
        this.notificationType = notificationType;
        this.voteName = voteName;
        this.userProfilePhoto = userProfilePhoto;
    }

}
