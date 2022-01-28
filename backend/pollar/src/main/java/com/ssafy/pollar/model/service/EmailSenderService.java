package com.ssafy.pollar.model.service;

import lombok.RequiredArgsConstructor;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.stereotype.Service;

public interface EmailSenderService {

    void sendEmail(SimpleMailMessage email)throws  Exception;

}
