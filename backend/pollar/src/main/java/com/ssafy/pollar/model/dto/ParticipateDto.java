package com.ssafy.pollar.model.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@Builder
@RequiredArgsConstructor
@AllArgsConstructor
public class ParticipateDto {
    private String userId;
    private String selectionTitle;
    private String userNickname;
}
