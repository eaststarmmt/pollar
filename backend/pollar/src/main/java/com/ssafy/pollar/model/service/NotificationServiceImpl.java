package com.ssafy.pollar.model.service;

import com.ssafy.pollar.domain.entity.Notification;
import com.ssafy.pollar.domain.entity.User;
import com.ssafy.pollar.domain.entity.UserNotificationState;
import com.ssafy.pollar.model.dto.FollowingDto;
import com.ssafy.pollar.model.dto.NotificationDto;
import com.ssafy.pollar.model.dto.ParticipateDto;
import com.ssafy.pollar.model.dto.VoteDto;
import com.ssafy.pollar.model.repository.NotificationRepository;
import com.ssafy.pollar.model.repository.UserNotificationStateRepository;
import com.ssafy.pollar.model.repository.UserRepository;
import com.ssafy.pollar.model.repository.VoteRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
@RequiredArgsConstructor
public class NotificationServiceImpl implements NotificationService{

    private final FollowingService followingService;
    private final VoteService voteService;
    private final NotificationRepository notificationRepository;
    private final UserRepository userRepository;
    private final VoteRepository voteRepository;
    private final UserNotificationStateRepository userNotificationStateRepository;

    @Override
    public void feedCreateNotification(String sendId,long voteId) throws Exception { // voteId, sendId
        List<FollowingDto> followingDtoList = followingService.followerList(sendId, sendId);
        Notification notification = null;
        for(int i = 0 ; i < followingDtoList.size() ; i++){
            notification = Notification.builder()
                    .notificationType(0)
                    .notificationContents("")
                    .notificationRead(false)
                    .sendUserId(userRepository.findByUserId(sendId).get())
                    .receiveUserId(userRepository.findByUserId(followingDtoList.get(i).getFollowingId()).get())
                    .voteId(voteRepository.getById(voteId))
                    .build();
            notificationRepository.save(notification);
        }
    }

    @Override
    public void feedFinishNotification(long voteId) throws Exception{
        List<ParticipateDto> userList = voteService.getVoteUserList(voteId);
        String sendId = voteService.detail(voteId).getAuthor();
        Notification notification = null;
        for(int i = 0 ; i < userList.size() ; i++){
            String comment = voteService.detail(voteId).getVoteName() + "가 종료되었습니다.";
            notification = Notification.builder()
                    .notificationType(1)
                    .notificationContents(comment)
                    .notificationRead(false)
                    .sendUserId(userRepository.findByUserId(sendId).get())
                    .receiveUserId(userRepository.findByUserId(userList.get(i).getUserId()).get())
                    .voteId(voteRepository.getById(voteId))
                    .build();
        }
    }

    @Override
    public void feedLikeNotification(long voteId, String sendId, String receiveId) throws Exception {
        // voteId, sendId: 좋아요 누른사람, receiveId: 투표 생성자
        String sendNick = userRepository.findByUserId(sendId).get().getUserNickname();
        String voteName = voteService.detail(voteId).getVoteName();
        String comment = "\\'"+sendNick +"\\'"+ "가 "+ voteName + "에 좋아요를 누르셨습니다.";
        UserNotificationState userNotificationState = userNotificationStateRepository.findByUserId(userRepository.findByUserId(receiveId).get()).get();
        if(!userNotificationState.getFeedNotificationState()){
            return;
        }
        Notification notification = Notification.builder()
                .notificationType(2)
                .notificationContents(comment)
                .notificationCreateTime(LocalDateTime.now())
                .notificationRead(false)
                .sendUserId(userRepository.findByUserId(sendId).get())
                .receiveUserId(userRepository.findByUserId(receiveId).get())
                .voteId(voteRepository.findById(voteId).get())
                .build();
        notificationRepository.save(notification);
    }

    @Override
    public void feedReplyNotification(long voteId, String sendId, String receiveId) throws Exception {
        // 댓글기능 추가 후 구현
    }

