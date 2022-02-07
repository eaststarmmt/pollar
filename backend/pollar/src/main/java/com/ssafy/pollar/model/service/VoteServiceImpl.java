package com.ssafy.pollar.model.service;

import com.ssafy.pollar.domain.entity.*;
import com.ssafy.pollar.model.dto.VoteDto;
import com.ssafy.pollar.model.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.time.LocalDateTime;


@Service
@RequiredArgsConstructor
public class VoteServiceImpl implements VoteService {
    // private final을 사용해야 RequiredArgsConstructor 을 통해 초기화 됨
    private final UserRepository userRepository;
    private final CategoryRepository categoryRepository;
    private final VoteRepository voteRepository;
    private final VoteCategoryRepository voteCategoryRepository;
    private final VoteSelectRepository voteSelectRepository;
    private final VoteLikeRepository voteLikeRepository;

    @Override
    public void create(VoteDto voteDto) throws Exception {  // 피드 생성

        //userid로 작성자 User 객체 받아오기
        User author = userRepository.findByUserId(voteDto.getAuthor()).get();

        // 마감시간 없으면 +1일 아니면 그대로
        LocalDateTime expirationTime = voteDto.getVoteExpirationTime();
        if(expirationTime == null){
            expirationTime= LocalDateTime.now().plusDays(1);
        }
        // vote Entity 객체를 생성해서 dto에서 값 받아오기
        Vote vote = Vote.builder()  // vote entity 객체에 vote dto 객체 값 전달
                .voteName(voteDto.getVoteName())
                .voteContent(voteDto.getVoteContent())
                .voteType(voteDto.getVoteType())
                .userAnonymouseType(voteDto.getUserAnonymousType())
                .voteAnonymouseType(voteDto.getVoteAnonymousType())
                .voteExpirationTime(expirationTime)    // 현재시간에서 7일 더함
                .voteCreateTime(LocalDateTime.now())
                .author(author)
                .build();
        voteRepository.save(vote);  // DB에 전달 받은 vote 정보 저장

        // 투표 선택지 등록
        for (String selection : voteDto.getVoteSelects() ) {
            VoteSelect voteSelect = VoteSelect.builder()
                    .voteSelect(vote)
                    .content(selection)
                    .build();
            voteSelectRepository.save(voteSelect);
        }

        //투표 카테고리 등록
        for (Long cate: voteDto.getVoteCategories()) {
            Category category = categoryRepository.findById(cate).get();
            voteCategoryRepository.save(VoteCategory.builder()
                    .category(category)
                    .voteCategory(vote)
                    .build());
        }

    }

    @Override
    public void delete(Long voteId) throws Exception {  // 피드 삭제
        Optional<Vote> vote = voteRepository.findById(voteId);  // 파라미터로 받아온 id를 이용해서 삭제할 vote 가져오기
        voteRepository.delete(vote.get());  // 해당 피드 DB에서 삭제
    }

    @Override
    public VoteDto detail(Long voteId) throws Exception {   // 피드 상세보기
        Optional<Vote> vote = voteRepository.findById(voteId);  // 아이디로 해당 투표 찾기
        return new VoteDto(vote.get());     // 해당 투표를 dto로 변환 후 리턴
    }

    @Override
    public List<VoteDto> getVoteList() throws Exception {
        List<Vote> list = voteRepository.findAll();
        List<VoteDto> dtoList = new ArrayList<>();
        for (Vote vote: list) {
            VoteDto dto = new VoteDto(vote);
            dtoList.add(dto);
        }
        return dtoList;
    }

    @Override
    public void insertLike(String userId, Long voteId) {
        User user = userRepository.findByUserId(userId).get();
        Vote vote = voteRepository.findById(voteId).get();
        voteLikeRepository.save( VoteLike.builder().userVoteLike(user).voteLike(vote).build());
    }
    @Override
    public void cancelLike(String userId, Long voteId) {
        User user = userRepository.findByUserId(userId).get();
        Vote vote = voteRepository.findById(voteId).get();
        voteLikeRepository.delete(voteLikeRepository.findByUserVoteLikesAndVoteLikesByQuery(user,vote).get());
    }

    @Override
    public int countLike(Long voteId) {
        return voteLikeRepository.countLike(voteId);
    }
    @Override
    public List<String> getLikeList(Long voteId){
        return voteLikeRepository.getLikeListByQuery(voteId);
    }

}
