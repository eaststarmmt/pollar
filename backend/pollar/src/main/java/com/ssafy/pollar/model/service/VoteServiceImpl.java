package com.ssafy.pollar.model.service;

import com.ssafy.pollar.domain.entity.*;
import com.ssafy.pollar.model.dto.FollowingDto;
import com.ssafy.pollar.model.dto.ParticipateDto;
import com.ssafy.pollar.model.dto.SelectionDto;
import com.ssafy.pollar.model.dto.VoteDto;
import com.ssafy.pollar.model.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
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
    private final VoteParticipateRepository voteParticipateRepository;


//    @Value("${file.path}")

    private final FollowingService followingService;

    private String uploadFolder;

    @Override
    public void create(VoteDto voteDto, List<MultipartFile> votePhotos) throws Exception {  // 피드 생성

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
        if(vote.getVoteType()) {   // 텍스트 투표 일때
            for (SelectionDto selection : voteDto.getVoteSelects() ) {
                VoteSelect voteSelect = VoteSelect.builder()
                        .voteSelect(vote)
                        .selectionTitle(selection.getSelectionTitle())
                        .content(selection.getContent())
                        .build();
                voteSelectRepository.save(voteSelect);
            }
        } else {    // 이미지 투표일때. 사진 저장까지 하면서 선택지 등록 해야됨
            for(int i = 0; i < 2; i ++) {
                String imageFileName = "vote" + "_" + votePhotos.get(i).getOriginalFilename();
                Path imageFilePath = Paths.get(uploadFolder + imageFileName);
                try {
                    Files.write(imageFilePath, votePhotos.get(i).getBytes());   // votePhotos 리스트에서 이미지 순서대로 저장
                    VoteSelect voteSelect = VoteSelect.builder()
                            .voteSelect(vote)
                            .content(imageFilePath.toString())      // 경로도 되어있기 때문에 toString을 이용하여 string 타입으로 넣어준다
                            .build();
                    voteSelectRepository.save(voteSelect);
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
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
    public List<VoteDto> getVoteList() throws Exception {       //피드 전체 목록 반환
        List<Vote> list = voteRepository.findByOrderByVoteCreateTimeDesc(); //생성시간 내림차순으로 정렬 최신순으로
        List<VoteDto> dtoList = new ArrayList<>();
        for (Vote vote: list) {
            VoteDto dto = new VoteDto(vote);
            dtoList.add(dto);
        }
        return dtoList;
    }

    @Override
    public void insertLike(String userId, Long voteId) throws Exception{    //좋아요 누르기
        User user = userRepository.findByUserId(userId).get();
        Vote vote = voteRepository.findById(voteId).get();
        voteLikeRepository.save( VoteLike.builder().userVoteLike(user).voteLike(vote).build());
    }
    @Override
    public void cancelLike(String userId, Long voteId) throws Exception{    //좋아요 취소
        User user = userRepository.findByUserId(userId).get();
        Vote vote = voteRepository.findById(voteId).get();
        voteLikeRepository.delete(voteLikeRepository.findByUserVoteLikesAndVoteLikesByQuery(user,vote).get());
    }

    @Override
    public int countLike(Long voteId) throws Exception{         //투표의 좋아요 수
        return voteLikeRepository.countLike(voteId);
    }
    @Override
    public List<String> getLikeList(Long voteId)throws Exception{   //투표의 좋아요 id 리스트
        return voteLikeRepository.getLikeListByQuery(voteId);
    }

    @Override
    public List<SelectionDto> getVoteSelectionList(Long voteId) throws Exception {  //투표의 선택지 리스트

        Vote vote = voteRepository.findById(voteId).get();

        List<VoteSelect> entityList = voteSelectRepository.getAllByVoteSelect(vote);

        List<SelectionDto> dtoList = new ArrayList<>();
        for (VoteSelect entity: entityList) {
            SelectionDto dto = new SelectionDto(entity);
            dtoList.add(dto);
        }
        return dtoList;
    }

    @Override
    public void userVoteSelection(String userId, Long selectionId) throws Exception {   //유저가 선택지에 투표
        VoteParticipate voteParticipate = VoteParticipate.builder()
                .userParticipate(userRepository.findByUserId(userId).get())
                .voteParticipate(voteSelectRepository.findById(selectionId).get())
                .build();
        voteParticipateRepository.save(voteParticipate);
    }

    @Override
    public void cancelUserVoteSelection(String userId, Long selectionId) throws Exception { //유저 투표 취소

        voteParticipateRepository.delete(voteParticipateRepository.findByUserParticipateAndVoteParticipate(userRepository.findByUserId(userId).get(),voteSelectRepository.findById(selectionId).get()).get());

    }

    @Override
    public List<ParticipateDto> getVoteUserList(Long voteId) throws Exception { // 투표에서 어떤 유저가 어떤 선택지에 투표했는지 리스트

        List<ParticipateDto> dtoList = new ArrayList<>();

        List<VoteSelect> selectList = voteSelectRepository.getAllByVoteSelect(voteRepository.findById(voteId).get());


        for (VoteSelect select: selectList) {
            List<User> userList = voteParticipateRepository.getUserList(select);
            for (User user :userList) {
                ParticipateDto dto = ParticipateDto.builder()
                        .userId(user.getUserId())
                        .userNickname(user.getUserNickname())
                        .selectionTitle(select.getSelectionTitle())
                        .build();
                dtoList.add(dto);
            }
        }

        return dtoList;
    }

    @Override
    public List<VoteDto> getUserMadeVoteList(String userId) throws Exception {      // 유저가 만든 투표리스트
        List<Vote> entityList = voteRepository.findAllByAuthor(userRepository.findByUserId(userId).get());
        List<VoteDto> dtoList = new ArrayList<>();

        for (Vote entity: entityList) {
            VoteDto dto = new VoteDto(entity);
            dtoList.add(dto);
        }
        return dtoList;
    }

    @Override
    public long getUserMadeVoteCount(String userId) throws Exception {      //유저가 만든 투표 개수
        return voteRepository.countAllByAuthor(userRepository.findByUserId(userId).get());
    }

    @Override
    public List<VoteDto> getUserParticipateVoteList(String userId) throws Exception {   //유저가 참여한 투표 리스트
        List<Vote> entityList = voteRepository.getUserParticipateVoteList(userId);
        List<VoteDto> dtoList = new ArrayList<>();

        for (Vote entity: entityList) {
            VoteDto dto = new VoteDto(entity);
            dtoList.add(dto);
        }
        return dtoList;
    }

    @Override
    public long getUserParticipateVoteCount(String userId) throws Exception {   //유저가 참여한 투표 개수
        List<Vote> entityList = voteRepository.getUserParticipateVoteList(userId);
        return entityList.size();
    }

    @Override
    public List<VoteDto> getUserLikeVoteList(String userId) throws Exception {
        List<Vote> entityList = voteRepository.getUserLikeVoteList(userId);
        List<VoteDto> dtoList = new ArrayList<>();

        for (Vote entity: entityList) {
            VoteDto dto = new VoteDto(entity);
            dtoList.add(dto);
        }
        return dtoList;
    }

    @Override
    public List<VoteDto> getUserInterestVoteList(String userId)throws Exception{    //유저의 관심분야 투표 리스트
        List<Category> categoryList = categoryRepository.getUserCategories(userId);

        List<Vote> entityList = new ArrayList<>();
        for (Category cate : categoryList) {
            List<Vote> temp = voteRepository.getUserInterestVoteList(cate);
            entityList.addAll(temp);
        }
        List<VoteDto> dtoList = new ArrayList<>();
        for (Vote entity: entityList) {
            VoteDto dto = new VoteDto(entity);
            dtoList.add(dto);
        }
        return dtoList;
    }

    @Override
    public List<VoteDto> getUserFollowVoteList(String userId) throws Exception {    //유저가 팔로우한 사람이 만든 투표 리스트

        List<FollowingDto> followingDtoList = followingService.followingList(userId,userId);
        List<Vote> entityList = new ArrayList<>();
        for(FollowingDto followingDto : followingDtoList){
            List<Vote> temp = voteRepository.findAllByAuthor(userRepository.findByUserId(followingDto.getFollowerId()).get());
            entityList.addAll(temp);
        }

        List<VoteDto> dtoList = new ArrayList<>();
        for (Vote entity: entityList) {
            VoteDto dto = new VoteDto(entity);
            dtoList.add(dto);
        }
        return dtoList;
    }

}
