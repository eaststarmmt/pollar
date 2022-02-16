package com.ssafy.pollar.model.service;

import com.ssafy.pollar.domain.entity.Notification;
import com.ssafy.pollar.domain.entity.UserNotificationState;
import com.ssafy.pollar.model.dto.NotificationDto;
import com.ssafy.pollar.model.dto.UserNotificationStateDto;

import java.util.List;

public interface NotificationService {
    UserNotificationStateDto getUserNotification(String userId) throws Exception;
    void feedLikeNotification(long voteId, String sendId, String receiveId) throws Exception;
    void feedReplyNotification(long voteId, String sendId, String receiveId) throws Exception;
    void followNotification(String sendId,String receiveId) throws Exception;
    void notificationRead(long notificationId) throws Exception;
    List<NotificationDto> notificationList(String userId) throws Exception;
    void allNotificationOn(String userId) throws Exception;
    void allNotificationOff(String userId) throws Exception;
    void followNotificationOn(String userId) throws Exception;
    void followNotificationOff(String userId) throws Exception;
    void feedNotificationOn(String userId) throws Exception;
    void feedNotificationOff(String userId) throws Exception;
}
