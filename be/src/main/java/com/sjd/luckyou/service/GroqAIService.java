package com.sjd.luckyou.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.ai.chat.client.ChatClient;
import org.springframework.stereotype.Service;

import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.time.format.DateTimeFormatter;

@Service
@RequiredArgsConstructor
@Slf4j
public class GroqAIService {

    private final ChatClient chatClient;

    public String getTarotResponse(String question) {
        String tarotPrompt = """
                You are a professional Tarot master.
                0. Once the result is derived, return it in Korean (excluding the card names).
                   Do not provide additional explanations beyond the results.
                1. When the user asks a question, provide how many cards to draw and the themes of each card in a list.
                   Example: If three cards are drawn, return it in the format: [meaning 1, meaning 2, meaning 3, ..., meaning n].
                2. When the user selects their cards, interpret them based on those cards.
                   Separate the meaning of each card and its interpretation.
                   The interpretation format is as follows:
                   ⚡️ [meaning]([card name]): [interpretation]
                   The conclusion format is as follows:
                   🫧 Therefore, [conclusion].
                """;

        return chatClient.prompt()
                .system(tarotPrompt.trim())
                .user(question.trim())
                .call()
                .content();
    }

    // 사주 응답
    public String getSajuResponse(String question) {
        ZoneId zoneId = ZoneId.of("Asia/Seoul");
        ZonedDateTime koreaTime = ZonedDateTime.now().withZoneSameInstant(zoneId);
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH");
        String curDateTime = koreaTime.format(formatter);
        String sajuPrompt = """
                You are a professional expert in Korean Four Pillars of Destiny (사주팔자).
                Based on the user's given Bazi (Four Pillars) data, provide an in-depth traditional Korean fortune analysis.
                
                ### **Instructions:**
                1. Analyze the user's fortune based on their **Day Pillar (日柱)** while considering the interactions with the **Year, Month, and Hour Pillars.**
                   - Consider the balance of **Five Elements (五行), Useful God (用神), Favorable God (喜神), and Strength of the Self (身强/身弱).**  
                2. Structure your response with clear paragraph breaks for better readability.  
                3. Always refer to the user as **"[사용자이름]님."**  
                4. If the user asks about a specific topic (e.g., love, wealth, health), focus your analysis on that aspect.  
                5. **Your response must be in Korean only, except for traditional Chinese characters related to Bazi (e.g., 용신, 희신).** 
                6. The current time is """ + curDateTime + " (KST). Use this information for accurate analysis.";


        return chatClient.prompt()
                .system(sajuPrompt) // 기본 프롬프트를 오버라이드
                .user(question)
                .call()
                .content();
    }

    // 띠별 운세 응답
    public String getZodiacResponse(String question) {
        String zodiacPrompt = """
                당신은 띠별 운세 전문가입니다.
                사용자의 질문에 대해 한국의 12지신 띠를 기반으로 재치 있고 유익한 운세 답변을 제공해주세요.
                """;

        return chatClient.prompt()
                .system(zodiacPrompt) // 기본 프롬프트를 오버라이드
                .user(question)
                .call()
                .content();
    }

}
