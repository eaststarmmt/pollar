package com.ssafy.pollar.model.service;

import com.ssafy.pollar.domain.entity.*;
import com.ssafy.pollar.model.dto.CategoryDto;
import com.ssafy.pollar.model.dto.SelectionDto;
import com.ssafy.pollar.model.dto.VoteCategoryDto;
import com.ssafy.pollar.model.dto.VoteDto;
import com.ssafy.pollar.model.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ProfileServiceImpl implements ProfileService{

    private final VoteRepository voteRepository;
    private final UserRepository userRepository;
    private final VoteCategoryRepository voteCategoryRepository;
    private final VoteSelectRepository voteSelectRepository;
    private final VoteLikeRepository voteLikeRepository;
    private final ReplyRepository replyRepository;
    private final VoteParticipateRepository voteParticipateRepository;

    @Override
    public List<VoteDto> getProfileUploadVotes(String loggedUserId, String profileUserId) throws Exception { // 내가 업로드한 투표들
        List<VoteDto> voteDtoList = new ArrayList<>();
        User profileUser = userRepository.findByUserId(profileUserId).get();
        User loggedUser = userRepository.findByUserId(loggedUserId).get();
        List<Vote> voteList = voteRepository.findAllByAuthor(profileUser);
        List<VoteCategory> voteCategoryList;
        List<VoteSelect> voteSelectList;

        long voteLikesCount;
        long voteReplyCount;
        long voteParticipateCount;
        Boolean isLiked = false;
        Boolean isVoted = false;
        for(int i = 0 ; i < voteList.size(); i++){
            Vote vote = voteList.get(i);
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

            voteLikesCount = voteLikeRepository.countLike(vote.getVoteId());
            voteReplyCount = replyRepository.countAllByVoteReply(vote);
            voteParticipateCount = 0;
            if(voteLikeRepository.findByUserVoteLikesAndVoteLikesByQuery(loggedUser,vote).isPresent()){ // 로그인 유저가 투표에 참여한경우
                isLiked = true;
            }
            for(int j = 0 ; j < vote.getVoteSelects().size(); j++){
                voteParticipateCount +=voteParticipateRepository.countAllByVoteParticipate(vote.getVoteSelects().get(j));
                if(voteParticipateRepository.findByUserParticipateAndVoteParticipate(loggedUser,vote.getVoteSelects().get(j)).isPresent()){ // 로그인 유저가 투표에 참여한경우
                    isVoted = true;
                    break;
                }
            }
            voteDtoList.add(new VoteDto(
                    vote.getVoteId(),vote.getVoteName(),vote.getAuthor().getUsername(),vote.getVoteContent(),vote.getVoteType(),vote.getVoteCreateTime()
                    ,vote.getVoteExpirationTime(),vote.getUserAnonymouseType(),vote.getVoteAnonymouseType()
                    ,voteCategoryDtoList,selectionDtoList,voteLikesCount,voteReplyCount,profileUser.getUserProfilePhoto()
                    ,voteParticipateCount,isVoted,isLiked
            ));
        }
        return voteDtoList;
    }

    @Override
    public List<VoteDto> getProfileLikeVotes(String loggedUserId, String profileUserId) throws Exception { // 내가 좋아요 누른 투표들
        List<VoteDto> voteDtoList = new ArrayList<>();
        User profileUser = userRepository.findByUserId(profileUserId).get();
        User loggedUser = userRepository.findByUserId(loggedUserId).get();
        List<VoteLike> voteLikeList = voteLikeRepository.findAllByUserVoteLikesByQuery(profileUser).get();
        List<VoteCategory> voteCategoryList;
        List<VoteSelect> voteSelectList;

        long voteParticipateCount;
        Boolean isLiked = false;
        Boolean isVoted = false;
        long voteLikesCount;
        long voteReplyCount;
        for(int i = 0 ; i < voteLikeList.size(); i++){
            Vote vote = voteLikeList.get(i).getVoteLike();
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

            voteLikesCount = voteLikeRepository.countLike(vote.getVoteId());
            voteReplyCount = replyRepository.countAllByVoteReply(vote);

            voteParticipateCount = 0;
            if(voteLikeRepository.findByUserVoteLikesAndVoteLikesByQuery(loggedUser,vote).isPresent()){ // 로그인 유저가 투표에 참여한경우
                isLiked = true;
            }
            for(int j = 0 ; j < vote.getVoteSelects().size(); j++){
                voteParticipateCount +=voteParticipateRepository.countAllByVoteParticipate(vote.getVoteSelects().get(j));
                if(voteParticipateRepository.findByUserParticipateAndVoteParticipate(loggedUser,vote.getVoteSelects().get(j)).isPresent()){ // 로그인 유저가 투표에 참여한경우
                    isVoted = true;
                    break;
                }
            }
            voteDtoList.add(new VoteDto(
                    vote.getVoteId(),vote.getVoteName(),vote.getAuthor().getUsername(),vote.getVoteContent(),vote.getVoteType(),vote.getVoteCreateTime()
                    ,vote.getVoteExpirationTime(),vote.getUserAnonymouseType(),vote.getVoteAnonymouseType()
                    ,voteCategoryDtoList,selectionDtoList,voteLikesCount,voteReplyCount,profileUser.getUserProfilePhoto()
                    ,voteParticipateCount,isVoted,isLiked
            ));
        }
        return voteDtoList;
    }

    @Override
    public List<VoteDto> getProfileParticipateVotes(String loggedUserId, String profileUserId) throws Exception { // 내가 참여한 투표들
        List<VoteDto> voteDtoList = new ArrayList<>();
        User profileUser = userRepository.findByUserId(profileUserId).get();
        User loggedUser = userRepository.findByUserId(loggedUserId).get();
        List<VoteParticipate> voteParticipateList = voteParticipateRepository.findAllByUserParticipate(profileUser).get();
        List<VoteCategory> voteCategoryList;
        List<VoteSelect> voteSelectList;

        long voteParticipateCount;
        Boolean isLiked = false;
        Boolean isVoted = false;
        long voteLikesCount;
        long voteReplyCount;
        for(int i = 0 ; i < voteParticipateList.size(); i++){
            Vote vote = voteParticipateList.get(i).getVoteParticipate().getVoteSelect();
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

            voteLikesCount = voteLikeRepository.countLike(vote.getVoteId());
            voteReplyCount = replyRepository.countAllByVoteReply(vote);

            voteParticipateCount = 0;
            if(voteLikeRepository.findByUserVoteLikesAndVoteLikesByQuery(loggedUser,vote).isPresent()){ // 로그인 유저가 투표에 참여한경우
                isLiked = true;
            }
            for(int j = 0 ; j < vote.getVoteSelects().size(); j++){
                voteParticipateCount +=voteParticipateRepository.countAllByVoteParticipate(vote.getVoteSelects().get(j));
                if(voteParticipateRepository.findByUserParticipateAndVoteParticipate(loggedUser,vote.getVoteSelects().get(j)).isPresent()){ // 로그인 유저가 투표에 참여한경우
                    isVoted = true;
                    break;
                }
            }
            voteDtoList.add(new VoteDto(
                    vote.getVoteId(),vote.getVoteName(),vote.getAuthor().getUsername(),vote.getVoteContent(),vote.getVoteType(),vote.getVoteCreateTime()
                    ,vote.getVoteExpirationTime(),vote.getUserAnonymouseType(),vote.getVoteAnonymouseType()
                    ,voteCategoryDtoList,selectionDtoList,voteLikesCount,voteReplyCount,profileUser.getUserProfilePhoto()
                    ,voteParticipateCount,isVoted,isLiked
            ));
        }
        return voteDtoList;
    }
}
