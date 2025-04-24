package com.sjd.luckyou.controller;

import com.sjd.luckyou.dto.tarot.TarotQuestionRequest;
import com.sjd.luckyou.dto.tarot.TarotQuestionResponse;
import com.sjd.luckyou.dto.tarot.TarotResultRequest;
import com.sjd.luckyou.dto.tarot.TarotResultResponse;
import com.sjd.luckyou.security.JwtUtil;
import com.sjd.luckyou.service.GroqAIService;
import com.sjd.luckyou.service.TarotService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.UUID;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@RestController
@RequestMapping("/api/v1/tarot")
@RequiredArgsConstructor
@Slf4j
public class TarotController {

    private final GroqAIService groqAIService;
    private final TarotService tarotService;
    private final JwtUtil jwtUtil;

    @PostMapping("/question")
    public ResponseEntity<TarotQuestionResponse> tarotQuestion(@RequestBody TarotQuestionRequest tarotQuestionRequest) {
        log.info("/api/v1/tarot/question - '{}'", tarotQuestionRequest);
        String question = tarotQuestionRequest.getQuestion().trim();
        if (question.isEmpty()) {
            return ResponseEntity.badRequest().body(null);  // 빈 문자열이나 공백만 있는 경우 오류 응답
        }
        String questionResult = groqAIService.getTarotResponse(question).trim();
        log.info("question result: {}", questionResult);
        Pattern pattern = Pattern.compile("\\[(.*?)]");
        Matcher matcher = pattern.matcher(questionResult);
        String result = "";
        if (matcher.find()) {
            result = matcher.group(1).trim(); // 대괄호 안의 내용 (그룹 1)
        }
        String[] items = result.split("\\s*,\\s*");  // 쉼표로 분리

        List<String> meanings = new ArrayList<>(Arrays.asList(items));

        TarotQuestionResponse questionResponse = TarotQuestionResponse.builder()
                .question(question)
                .cardMeanings(meanings)
                .build();
        // 빈 문자열 또는 공백만 포함된 문자열 체크
        return ResponseEntity.ok().body(questionResponse);  // 정상적인 질문인 경우
    }

    @PostMapping("/result")
    public ResponseEntity<TarotResultResponse> tarotResult(@RequestHeader("Authorization") String token, @RequestBody TarotResultRequest tarotResultRequest) {
        log.info("/api/v1/tarot/result - {}", tarotResultRequest.toString());
        UUID userId = jwtUtil.getUserIdFromToken(token);

        // 타로 프롬프트 작성
        StringBuilder prompt = tarotService.tarotPrompt(tarotResultRequest);
        log.info("\n*** 타로 해석 요청 ***\n{}", prompt.toString());

        // 결과 해석
        String interpretation = groqAIService.getTarotResponse(prompt.toString());

        TarotResultResponse tarotResultResponse = tarotService.saveTarot(userId, tarotResultRequest, interpretation);
        return ResponseEntity.ok().body(tarotResultResponse);
    }

    @GetMapping("/history")
    public ResponseEntity<List<TarotResultResponse>> fetchTarotHistory(@RequestHeader("Authorization") String token) {
        log.info("/api/v1/tarot/history");
        UUID userId = jwtUtil.getUserIdFromToken(token);
        List<TarotResultResponse> tarotHistories = tarotService.findTarotResults(userId);
        return ResponseEntity.ok().body(tarotHistories);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteTarot(@PathVariable("id") Long id) {
        log.info("delete - /api/v1/tarot/{}", id);
        tarotService.deleteTarot(id);
        return ResponseEntity.ok("Delete Tarot successfully.");
    }

    @GetMapping("/{slug}")
    public ResponseEntity<TarotResultResponse> getTarotResultBySlug(@PathVariable String slug) {
        log.info("Fetching tarot result for slug: {}", slug);
        TarotResultResponse tarotResultResponse = tarotService.getTarotResultBySlug(slug);
        if (tarotResultResponse == null) {
            log.warn("Tarot result not found for slug: {}", slug);
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(tarotResultResponse);
    }

}
