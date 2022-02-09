package com.ssafy.pollar.model.repository;

import com.ssafy.pollar.domain.entity.Notification;
import com.ssafy.pollar.domain.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface NotificationRepository extends JpaRepository<Notification,Long> {
    Optional<List<Notification>> findAllByReceiveUserId(User user);
}
