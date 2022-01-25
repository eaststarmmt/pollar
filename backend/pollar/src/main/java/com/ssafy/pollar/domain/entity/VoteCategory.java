package com.ssafy.pollar.domain.entity;

import javax.persistence.*;

@Entity
public class VoteCategory {
    @Id
    @GeneratedValue
    @Column(name = "voteCategoryId")
    private long voteCategoryId;

    @ManyToOne
    @JoinColumn(name = "categoryId")
    private Category category;

    @ManyToOne
    @JoinColumn(name = "voteId")
    private Vote voteCategory;
}
