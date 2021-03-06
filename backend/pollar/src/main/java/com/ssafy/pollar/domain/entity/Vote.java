package com.ssafy.pollar.domain.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Entity
@Getter
@RequiredArgsConstructor
@AllArgsConstructor
@Builder
public class Vote {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // 아이디 auto increment로 자동 저장
    @Column(name = "voteId")
    private long voteId;

    @Column(name = "voteName",length = 255)     // 피드 제목
    private String voteName;

    @Column(name = "voteContent",length = 1000)     // 피드 내용
    private String voteContent;

    @Column(name = "voteType")      // 투표 타입
    private Boolean voteType;

    @Column(name = "voteExpirationTime", columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP")  // 투표 마감 시간. 일단 현재시간을 기본값으로 줌. 그러나 들어가지 않음
    private LocalDateTime voteExpirationTime;

    @Column(name = "userAnonymouseType")    // 투표 작성자 익명성 여부
    private Boolean userAnonymouseType;

    @Column(name = "voteAnonymouseType")    // 투표 참여자 익명성 여부
    private Boolean voteAnonymouseType;

    @CreationTimestamp  // 현재시간 입력
    private LocalDateTime voteCreateTime;

    @OneToMany(mappedBy = "voteCategory",cascade = CascadeType.REMOVE)   // 투표에 포함된 카테고리 리스트
    private List<VoteCategory> voteCategories = new ArrayList<>();

//    @OneToMany(mappedBy = "voteParticipate")    // 투표 참여자 리스트
//    private List<VoteParticipate> voteParticipates = new ArrayList<>();

    @OneToMany(mappedBy = "voteLike",cascade = CascadeType.REMOVE)   // 좋아요 한 사람 리스트
    private List<VoteLike> voteLikes = new ArrayList<>();

    @OneToMany(mappedBy = "voteReply",cascade = CascadeType.REMOVE)  // 댓글 리스트
    private List<Reply> voteReplys = new ArrayList<>();

    @OneToMany(mappedBy = "voteSelect",cascade = CascadeType.REMOVE) // 선택된 항목 리스트
    private List<VoteSelect> voteSelects =new ArrayList<>();

//    @OneToMany(mappedBy = "voteselectId")
//    private List<voteSelect> voteSelects = new ArrayList<>();

    @ManyToOne
    @JoinColumn(name = "userId")
    private User author;

}
