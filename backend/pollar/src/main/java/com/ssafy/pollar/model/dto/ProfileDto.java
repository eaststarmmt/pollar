package com.ssafy.pollar.model.dto;

import io.swagger.annotations.ApiModel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@ApiModel(value = "ProfileDto : 프로필")
public class ProfileDto {
    private String loginUserId;
    private String profileUserId;
}
