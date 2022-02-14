package com.ssafy.pollar.model.repository;

import com.ssafy.pollar.domain.entity.User;
import com.ssafy.pollar.domain.entity.UserNotificationState;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserNotificationStateRepository extends JpaRepository<UserNotificationState,Long> {
    Optional<UserNotificationState> findByUserId(User user);
}
