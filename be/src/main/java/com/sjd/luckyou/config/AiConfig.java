package com.sjd.luckyou.config;

import lombok.extern.slf4j.Slf4j;
import org.springframework.ai.autoconfigure.openai.OpenAiChatProperties;
import org.springframework.ai.chat.client.ChatClient;
import org.springframework.ai.openai.OpenAiChatModel;
import org.springframework.ai.openai.OpenAiChatOptions;
import org.springframework.ai.openai.api.OpenAiApi;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
@Slf4j
public class AiConfig {

    @Value("${spring.ai.openai.api-key}")
    private String apiKey;

    @Value("${spring.ai.openai.base-url}")
    private String baseUrl;

    @Autowired
    private OpenAiChatProperties chatProperties;

    @Bean
    public ChatClient chatClient() {
        OpenAiApi openAiApi = new OpenAiApi(baseUrl, apiKey);
        OpenAiChatOptions options = OpenAiChatOptions.builder()
                .withModel(chatProperties.getOptions().getModel())
                .withTemperature(chatProperties.getOptions().getTemperature())
                .build();
        OpenAiChatModel chatModel = new OpenAiChatModel(openAiApi, options);
        log.info("ChatModel configured with options: {}", chatModel.getDefaultOptions());
        return ChatClient.builder(chatModel)
                .defaultSystem("""
                        당신은 다재다능한 점술가입니다.
                        사용자의 요청에 따라 사주, 타로, 띠별 운세, 별자리 운세 등을 친절하고 정확하게 해석하여 답변해주세요.
                        상담처럼 사용자의 고민을 공감하고 현명한 답변을 해주세요.
                        모든 질문에 한국어로 답해주세요.
                        """)
                .build();
    }
}
