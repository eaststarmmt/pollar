package com.ssafy.pollar.domain.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter
@RequiredArgsConstructor
@AllArgsConstructor
@Builder
public class Reply {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "replyId")
    private long replyId;

    @ManyToOne
    @JoinColumn(name = "userId")
    private User replyUser;

    @ManyToOne
    @JoinColumn(name = "voteId")
    private Vote voteReply;

    @Column(name = "replyContent", length = 1000)
    private String replyContent;

    @Column(name = "replyCreateTime")
    private LocalDateTime replyCreateTime;

    @Column(name = "replyDepth")
    private long replyDepth;


}
