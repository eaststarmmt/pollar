package com.ssafy.pollar.model.dto;

import com.ssafy.pollar.domain.entity.Reply;
import com.ssafy.pollar.domain.entity.VoteCategory;
import com.ssafy.pollar.domain.entity.VoteLike;
import com.ssafy.pollar.domain.entity.VoteSelect;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class VoteDto {
    public VoteDto(String voteName) {
        this.voteName = voteName;
    }

//    public VoteDto(String voteName, String voteContent, Boolean voteType, Boolean userAnonymouseType, Boolean voteAnonymouseType) {
//        this.voteName = voteName;
//        this.voteContent = voteContent;
//        this.voteType = voteType;
//        this.userAnonymouseType = userAnonymouseType;
//        this.voteAnonymouseType = voteAnonymouseType;
//    }

    private long voteId;
    private String voteName;
    private String voteContent;
    private Boolean voteType;
    private Date voteExpirationTime;
    private Boolean userAnonymouseType;
    private Boolean voteAnonymouseType;
    private LocalDateTime voteCreateTime;
    private List<VoteCategory> voteCategories;
    private List<VoteLike> iked;
    private List<Reply> voteReplys;
    private List<VoteSelect> VoteSelects;
}
