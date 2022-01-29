package com.ssafy.pollar.controller;

import com.ssafy.pollar.model.dto.VoteDto;
import com.ssafy.pollar.model.service.VoteService;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.enums.ParameterIn;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@Tag(name = "VoteController")
@RequestMapping("/feed")
@RequiredArgsConstructor
@CrossOrigin
public class VoteController {

    private final VoteService voteService;
    private static final String SUCCESS = "success";
    // Operation 태그 이용해서 swagger에 메서드 설명 적기
    @Operation(summary="피드 정보를 입력받아서 생성함.", parameters = {@Parameter(name = "VoteDto", in = ParameterIn.QUERY, schema = @Schema(implementation = VoteDto.class))})
    @PostMapping("/create")
    public ResponseEntity<String> create(@RequestBody @Parameter(required = true) VoteDto voteDto)throws Exception {
        voteService.create(voteDto);
        return new ResponseEntity<String>(SUCCESS, HttpStatus.OK);  // status 200과 success라는 문자열을 반환
    }
}
