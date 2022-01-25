package com.ssafy.pollar.domain.entity;

import lombok.*;

import javax.persistence.*;

@Entity
@Builder
@RequiredArgsConstructor
@AllArgsConstructor
@Getter
public class UserCategory {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "userCategoryId")
    private long userCategoryId;

    @ManyToOne
    @JoinColumn(name = "userId")
    private User userCategory;

    @ManyToOne
    @JoinColumn(name = "Category")
    private Category category;



}
