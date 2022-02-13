package com.ssafy.pollar.domain.entity;

import lombok.*;

import javax.persistence.*;

@Entity
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class VoteLike {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "voteLikeId")
    private long voteLikeId;

    @ManyToOne
    @JoinColumn(name = "uid")
    private User userVoteLike;

    @ManyToOne
    @JoinColumn(name = "voteId")
    private Vote voteLike;


}
