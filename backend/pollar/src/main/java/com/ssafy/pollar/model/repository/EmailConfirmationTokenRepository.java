package com.ssafy.pollar.model.repository;

import com.ssafy.pollar.domain.entity.EmailConfirmationToken;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;
import java.util.Optional;

public interface EmailConfirmationTokenRepository extends JpaRepository<EmailConfirmationToken,String> {
    //Todo 이메일 만료확인
//    Optional<EmailConfirmationToken> findByEmailTokenIdAndExpirationDateAndExpired(String emailTokenId, LocalDateTime now, boolean expired);

}
