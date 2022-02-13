package com.ssafy.pollar.domain.entity;

import lombok.*;

import javax.persistence.*;

@RequiredArgsConstructor
@Entity
@Builder
@AllArgsConstructor
@Getter
public class VoteCategory {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "voteCategoryId")
    private long voteCategoryId;

    @ManyToOne
    @JoinColumn(name = "categoryId")
    private Category category;

    @ManyToOne
    @JoinColumn(name = "voteId")
    private Vote voteCategory;
}
