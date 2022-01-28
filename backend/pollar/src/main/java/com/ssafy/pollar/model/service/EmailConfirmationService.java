package com.ssafy.pollar.model.service;

public interface EmailConfirmationService {

    String createEmailConfirmationToken(String userEmail)throws Exception;

}
