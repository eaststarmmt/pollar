package com.ssafy.pollar.domain.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.DynamicUpdate;
import org.springframework.data.annotation.CreatedDate;

import javax.persistence.*;
import java.sql.Clob;
import java.time.LocalDateTime;

@Entity
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Notification {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "notificationId")
    private long notificationId;

    @CreatedDate
    @Column(name = "notificationCreateTime")
    private LocalDateTime notificationCreateTime;

    @Column(name = "notificationType")
    private int notificationType;

    @Column(name = "notificationContents")
    private String notificationContents;

    @Column(name = "notificationRead")
    private Boolean notificationRead;

    @ManyToOne
    @JoinColumn(name = "sendUserId")
    private User sendUserId;

    @ManyToOne
    @JoinColumn(name = "receiveUserId")
    private User receiveUserId;

    @ManyToOne
    @JoinColumn(name = "voteId")
    private Vote voteId;

    public void notificationReadUpdate(boolean notificationRead){
        this.notificationRead = notificationRead;
    }
}
