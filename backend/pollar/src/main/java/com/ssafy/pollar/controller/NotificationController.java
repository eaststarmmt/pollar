package com.ssafy.pollar.controller;

import com.ssafy.pollar.model.dto.NotificationDto;
import com.ssafy.pollar.model.service.NotificationService;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/notification")
@RequiredArgsConstructor
@CrossOrigin
public class NotificationController {

    private final NotificationService notificationService;
    private static final String SUCCESS = "success";
    private static final String FAIL = "fail";

    @ApiOperation(value ="알람 읽기")
    @PutMapping("/read")
    public ResponseEntity<Map<String,Object>> notificationRead(@RequestBody NotificationDto notificationDto) throws Exception {
        HashMap<String,Object> resultMap = new HashMap<>();
        HttpStatus status = null;
        try {
            for(int i = 0 ; i < notificationDto.getNotificationIdList().size() ; i++){
                long notificationId = notificationDto.getNotificationIdList().get(i);
                notificationService.notificationRead(notificationId);
            }
            resultMap.put("message",SUCCESS);
            status = HttpStatus.OK;
        }catch (Exception e){
            resultMap.put("message",FAIL);
            status = HttpStatus.INTERNAL_SERVER_ERROR;
        }
        return new ResponseEntity<>(resultMap,status);
    }

    @ApiOperation(value ="알람 목록")
    @PostMapping("/list")
    public ResponseEntity<Map<String,Object>> notificationList(@RequestBody NotificationDto notificationDto) throws Exception {
        HashMap<String,Object> resultMap = new HashMap<>();
        HttpStatus status = null;
        try {
            List<NotificationDto> notificationDtoList = notificationService.notificationList(notificationDto.getReceiveId());
            resultMap.put("notificationList",notificationDtoList);
            resultMap.put("message",SUCCESS);
            status = HttpStatus.OK;
        }catch (Exception e){
            resultMap.put("message",FAIL);
            status = HttpStatus.INTERNAL_SERVER_ERROR;
        }
        return new ResponseEntity<>(resultMap,status);
    }

}