    @Override
    public void followNotification(String sendId,String receiveId) throws Exception{
        String sendNick = userRepository.findByUserId(sendId).get().getUserNickname();
        String receiveNick = userRepository.findByUserId(receiveId).get().getUserNickname();
        String comment = "\\'"+ sendNick +"\\'"+ "가 팔로우 요청 하였습니다.";
        UserNotificationState userNotificationState = userNotificationStateRepository.findByUserId(userRepository.findByUserId(receiveId).get()).get();
        if(!userNotificationState.getFollowNotificationState()){
            return;
        }
        Notification notification = Notification.builder()
                .notificationType(4)
                .notificationContents(comment)
                .notificationCreateTime(LocalDateTime.now())
                .notificationRead(false)
                .sendUserId(userRepository.findByUserId(sendId).get())
                .receiveUserId(userRepository.findByUserId(receiveId).get())
                .build();
        notificationRepository.save(notification);
    }

    @Transactional
    @Override
    public void notificationRead(long notificationId) throws Exception {
        Notification notification = notificationRepository.findById(notificationId).get();
        notification.notificationReadUpdate(true);
        notificationRepository.save(notification);
    }

    @Override
    public List<NotificationDto> notificationList(String userId) throws Exception {
        List<Notification> notifications = notificationRepository.findAllByReceiveUserId(userRepository.findByUserId(userId).get()).get();

        List<NotificationDto> notificationDtoList = new ArrayList<>();
        for(int i = 0 ; i < notifications.size() ; i++){
            String sendId = notifications.get(i).getSendUserId().getUserId();
            String receiveId = notifications.get(i).getReceiveUserId().getUserId();
            String notificationContents = notifications.get(i).getNotificationContents();
            long notificationId = notifications.get(i).getNotificationId();
            LocalDateTime notificationCreateTime = notifications.get(i).getNotificationCreateTime();
            long voteId;
            if(notifications.get(i).getVoteId()!=null){
                voteId = notifications.get(i).getVoteId().getVoteId();
            }else{
                voteId = 0;
            }
            Boolean notificationRead = notifications.get(i).getNotificationRead();
            int notificationType = notifications.get(i).getNotificationType();

            notificationDtoList.add(new NotificationDto(notificationId,sendId,receiveId,notificationCreateTime
                    ,voteId,notificationRead,notificationContents,notificationType));
        }
        return notificationDtoList;
    }

    @Override
    public void allNotificationOn(String userId) throws Exception {
        User user = userRepository.findByUserId(userId).get();
        UserNotificationState userNotificationState = userNotificationStateRepository.findByUserId(user).get();
        userNotificationState.allNotificationUpdate(true);
        userNotificationState.followNotificationUpdate(true);
        userNotificationState.feedNotificationUpdate(true);
        userNotificationStateRepository.save(userNotificationState);
    }

    @Override
    public void allNotificationOff(String userId) throws Exception {
        User user = userRepository.findByUserId(userId).get();
        UserNotificationState userNotificationState = userNotificationStateRepository.findByUserId(user).get();
        userNotificationState.allNotificationUpdate(false);
        userNotificationState.followNotificationUpdate(false);
        userNotificationState.feedNotificationUpdate(false);
        userNotificationStateRepository.save(userNotificationState);
    }

    @Override
    public void followNotificationOn(String userId) throws Exception {
        User user = userRepository.findByUserId(userId).get();
        UserNotificationState userNotificationState = userNotificationStateRepository.findByUserId(user).get();
        userNotificationState.followNotificationUpdate(true);
        userNotificationStateRepository.save(userNotificationState);
    }

    @Override
    public void followNotificationOff(String userId) throws Exception {
        User user = userRepository.findByUserId(userId).get();
        UserNotificationState userNotificationState = userNotificationStateRepository.findByUserId(user).get();
        userNotificationState.allNotificationUpdate(false);
        userNotificationState.followNotificationUpdate(false);
        userNotificationStateRepository.save(userNotificationState);
    }

    @Override
    public void feedNotificationOn(String userId) throws Exception {
        User user = userRepository.findByUserId(userId).get();
        UserNotificationState userNotificationState = userNotificationStateRepository.findByUserId(user).get();
        userNotificationState.feedNotificationUpdate(true);
        userNotificationStateRepository.save(userNotificationState);
    }

    @Override
    public void feedNotificationOff(String userId) throws Exception {
        User user = userRepository.findByUserId(userId).get();
        UserNotificationState userNotificationState = userNotificationStateRepository.findByUserId(user).get();
        userNotificationState.allNotificationUpdate(false);
        userNotificationState.feedNotificationUpdate(false);
        userNotificationStateRepository.save(userNotificationState);
    }
}
