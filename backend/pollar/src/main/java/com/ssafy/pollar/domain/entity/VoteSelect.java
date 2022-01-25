package com.ssafy.pollar.domain.entity;

import javax.persistence.*;

@Entity
public class VoteSelect {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "voteSelectId")
    private long voteSelectId;

    @ManyToOne
    @JoinColumn(name = "voteId")
    private Vote voteSelect;

}
