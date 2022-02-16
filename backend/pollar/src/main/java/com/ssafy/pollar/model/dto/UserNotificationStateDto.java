package com.ssafy.pollar.model.dto;

import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class UserNotificationStateDto {
    @ApiModelProperty(value = "전체 알람 on/off")
    private Boolean allNotificationState;
    @ApiModelProperty(value = "팔로우 알람 on/off")
    private Boolean followNotificationState;
    @ApiModelProperty(value = "피드 알람 on/off")
    private Boolean feedNotificationState;
}
