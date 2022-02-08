package com.ssafy.pollar.model.dto;

import com.ssafy.pollar.domain.entity.VoteSelect;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@Builder
@RequiredArgsConstructor
@AllArgsConstructor
public class SelectionDto {
    private long selectionId;
    private String selectionTitle;
    private String content;

    public SelectionDto (VoteSelect voteSelect){
        this.selectionId=voteSelect.getVoteSelectId();
        this.content= voteSelect.getContent();
        this.selectionTitle= voteSelect.getSelectionTitle();
    }
}
