package com.ssafy.pollar.domain.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;

@Entity
@Getter
@RequiredArgsConstructor
@AllArgsConstructor
@Builder
@DynamicUpdate
public class UserNotificationState {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "userNotificationStateId")
    private long userNotificationStateId;

    @OneToOne
    @JoinColumn(name = "userId")
    private User userId;

    @Column(name = "allNotificationState")
    private Boolean allNotificationState;

    @Column(name = "followNotificationState")
    private Boolean followNotificationState;

    @Column(name = "feedNotificationState")
    private Boolean feedNotificationState;

}
