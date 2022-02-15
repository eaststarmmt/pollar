package com.ssafy.pollar.domain.entity;

import com.ssafy.pollar.model.dto.CategoryDto;
import lombok.Getter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
public class Category {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "categoryId")
    private long categoryId;

    @OneToMany(mappedBy = "category")
    private List<UserCategory> UserCategories = new ArrayList<>();

    @OneToMany(mappedBy = "category")
    private List<VoteCategory> voteCategories = new ArrayList<>();

    @Column(name = "categoryNameBig" ,length = 20)
    private String categoryNameBig;

    @Column(name = "categoryNameSmall" ,length = 20)
    private String categoryNameSmall;

}
