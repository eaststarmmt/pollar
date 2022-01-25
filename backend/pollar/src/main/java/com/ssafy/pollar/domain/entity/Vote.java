package com.ssafy.pollar.domain.entity;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Entity
public class Vote {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "voteId")
    private long voteId;

    @Column(name = "voteName",length = 255)
    private String voteName;

    @Column(name = "voteContent",length = 1000)
    private String voteContent;

    @Column(name = "voteType")
    private boolean voteType;

    @Column(name = "voteExpirationTime")
    private Date voteExpirationTime;

    @Column(name = "userAnonymouseType")
    private boolean userAnonymouseType;

    @Column(name = "voteAnonymouseType")
    private boolean voteAnonymouseType;

    @Column(name = "voteCreateTime")
    private LocalDateTime voteCreateTime;

    @OneToMany(mappedBy = "voteCategory")
    private List<VoteCategory> voteCategories = new ArrayList<>();

    @OneToMany(mappedBy = "voteParticipate")
    private List<VoteParticipate> VoteParticipates = new ArrayList<>();

    @OneToMany(mappedBy = "voteLike")
    private List<VoteLike> VoteLikes = new ArrayList<>();

    @OneToMany(mappedBy = "voteReply")
    private List<Reply> voteReplys = new ArrayList<>();

    @OneToMany(mappedBy = "voteSelect")
    private List<VoteSelect> VoteSelects =new ArrayList<>();

//    @OneToMany(mappedBy = "voteselectId")
//    private List<voteSelect> voteSelects = new ArrayList<>();

    @ManyToOne
    @JoinColumn(name = "userId")
    private User author;

}
