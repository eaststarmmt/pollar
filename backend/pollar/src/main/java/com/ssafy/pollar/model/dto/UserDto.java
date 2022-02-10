package com.ssafy.pollar.model.dto;

import com.ssafy.pollar.domain.entity.Category;
import com.ssafy.pollar.domain.entity.User;
import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.List;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class UserDto {

    private String uid;
    private String userId;
    private String password;
    private String userNickname;
    private String userEmail;
    private Date userBirthday;
    private Boolean userGender;
    private String userProfilePhoto;
    @ApiModelProperty(value = "유저가 선택한 카테고리 id목록", notes="id를 이용해서 Category 테이블에서 검색")
    private List<Long> categories;
    @ApiModelProperty(value = "유저를 팔로잉한 id목록", notes="id를 이용해서 User 테이블에서 검색")
    private List<String> follower;
    @ApiModelProperty(value = "유저가 팔로우한 id목록", notes="id를 이용해서 User 테이블에서 검색")
    private List<String> followee;
    @ApiModelProperty(value = "유저가 생성한 vote id목록", notes="id를 이용해서 Vote 테이블에서 검색")
    private List<Long> createVotes;
    @ApiModelProperty(value = "유저가 투표한 vote id목록", notes="id를 이용해서 Vote 테이블에서 검색")
    private List<Long> votedVotes;
    @ApiModelProperty(value = "유저가 좋아요한 vote id목록", notes="id를 이용해서 Vote 테이블에서 검색")
    private List<Long> likedVotes;
    @ApiModelProperty(value = "유저가 작성한 reply id목록", notes="id를 이용해서 Reply 테이블에서 검색")
    private List<Long> replies;

    public UserDto(User user){
        this.userId = user.getUserId();
        this.userNickname = user.getUserNickname();
        this.userProfilePhoto = user.getUserProfilePhoto();
        this.userEmail = user.getUserEmail();
        this.userBirthday = user.getUserBirthday();
        this.userGender = user.getUserGender();
        this.userProfilePhoto = user.getUserProfilePhoto();
    }
}
