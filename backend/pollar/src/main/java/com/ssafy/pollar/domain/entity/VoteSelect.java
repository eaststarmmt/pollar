package com.ssafy.pollar.domain.entity;

import lombok.*;

import javax.persistence.*;

@Entity
@Getter
@RequiredArgsConstructor
@AllArgsConstructor
@Builder
public class VoteSelect {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "voteSelectId")
    private long voteSelectId;

    @ManyToOne
    @JoinColumn(name = "voteId")
    private Vote voteSelect;

    @Column(name= "selectionTitle")
    private String selectionTitle;

    @Column(name = "selectionContents")
    private String content;

}
