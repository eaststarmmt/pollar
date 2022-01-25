package com.ssafy.pollar.domain.entity;

import javax.persistence.*;

@Entity
public class VoteLike {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "voteLikeId")
    private long voteLikeId;

    @ManyToOne
    @JoinColumn(name = "userId")
    private User userVoteLike;

    @ManyToOne
    @JoinColumn(name = "voteId")
    private Vote voteLike;


}
