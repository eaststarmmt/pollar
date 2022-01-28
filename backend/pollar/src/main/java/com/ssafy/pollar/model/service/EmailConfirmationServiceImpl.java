package com.ssafy.pollar.model.service;

import com.ssafy.pollar.domain.entity.EmailConfirmationToken;
import com.ssafy.pollar.model.repository.EmailConfirmationTokenRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class EmailConfirmationServiceImpl implements EmailConfirmationService {
    private final EmailConfirmationTokenRepository emailConfirmationTokenRepository;
    private final EmailSenderService emailSenderService;
    private  static final long EMAIL_TOKEN_EXPIRATION_TIME = 5L; //5분

    // 이메일 인증을 위해 이메일 생성 메서드
    @Override
    public String createEmailConfirmationToken(String userEmail) throws Exception {
        EmailConfirmationToken emailConfirmationToken = EmailConfirmationToken.builder()
                .userEmail(userEmail)
                .expirationDate(LocalDateTime.now().plusMinutes(EMAIL_TOKEN_EXPIRATION_TIME))
                .exprired(false)
                .build();
        emailConfirmationTokenRepository.save(emailConfirmationToken);
        SimpleMailMessage mailMessage = new SimpleMailMessage();
        mailMessage.setTo(userEmail);
        mailMessage.setSubject("Pollar 회원가입 이메일 인증");
        mailMessage.setText("http://localhost:8080/confirm-email?token=" + emailConfirmationToken.getEmailTokenId());
        emailSenderService.sendEmail(mailMessage);

        return emailConfirmationToken.getEmailTokenId();
    }

}
