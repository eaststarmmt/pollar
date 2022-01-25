package com.ssafy.pollar.domain.entity;

import javax.persistence.*;

@Entity
public class VoteParticipate {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "voteParticipateId")
    private long voteParticipateId;

    @ManyToOne
    @JoinColumn(name = "userId")
    private User userPariticipate;

    @ManyToOne
    @JoinColumn(name = "voteId")
    private Vote voteParticipate;
}
