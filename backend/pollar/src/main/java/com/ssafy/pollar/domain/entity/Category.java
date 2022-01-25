package com.ssafy.pollar.domain.entity;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
public class Category {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "categoryId")
    private long categoryId;

    @OneToMany(mappedBy = "userCategory")
    private List<UserCategory> UserCategories = new ArrayList<>();

    @OneToMany(mappedBy = "voteCategory")
    private List<VoteCategory> voteCategories = new ArrayList<>();

    @Column(name = "categoryName" ,length = 20)
    private String categoryName;
}
