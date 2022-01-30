package com.ssafy.pollar.domain.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Following {
    @Id
    @GeneratedValue
    @Column(name = "followId")
    private long followId;

    @ManyToOne
    @JoinColumn(name = "follower")
    private User follower;

    @ManyToOne
    @JoinColumn(name = "followee")
    private User followee;

//        1 : N
//    user -> followerId
//        1 : M
//    user -> followeeId

//    @ManyToOne
//    @JoinColumn(name = "userId")
//    private User followee;

//    @ManyToOne
//    @JoinColumn(name = "userId")
//    private User follower;

}
