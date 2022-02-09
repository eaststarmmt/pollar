package com.ssafy.pollar.model.service;

import com.ssafy.pollar.domain.entity.Notification;
import com.ssafy.pollar.model.dto.NotificationDto;

import java.util.List;

public interface NotificationService {
    void feedCreateNotification(String sendId,long voteId) throws Exception;
    void feedFinishNotification(NotificationDto notificationDto) throws Exception;
    void feedLikeNotification(long voteId, String sendId, String receiveId) throws Exception;
    void feedReplyNotification(NotificationDto notificationDto) throws Exception;
    void followNotification(String sendId,String receiveId) throws Exception;
    void notificationRead(long notificationId) throws Exception;
    List<NotificationDto> notificationList(String userId) throws Exception;
}
