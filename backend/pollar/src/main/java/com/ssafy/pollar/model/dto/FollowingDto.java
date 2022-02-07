package com.ssafy.pollar.model.dto;

import com.ssafy.pollar.domain.entity.Following;
import com.ssafy.pollar.domain.entity.User;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Getter
@NoArgsConstructor
@ApiModel(value = "FollowingDto : 팔로우정보", description = "팔로우의 현 상황을 나타낸다.")
public class FollowingDto{

    @ApiModelProperty(value = "나를 팔로우하는 유저 아이디")
    private String followerId;
    @ApiModelProperty(value = "내가 팔로우하는 유저 아이디")
    private String followingId;
    private String followerNickname;
    private String followingNickname;
    private Boolean isFollow;

    public FollowingDto(String followerId,String followingId,String followerNickname,String followingNickname,Boolean isFollow){
        this.followerId = followerId;
        this.followingId = followingId;
        this.followerNickname = followerNickname;
        this.followingNickname = followingNickname;
        this.isFollow = isFollow;
    }
}
