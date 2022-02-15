package com.ssafy.pollar.model.service;

import com.ssafy.pollar.domain.entity.User;
import com.ssafy.pollar.domain.entity.Vote;
import com.ssafy.pollar.domain.entity.VoteCategory;
import com.ssafy.pollar.domain.entity.VoteSelect;
import com.ssafy.pollar.model.dto.SelectionDto;
import com.ssafy.pollar.model.dto.UserDto;
import com.ssafy.pollar.model.dto.VoteDto;
import com.ssafy.pollar.model.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class SearchServiceImpl implements SearchService{

    private final UserRepository userRepository;
    private final VoteRepository voteRepository;
    private final VoteCategoryRepository voteCategoryRepository;
    private final CategoryRepository categoryRepository;
    private final VoteLikeRepository voteLikeRepository;
    private final ReplyRepository replyRepository;
    private final FollowingRepository followingRepository;
    private final VoteSelectRepository voteSelectRepository;
    private final VoteParticipateRepository voteParticipateRepository;

    @Override
    public List<UserDto> searchUser(String userNickname) throws Exception { // 검색창에 나오는 유저 정보
        List<UserDto> userDtoList = new ArrayList<>();

        List<User> userList = userRepository.findAll();
        String userId;
        String searchUserNickname;
        String userProfile;
        if(userNickname.trim().length()==0){
            return userDtoList;
        }
        long userListLen = userList.size();
        if(userList.size()>5){
            userListLen = 5;
        }
        for(int i = 0 ; i < userListLen; i++){
            userId = userList.get(i).getUserId();
            searchUserNickname = userList.get(i).getUserNickname();
            userProfile = userList.get(i).getUserProfilePhoto();
            if(searchUserNickname.contains(userNickname)){
                userDtoList.add(new UserDto(userId,searchUserNickname,userProfile));
            }
        }

        return userDtoList;
    }

    @Override
    public List<UserDto> searchResultUser(String logInUserId,String userNickname) throws Exception { // 검색 결과에 나오는 유저정보
        User user = userRepository.findByUserId(logInUserId).get();
        List<UserDto> userDtoList = new ArrayList<>();

        List<User> userList = userRepository.findAll();
        String userId;
        String searchUserNickname;
        String userProfile;
        long followerCount;
        long followingCount;
        long participateVoteCount;
        long createVoteCount;
        boolean isFollow = false;
        if(userNickname.trim().length()==0){
            return userDtoList;
        }
        long userListLen = userList.size();
        if(userList.size()>5){
            userListLen = 5;
        }
        for(int i = 0 ; i < userListLen; i++){
            userId = userList.get(i).getUserId();
            searchUserNickname = userList.get(i).getUserNickname();
            userProfile = userList.get(i).getUserProfilePhoto();
            User nowUser = userRepository.findByUserNickname(searchUserNickname).get();
            followingCount = followingRepository.countAllByFollowee(nowUser);
            followerCount = followingRepository.countAllByFollower(nowUser);
            participateVoteCount = voteParticipateRepository.countAllByUserParticipate(nowUser);
            createVoteCount = voteRepository.findAllByAuthor(userRepository.findByUserNickname(searchUserNickname).get()).size();
            if(followingRepository.findByFollowerAndAndFollowee(nowUser,user).isPresent()){
                isFollow = true;
            }
            if(searchUserNickname.contains(userNickname)){
                userDtoList.add(new UserDto(userId,searchUserNickname,userProfile,followingCount,followerCount,participateVoteCount,createVoteCount,isFollow));
            }
        }

        return userDtoList;
    }

    @Override
    public List<VoteDto> searchFeed(String feedName) throws Exception {// 검색창에 나오는 피드 정보
        List<VoteDto> voteDtoList = new ArrayList<>();

        List<Vote> voteList = voteRepository.findAll();
        long feedId;
        String searchFeedName;
        String feedAuthorName;
        long feedLikeCount;
        long feedReplyCount;
        String userPhoto;
        for(int i = 0 ; i < voteList.size(); i++){
            Vote vote = voteList.get(i);
            feedId = vote.getVoteId();
            searchFeedName = vote.getVoteName();
            feedAuthorName = vote.getAuthor().getUserNickname();
            feedLikeCount = voteLikeRepository.countLike(vote.getVoteId());
            feedReplyCount = replyRepository.countAllByVoteReply(vote);
            userPhoto = vote.getAuthor().getUserProfilePhoto();
            if(searchFeedName.contains(feedName)){
                voteDtoList.add(new VoteDto(feedId,searchFeedName,feedAuthorName,userPhoto,feedLikeCount,feedReplyCount));
            }
        }

        return voteDtoList;
    }

    @Override
    public List<VoteDto> searchResultFeed(String userId, String feedName) throws Exception { // 검색 결과에 나오는 피드 정보
        User user = userRepository.findByUserId(userId).get();
        List<VoteDto> voteDtoList = new ArrayList<>();
        List<Vote> voteList = voteRepository.findAll();
        Vote vote = null;
        long feedId;
        String searchFeedName;
        String feedAuthorName;
        String feedContent;
        long feedLikeCount;
        long feedReplyCount;
        long voteParticipateCount;
        long userVoteSelection;
        boolean isLiked = false;
        boolean isVoted = false;
        List<VoteCategory> voteCategoryList;
        List<VoteSelect> voteSelectList;

        for(int i = 0 ; i < voteList.size() ; i++){
            vote = voteList.get(i);
            voteCategoryList = voteCategoryRepository.findAllByVoteCategory(vote).get();
            List<String> voteCategoryDtoList = new ArrayList<>();
            for(int j = 0 ; j < voteCategoryList.size(); j++){
                voteCategoryDtoList.add(voteCategoryList.get(j).getCategory().getCategoryNameSmall());
            }
            voteSelectList = voteSelectRepository.getAllByVoteSelect(vote);
            List<SelectionDto> selectionDtoList = new ArrayList<>();
            for(int j = 0 ; j < voteSelectList.size(); j++){
                selectionDtoList.add(new SelectionDto(voteSelectList.get(j)));
            }
            feedId = vote.getVoteId();
            searchFeedName = vote.getVoteName();
            feedAuthorName = vote.getAuthor().getUserNickname();
            feedContent = vote.getVoteContent();
            feedLikeCount = voteLikeRepository.countLike(feedId);
            feedReplyCount = replyRepository.countAllByVoteReply(vote);
            isLiked = false;
            isVoted = false;
            voteParticipateCount = 0;
            userVoteSelection = 0;
            if(voteLikeRepository.findByUserVoteLikesAndVoteLikesByQuery(user,vote).isPresent()){
                isLiked = true;
            }
            for(int j = 0 ; j < vote.getVoteSelects().size(); j++){
                voteParticipateCount +=voteParticipateRepository.countAllByVoteParticipate(vote.getVoteSelects().get(j));
                if(voteParticipateRepository.findByUserParticipateAndVoteParticipate(user,vote.getVoteSelects().get(j)).isPresent()){ // 로그인 유저가 투표에 참여한경우
                    isVoted = true;
                    break;
                }
                if(voteParticipateRepository.findByUserParticipateAndVoteParticipate(user,vote.getVoteSelects().get(j)).isPresent()){ // 로그인 유저가 투표에 참여한경우
                    userVoteSelection = vote.getVoteSelects().get(j).getVoteSelectId();
                }
            }
            voteDtoList.add(new VoteDto(feedId,searchFeedName,feedAuthorName,feedContent,vote.getVoteType(),vote.getVoteCreateTime()
                    ,vote.getVoteExpirationTime(),vote.getUserAnonymouseType(),vote.getVoteAnonymouseType(),voteCategoryDtoList
                    ,selectionDtoList,feedLikeCount,feedReplyCount,user.getUserProfilePhoto()
                    ,voteParticipateCount,isVoted,isLiked,userVoteSelection));
        }
        return voteDtoList;
    }

    @Override
    public List<VoteDto> searchCategory(String categoryName) throws Exception { // 카테고리 기준 피드 정보
        List<VoteDto> voteDtoList = new ArrayList<>();
        List<VoteCategory> voteCategoryList = voteCategoryRepository.findAllByCategory(categoryRepository.findByCategoryNameSmall(categoryName).get()).get();
        Vote vote = null;
        long feedId;
        String searchFeedName;
        String feedAuthorName;
        String feedContent;
        long feedLikeCount;
        long feedReplyCount;

        for(int i = 0 ; i < voteCategoryList.size() ; i++){
           vote = voteRepository.findById(voteCategoryList.get(i).getVoteCategory().getVoteId()).get();
           feedId = vote.getVoteId();
           searchFeedName = vote.getVoteName();
           feedAuthorName = vote.getAuthor().getUserNickname();
           feedContent = vote.getVoteContent();
           feedLikeCount = voteLikeRepository.countLike(feedId);
           feedReplyCount = replyRepository.countAllByVoteReply(vote);
           voteDtoList.add(new VoteDto(feedId,searchFeedName,feedAuthorName,feedContent,feedLikeCount,feedReplyCount));
        }
        return voteDtoList;
    }

    @Override
    public List<UserDto> searchAllUser(String logInUserId) throws Exception { // 모든 유저 검색
        List<UserDto> userDtoList = new ArrayList<>();
        User user = userRepository.findByUserId(logInUserId).get();
        List<User> userList = userRepository.findAll();
        String userId;
        String searchUserNickname;
        String userProfile;
        long followingCount;
        long followerCount;
        long participateVoteCount;
        long createVoteCount;
        boolean isFollow = false;
        for(int i = 0 ; i < userList.size(); i++){
            userId = userList.get(i).getUserId();
            searchUserNickname = userList.get(i).getUserNickname();
            userProfile = userList.get(i).getUserProfilePhoto();
            User nowUser = userRepository.findByUserId(userId).get();
            followingCount = followingRepository.countAllByFollowee(nowUser);
            followerCount = followingRepository.countAllByFollower(nowUser);
            participateVoteCount = voteParticipateRepository.countAllByUserParticipate(nowUser);
            createVoteCount = voteRepository.findAllByAuthor(userRepository.findByUserId(userId).get()).size();
            if(followingRepository.findByFollowerAndAndFollowee(nowUser,user).isPresent()){
                isFollow = true;
            }
            userDtoList.add(new UserDto(userId,searchUserNickname,userProfile,followingCount,followerCount,participateVoteCount,createVoteCount,isFollow));
        }

        return userDtoList;
    }
}
