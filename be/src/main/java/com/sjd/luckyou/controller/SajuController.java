package com.sjd.luckyou.controller;

import com.sjd.luckyou.dto.saju.*;
import com.sjd.luckyou.security.JwtUtil;
import com.sjd.luckyou.service.GroqAIService;
import com.sjd.luckyou.service.SajuService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/saju")
@RequiredArgsConstructor
@Slf4j
public class SajuController {

    private final GroqAIService groqAIService;
    private final SajuService sajuService;
    private final JwtUtil jwtUtil;

    @GetMapping("/info")
    public ResponseEntity<SajuInfoResponse> fetchSajuInfo(@RequestHeader("Authorization") String token) {
        UUID userId = jwtUtil.getUserIdFromToken(token);
        SajuInfoResponse sajuInfoResponse = sajuService.getSajuInfo(userId);
        return ResponseEntity.ok().body(sajuInfoResponse);
    }

    @PostMapping("/info")
    public ResponseEntity<SajuInfoResponse> saveSajuInfo(@RequestHeader("Authorization") String token, @RequestBody SajuInfoRequest sajuInfoRequest) {
        log.info("/info - {}", sajuInfoRequest);
        UUID userId = jwtUtil.getUserIdFromToken(token);
        SajuInfoResponse sajuInfoResponse = sajuService.saveSajuInfo(userId, sajuInfoRequest);
        return ResponseEntity.ok().body(sajuInfoResponse);
    }

    @GetMapping("/natal")
    public ResponseEntity<SajuResponse> getNatal(@RequestHeader("Authorization") String token) {
        UUID userId = jwtUtil.getUserIdFromToken(token);
        SajuResponse saju = sajuService.getSaju(userId);
        return ResponseEntity.ok().body(saju);
    }

    @PostMapping("/result")
    public ResponseEntity<SajuResultResponse> tarotResult(@RequestHeader("Authorization") String token, @RequestBody SajuResultRequest sajuResultRequest) {
        log.info("/api/v1/saju/result - {}", sajuResultRequest.toString());
        UUID userId = jwtUtil.getUserIdFromToken(token);

        // 사주 프롬프트 작성
        StringBuilder prompt = sajuService.sajuPrompt(sajuResultRequest, userId);
        log.info("\n*** 사주 분석 요청 ***\n{}", prompt);

        // 결과 해석
        String interpretation = groqAIService.getSajuResponse(prompt.toString());

        SajuResultResponse sajuResultResponse = sajuService.saveSaju(userId, sajuResultRequest, interpretation);
        return ResponseEntity.ok().body(sajuResultResponse);
    }

    @GetMapping("/history")
    public ResponseEntity<List<SajuResultResponse>> fetchSajuHistory(@RequestHeader("Authorization") String token) {
        log.info("/api/v1/saju/history");
        UUID userId = jwtUtil.getUserIdFromToken(token);
        List<SajuResultResponse> sajuHistories = sajuService.findSajuResults(userId);
        return ResponseEntity.ok().body(sajuHistories);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteSaju(@PathVariable("id") Long id) {
        log.info("delete - /api/v1/saju/{}", id);
        sajuService.deleteSaju(id);
        return ResponseEntity.ok("Delete Saju successfully.");
    }

    @GetMapping("/{slug}")
    public ResponseEntity<SajuResultResponse> getSajuResultBySlug(@PathVariable("slug") String slug) {
        log.info("Fetching saju result for slug: {}", slug);
        SajuResultResponse sajuResult = sajuService.getSajuResultBySlug(slug);
        if (sajuResult == null) {
            log.warn("Saju result not found for slug: {}", slug);
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok().body(sajuResult);
    }

}
