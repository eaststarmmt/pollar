package com.ssafy.pollar.model.dto;

import com.ssafy.pollar.domain.entity.Following;
import com.ssafy.pollar.domain.entity.User;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class FollowingDto{

    private Long followId;
    private User follower;
    private User followee;

    // following Table toDto
    public FollowingDto(Following following) {
        this.follower = following.getFollower();
        this.followee = following.getFollowee();
    }
}
