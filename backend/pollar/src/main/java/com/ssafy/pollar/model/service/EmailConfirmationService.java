package com.ssafy.pollar.model.service;

public interface EmailConfirmationService {

    String createEmailConfirmationToken(String userEmail)throws Exception;
    boolean isValidToken(String token) throws Exception;
    boolean isValidEmail(String token,String userEmail) throws Exception;
}
