package com.ssafy.pollar.model.service;

import com.ssafy.pollar.domain.entity.User;
import com.ssafy.pollar.domain.entity.Vote;
import com.ssafy.pollar.domain.entity.VoteCategory;
import com.ssafy.pollar.domain.entity.VoteSelect;
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
    public List<UserDto> searchUser(String userNickname) throws Exception {
        List<UserDto> userDtoList = new ArrayList<>();

        List<User> userList = userRepository.findAll();
        String userId;
        String searchUserNickname;
        String userProfile;
        for(int i = 0 ; i < userList.size(); i++){
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
    public List<UserDto> searchResultUser(String userNickname) throws Exception {
        List<UserDto> userDtoList = new ArrayList<>();

        List<User> userList = userRepository.findAll();
        String userId;
        String searchUserNickname;
        String userProfile;
        long followerCount;
        long participateVoteCount;
        long createVoteCount;
        for(int i = 0 ; i < userList.size(); i++){
            userId = userList.get(i).getUserId();
            searchUserNickname = userList.get(i).getUserNickname();
            userProfile = userList.get(i).getUserProfilePhoto();
            User nowUser = userRepository.findByUserNickname(searchUserNickname).get();
            followerCount = followingRepository.findAllByFollower(nowUser).get().size();
            participateVoteCount = voteParticipateRepository.countAllByUserParticipate(nowUser);
            createVoteCount = voteRepository.findAllByAuthor(userRepository.findByUserNickname(searchUserNickname).get()).size();
            if(searchUserNickname.contains(userNickname)){
                userDtoList.add(new UserDto(userId,searchUserNickname,userProfile,followerCount,participateVoteCount,createVoteCount));
            }
        }

        return userDtoList;
    }

    @Override
    public List<VoteDto> searchFeed(String feedName) throws Exception {
        List<VoteDto> voteDtoList = new ArrayList<>();

        List<Vote> voteList = voteRepository.findAll();
        long feedId;
        String searchFeedName;
        for(int i = 0 ; i < voteList.size(); i++){
            feedId = voteList.get(i).getVoteId();
            searchFeedName = voteList.get(i).getVoteName();
            if(searchFeedName.contains(feedName)){
                voteDtoList.add(new VoteDto(feedId,searchFeedName));
            }
        }

        return voteDtoList;
    }

    @Override
    public List<VoteDto> searchCategory(String categoryName) throws Exception {
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
}
