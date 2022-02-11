package com.ssafy.pollar.domain.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.RequiredArgsConstructor;

import javax.persistence.*;

@Entity
@Builder
@RequiredArgsConstructor
@AllArgsConstructor
public class VoteParticipate {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "voteParticipateId")
    private long voteParticipateId;

    @ManyToOne
    @JoinColumn(name = "userId")
    private User userParticipate;

    @ManyToOne
    @JoinColumn(name = "voteSelectId")
    private VoteSelect voteParticipate;
}
