package com.ssafy.pollar.controller;

import com.ssafy.pollar.model.dto.VoteDto;
import com.ssafy.pollar.model.service.VoteService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/feed")
@RequiredArgsConstructor
@CrossOrigin
public class VoteController {

    private final VoteService voteService;
    private static final String SUCCESS = "success";

    @PostMapping("/create")
    public ResponseEntity<String> create(@RequestBody VoteDto voteDto)throws Exception {
        System.out.println("11111111111111111");
        System.out.println(voteDto.getVoteName());
        voteService.create(voteDto);
        return new ResponseEntity<String>(SUCCESS, HttpStatus.OK);
    }
}
