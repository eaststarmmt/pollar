package com.ssafy.pollar.domain.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.hibernate.annotations.GenericGenerator;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Entity
@Getter
@RequiredArgsConstructor
@AllArgsConstructor
@Builder
public class User implements UserDetails {
    @Id
    @GeneratedValue(generator = "uuid2")
    @GenericGenerator(name = "uuid2" , strategy = "uuid2")
    @Column(length = 36)
    private String uid;

    @Column(length = 16 , name = "userId", unique = true)
    private String userId;

    @Column(name = "password")
    private String password;

    @Column(length = 16 , name = "userNickname")
    private String userNickname;

    @Column(length = 45 , name = "userEmail")
    private String userEmail;

    @Column(name = "userBirthday")
    private Date userBirthday;

    @Column(name = "userGender")
    private Boolean userGender;

    @Column(name = "userProfilePhoto" ,length = 1000)
    private String userProfilePhoto;

    @OneToOne(mappedBy = "userId" ,cascade = CascadeType.REMOVE)
    private UserNotificationState userNotificationState;

    @OneToMany(mappedBy = "userCategory",cascade = CascadeType.REMOVE)
    private List<UserCategory> UserCategories = new ArrayList<>();

    @OneToMany(mappedBy = "userParticipate",cascade = CascadeType.REMOVE)
    private List<VoteParticipate> userParticipates = new ArrayList<>();

    @OneToMany(mappedBy = "userVoteLike",cascade = CascadeType.REMOVE)
    private  List<VoteLike> userVoteLikes = new ArrayList<>();

    @OneToMany(mappedBy = "replyUser",cascade = CascadeType.REMOVE)
    private List<Reply> userReplys = new ArrayList<>();

    @OneToMany(mappedBy = "author",cascade = CascadeType.REMOVE)
    private List<Vote> voteCreates = new ArrayList<>();

    // user안에 update메소드를 만들어서 request를 param으로 바꿔서
    // setter => update
    public void passwordUpdate(String password){// builder와 사용 목적이 같다.
        this.password = password;
    }

    public void nickNameUpdate(String userNickname) {
        this.userNickname = userNickname;
    }
    // Jwt 토큰을 위해 UserDetails

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return null;
    }

    @Override
    public String getUsername() {
        return userId;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
